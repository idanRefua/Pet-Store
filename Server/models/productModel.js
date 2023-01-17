const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: false },
  description: { type: String, required: true },
  likes: [String],
  createdBy: { type: mongoose.Types.ObjectId, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  reviews: [
    {
      review: String,
      byUser: { type: mongoose.Types.ObjectId },
      userName: String,
    },
  ],
});

const Products = mongoose.model("Products", productsSchema);

const uploadProduct = (
  title,
  image,
  description,
  createdBy,
  category,
  price
) => {
  const product = new Products(
    title,
    image,
    description,
    createdBy,
    category,
    price
  );
  product.save();
};

const allProducts = () => {
  return Products.find();
};

const userProducts = (userId) => {
  return Products.find({ createdBy: userId });
};

const productById = (productId) => {
  return Products.findOne({ _id: productId });
};

module.exports = {
  allProducts,
  userProducts,
  productById,
  uploadProduct,
};
