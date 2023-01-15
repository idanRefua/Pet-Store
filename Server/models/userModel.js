const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false, required: true },
  cartUser: [String],
});

const Users = mongoose.model("Users", userSchema);

const allUsers = () => {
  return Users.find();
};

const addUser = (email, password) => {
  const user = new Users(email, password);
  return user.save();
};

const findUserByEmail = (email) => {
  return Users.find({ email });
};

const deleteUserById = (id) => {
  const deleteUser = Users.findByIdAndDelete({ _id: id });
  return deleteUser;
};

module.exports = { allUsers, addUser, findUserByEmail, deleteUserById };
