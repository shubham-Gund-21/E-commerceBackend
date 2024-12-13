const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: false,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: false,
  },
  wishlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: false,
  },
});

module.exports = mongoose.model("users", userSchema);
