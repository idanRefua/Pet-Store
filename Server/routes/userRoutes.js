const express = require("express");
const router = express.Router();
const usersModel = require("../models/userModel");
const jsonToken = require("../config/token");
const authMiddleware = require("../middleware/auth.middleware");
const bcrypt = require("../config/bcrypt");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await usersModel.allUsers();
    res.status(200).json({ users, userToken });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/adduser", async (req, res) => {
  try {
    const users = await usersModel.findUserByEmail(req.body.email);
    console.log(users);
    if (users.length === 0) {
      const hashPass = await bcrypt.createPassword(req.body.password);
      const addUser = await usersModel.addUser({
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
    console.log(users);
    if (users.length > 0) {
      const correctPassowrd = await bcrypt.comparePassword(
        body.password,
        users[0].password
      );
      if (correctPassowrd) {
        const token = await jsonToken.generateToken({
          _id: users[0]._id,
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

module.exports = router;
