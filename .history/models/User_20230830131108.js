const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
}exports = mongoose.model("User", userSchema);
);

module.