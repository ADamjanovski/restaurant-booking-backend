const mongoose = require("mongoose");
const Restaurant=require("./Restaurants");
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
  reservetions: {
    type: [Schema.Types.ObjectId],
    ref: 'reservations'
}
});

module.exports = mongoose.model("User", userSchema);
