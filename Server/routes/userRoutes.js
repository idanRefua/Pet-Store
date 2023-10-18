const express = require("express");
const router = express.Router();
const usersModel = require("../models/userModel");
const jsonToken = require("../config/token");
const authMiddleware = require("../middleware/auth.middleware");
const bcrypt = require("../config/bcrypt");
const productsModel = require("../models/productModel");
const stripe = require("stripe")(process.env.STRIPE_TEST_PRIVATE_KEY);
require("dotenv").config();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await usersModel.allUsers();
    res.status(200).json({ users, userToken });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/adduser", async (req, res) => {
  try {
    const users = await usersModel.findUserByEmail(req.body.email);
    console.log(users);
    if (users.length === 0) {
      const hashPass = await bcrypt.createPassword(req.body.password);
      const addUser = await usersModel.addUser({
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
      });
      res.status(200).json({ user: addUser });
    } else {
      throw "There is already user with that email address";
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const users = await usersModel.findUserByEmail(body.email);

    if (users.length > 0) {
      const correctPassowrd = await bcrypt.comparePassword(
        body.password,
        users[0].password
      );
      if (correctPassowrd) {
        const token = await jsonToken.generateToken({
          _id: users[0]._id,
          name: users[0].name,
          email: users[0].email,
          admin: users[0].admin,
        });

        res.status(200).json({ token });
      } else {
        throw "password incorrect";
      }
    } else {
      throw "There is no user with that email or email incorrect";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await usersModel.deleteUserById(userId);
    res.status(200).json({ user: deleteUser });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/admin", authMiddleware, async (req, res) => {
  try {
    const userData = req.userData;
    if (userData.admin) {
      res.json({ message: "You are and admin user" });
    } else {
      throw "You are not able to use this route beacuse you are not admin user ";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/usercart", authMiddleware, async (req, res) => {
  try {
    const userData = req.userData;
    const user = await usersModel.findUserById(userData._id);
    const userCart = await productsModel.porudctsInCart(user[0].cartUser);
    res.status(200).json(userCart);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/cart/products", authMiddleware, async (req, res) => {
  try {
    const userData = req.userData;
    const user = await usersModel.findUserById(userData._id);
    res.status(200).json(user[0].cartUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/checkout", authMiddleware, async (req, res) => {
  try {
    const line_items = req.body.items.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });
    /*    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item) => {
      lineItems.push({
        quantity: item.quantity,
      image: item.image, 
        price: item.price,
        title: item.title,
        id: item.id, 
      });
    }); */

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.status(200).send(
      JSON.stringify({
        url: session.url,
      })
    );
  } catch (error) {
    return res.status(401).json(console.log(error));
  }
});
module.exports = router;
