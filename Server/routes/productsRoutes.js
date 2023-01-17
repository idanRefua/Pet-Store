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
      console.log(req.userData._id);
      res.status(200).json(userProducts);
    } else {
      throw "You are not admin user";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
