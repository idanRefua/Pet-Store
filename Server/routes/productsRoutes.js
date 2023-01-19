const express = require("express");
const productsModel = require("../models/productModel");
const authMiddleWare = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/allproducts", async (req, res) => {
  try {
    const allProducts = await productsModel.allProducts();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/addproduct", authMiddleWare, async (req, res) => {
  try {
    const user = req.userData;
    const body = req.body;
    if (user.admin) {
      const newProduct = await productsModel.uploadProduct({
        title: body.title,
        image: body.image
          ? body.image
          : `https://cdn.pixabay.com/photo/2015/11/03/09/10/question-mark-1020165_960_720.jpg`,
        description: body.description,
        createdBy: user._id,
        category: body.category,
        price: body.price,
      });
      res.status(200).json({ message: `You created new product !` });
    } else {
      throw "You are not admin user !";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

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
      if (product.createdBy === user._id) {
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
    const body = req.body;
    if (user.admin) {
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

module.exports = router;
