const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  token: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "user",
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
