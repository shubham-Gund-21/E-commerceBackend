const jsonWebToken = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
async function registerUser(req, res) {
  const { firstname, lastname, phone, password } = req.body;
  if (!firstname || !lastname || !phone || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  var hashPassword = await bcrypt.hash(password, 10);
  try {
    var users = userModel({
      name: `${firstname}${lastname}`,
      phone: phone,
      password: hashPassword,
    });
    await users.save();
    res.status(201).json({
      status: 1,
      message: "User registered succesfully",
      newUser,
    });
  } catch (e) {
    res.status(500).json({ err });
  }
}

// login user
async function login(req, res) {
  const { phone, password } = req.body;
  try {
    const user = await userModel.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const decreptedPassword = await bcrypt.compare(password, user.password);
    console.log(decreptedPassword);
    console.log(user.password);
    if (decreptedPassword) {
      var tokon = jsonWebToken.sign(
        { id: user._id, phone: user.phone },
        "privateKey",
        {
          expiresIn: "10h",
        }
      );
      return res.json({ message: "User Found successful", tokon, user });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {}
}
// Delete user
async function deleteUser(req, res) {
  const id = req.params.id;
  try {
    const deleteUser = await userModel.findByIdAndDelete(id);
    if (user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted", deleteUser: deleteUser });
    }
  } catch (err) {
    res.status(500).json({ message: "User not found", err });
  }
}

module.exports = {
  registerUser,
  login,
};
