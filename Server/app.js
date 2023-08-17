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
app.use(express.json({ limit: "50mb", extended: true }));
app.use("/uploads/images", express.static(path.join("uploads", "images")));
/* app.use("/uploads", express.static("uploads")); */

app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5000 })
);
app.use(express.static(path.join(__dirname, "public")));

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
