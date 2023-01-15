require("dotenv").config();
const express = require("express");
const app = express();
const usersRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");
const connectToDb = require("./config/connectToDB");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users/", usersRoutes);

mongoose.set("strictQuery", false);

connectToDb
  .then(() => {
    console.log("Connected to MongoDB !");
  })
  .catch((error) => {
    console.log(`Could not connect to DB !`);
  });

app.listen(process.env.PORT, () => {
  console.log(`server is running at port ${process.env.PORT}`);
});
