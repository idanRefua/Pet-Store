const express = require("express");
const productsModel = require("../models/productModel");
const authMiddleWare = require("../middleware/auth.middleware");
const uploadImage = require("../middleware/upload-image");
const fs = require("fs");

const router = express.Router();

router.get("/allproducts", async (req, res) => {
  try {
    const allProducts = await productsModel.allProducts();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).json({ error });
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

////
/////
//////
//////

router.patch("/updateproduct/:id", authMiddleWare, async (req, res) => {
  try {
    const user = req.userData;
    const productId = req.params.id;
    const { title, price, description } = req.body;
    if (user.admin) {
      // all the same files not change -  so don't send the request,
      // if he don't change the image - don't delete it by fs.unlink() ,

      const product = await productsModel.productById(productId);
      if (product.createdBy === user._id) {
        const updateProduct = await productsModel.updateProduct(productId);
        res.status(200).json(updateProduct);
      }
    } else {
      throw "You are not admin user";
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/addtofavourites/:id", authMiddleWare, async (req, res) => {
  try {
    const productId = req.params.id;
    const user = req.userData;
    const product = await productsModel.productById(productId);
    if (!product.likes.includes(user._id)) {
      const addLike = await productsModel.addToFavourites(productId, user._id);
      res.status(200).json(addLike);
    } else {
      throw "You already add this product to yoru favourites list";
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
        user.email,
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
module.exports = router;
