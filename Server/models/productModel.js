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
const porudctsInCart = (userCart) => {
  return Products.find().where("_id").in(userCart).exec();
};

const allFoodProducts = () => {
  return Products.find({ category: "Food" });
};

const allEquipProducts = () => {
  return Products.find({ category: "Equip" });
};

const deleteProduct = (id) => {
  return Products.findOneAndDelete({ _id: id });
};

const userProducts = (userId) => {
  return Products.find({ createdBy: userId });
};

const updateProduct = (id, title, description, price, category, image) => {
  const filter = {
    title,
    description,
    price,
    category,
    image,
  };

  return Products.findOneAndUpdate({ _id: id }, filter);
};

const userFavouritesProducts = (id) => {
  return Products.find({ likes: { $in: [id] } });
};

const productById = (productId) => {
  return Products.findOne({ _id: productId });
};

const addToFavourites = (productId, userId) => {
  return Products.findByIdAndUpdate(
    { _id: productId },
    { $addToSet: { likes: userId } }
  );
};

const removeFromFavourites = (productId, userId) => {
  return Products.findOneAndUpdate(
    { _id: productId },
    { $pull: { likes: userId } }
  );
};

const checkIfUserReview = (productId, userId) => {
  return Products.findOne({
    _id: productId,
    reviews: { $elemMatch: { byUser: userId } },
  });
};

const addProductReview = (productId, userName, review, userId) => {
  return Products.findOneAndUpdate(
    { _id: productId },
    {
      $addToSet: {
        reviews: {
          review,
          userName,
          byUser: userId,
        },
      },
    }
  );
};

const removeReview = (productId, userId) => {
  return Products.findOneAndUpdate(
    { _id: productId },
    { $pull: { reviews: { byUser: userId } } }
  );
};

module.exports = {
  allProducts,
  allFoodProducts,
  allEquipProducts,
  userProducts,
  productById,
  uploadProduct,
  deleteProduct,
  updateProduct,
  addToFavourites,
  removeFromFavourites,
  addProductReview,
  checkIfUserReview,
  removeReview,
  porudctsInCart,
  userFavouritesProducts,
};
