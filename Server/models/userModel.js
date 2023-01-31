const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false, required: true },
  cartUser: [String],
});

const Users = mongoose.model("Users", userSchema);

const allUsers = () => {
  return Users.find();
};

const addUser = (name, email, password) => {
  const user = new Users(name, email, password);
  return user.save();
};

const findUserByEmail = (email) => {
  return Users.find({ email });
};

const findUserById = (id) => {
  return Users.find({ _id: id });
};

const deleteUserById = (id) => {
  const deleteUser = Users.findByIdAndDelete({ _id: id });
  return deleteUser;
};

const addProductToCart = (userId, productId) => {
  return Users.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { cartUser: productId } }
  );
};

module.exports = {
  allUsers,
  addUser,
  findUserByEmail,
  deleteUserById,
  addProductToCart,
  findUserById,
};
