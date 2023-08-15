const express = require("express");
const productsModel = require("../models/productModel");
const authMiddleWare = require("../middleware/auth.middleware");
const uploadImage = require("../middleware/upload-image");
const fs = require("fs");
const usersModel = require("../models/userModel");
const { log } = require("console");

const router = express.Router();

router.get("/allproducts", async (req, res) => {
  try {
    const allProducts = await productsModel.allProducts();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/food", async (req, res) => {
  try {
    const foodProducts = await productsModel.allFoodProducts();
    res.status(200).json(foodProducts);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/equip", async (req, res) => {
  try {
    const equipProducts = await productsModel.allEquipProducts();
    res.status(200).json(equipProducts);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post(
  "/addproduct",
  authMiddleWare,
  uploadImage.single("image"),
  async (req, res) => {
    try {
      const user = req.userData;
      const { title, description, price, category } = req.body;
      const { path: image } = req.file;
      if (user.admin) {
        if (category === "Food" || category === "Equip") {
          const newProduct = await productsModel.uploadProduct({
            title,
            description,
            image: image.replace("\\", "/").replace("\\", "/"),
            createdBy: user._id,
            category,
            price,
          });
          res
            .status(200)
            .json({ message: `You created new product !`, newProduct });
        } else {
          throw "Please Select which category: Food Or Equip! ";
        }
      } else {
        throw "You are not admin user !";
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.get("/myproducts", authMiddleWare, async (req, res) => {
  try {
    const user = req.userData;
    if (user.admin) {
      const userProducts = await productsModel.userProducts(user._id);
      res.status(200).json(userProducts);
    } else {
      throw "You are not admin user";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete("/deleteproduct/:productid", authMiddleWare, async (req, res) => {
  try {
    const productId = req.params.productid;
    const user = req.userData;
    if (user.admin) {
      const product = await productsModel.productById(productId);
      if (product.createdBy.toString() === user._id) {
        const deleteProduct = await productsModel.deleteProduct(productId);
        fs.unlinkSync(product.image, function (err) {
          if (err) return console.log(err);
        });
        res.status(200).json({ message: "The product delete succssfuly" });
      } else {
        throw "This is not your product";
      }
    } else {
      throw "You are not admin user";
    }
  } catch (error) {
    res.status(401).json({ error });
  }
});

router.patch(
  "/updateproduct/:id",
  uploadImage.single("image"),
  authMiddleWare,
  async (req, res) => {
    try {
      const user = req.userData;
      const productId = req.params.id;
      const { title, price, description, category } = req.body;
      if (user.admin) {
        const product = await productsModel.productById(productId);
        if (product.createdBy.toHexString() === user._id) {
          if (req.file) {
            fs.unlinkSync(product.image, function (err) {
              if (err) return console.log(err);
            });
            const newImage = req.file.path
              .replace("\\", "/")
              .replace("\\", "/");
            const updateProduct = await productsModel.updateProduct(
              productId,
              title,
              description,
              price,
              category,
              newImage
            );
            res.status(200).json(updateProduct);
          } else {
            const updateProduct = await productsModel.updateProduct(
              productId,
              title,
              description,
              price,
              category,
              product.image
            );
            res.status(200).json(updateProduct);
          }
        } else {
          throw "this is not your product";
        }
      } else {
        throw "You are not admin user";
      }
    } catch (error) {
      res.status(400).send(console.log(error));
    }
  }
);

router.post("/addtofavourites/:id", authMiddleWare, async (req, res) => {
  try {
    const productId = req.params.id;
    const user = req.userData;
    const product = await productsModel.productById(productId);
    if (!product.likes.includes(user._id)) {
      const addLike = await productsModel.addToFavourites(productId, user._id);
      res.status(200).json(addLike);
    } else {
      throw "You already add this product to your favourites list";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.patch("/removefromfavourites/:id", authMiddleWare, async (req, res) => {
  try {
    const productId = req.params.id;
    const user = req.userData;
    const product = await productsModel.productById(productId);
    if (product.likes.includes(user._id)) {
      const removeLike = await productsModel.removeFromFavourites(
        productId,
        user._id
      );
      res.status(200).json(removeLike);
    } else {
      throw "You didn't add this product to your favourites";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/product/moreinfo/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productsModel.productById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/addreview/:id", authMiddleWare, async (req, res) => {
  try {
    const productId = req.params.id;
    const body = req.body;
    const user = req.userData;
    const product = await productsModel.checkIfUserReview(productId, user._id);
    if (!product) {
      const review = await productsModel.addProductReview(
        productId,
        user.name,
        body.review,
        user._id
      );
      res.status(200).json(review);
    } else {
      throw "you already write your review on that product";
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/removereview/:id", authMiddleWare, async (req, res) => {
  try {
    const user = req.userData;
    const productId = req.params.id;
    const review = await productsModel.checkIfUserReview(productId, user._id);

    if (review) {
      const deleteReview = await productsModel.removeReview(
        productId,
        user._id
      );
      res.status(200).json("This Review deleted !");
    } else {
      throw "This is Not your review!";
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/addtocart/:id", authMiddleWare, async (req, res) => {
  try {
    const user = req.userData;
    const productId = req.params.id;
    const productAddToCart = await usersModel.addProductToCart(
      user._id,
      productId
    );
    res.status(200).json(productAddToCart);
  } catch (error) {
    res.status(400).json(console.log(error));
  }
});

router.patch("/removefromcart/:id", authMiddleWare, async (req, res) => {
  try {
    const userDataToken = req.userData;
    const productId = req.params.id;
    const user = await usersModel.findUserById(userDataToken._id);
    const productInCart = user[0].cartUser.includes(productId);

    if (productInCart) {
      const removeProductFromCart = await usersModel.removeProductFromUserCart(
        user[0]._id.toHexString(),
        productId
      );
      res.status(200).json(removeProductFromCart);
    } else {
      throw "This Product Not found in your cart";
    }
  } catch (error) {
    res.status(400).send(console.log(error));
  }
});

module.exports = router;
