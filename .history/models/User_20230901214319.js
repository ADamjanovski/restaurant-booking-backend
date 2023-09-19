const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  reservetions : {
    type : Restaurant,
  }
});

module.exports = mongoose.model("User", userSchema);
