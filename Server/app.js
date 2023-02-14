require("dotenv").config();
const express = require("express");
const app = express();
const usersRoutes = require("./routes/userRoutes");
const productsRoutes = require("./routes/productsRoutes");
const mongoose = require("mongoose");
const connectToDb = require("./config/connectToDB");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("uploads"));
app.use("/users/", usersRoutes);
app.use("/products/", productsRoutes);

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
