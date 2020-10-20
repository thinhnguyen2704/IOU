const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = {
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
  },
  password: {
    type: String,
    required: true,
  },
  completedRequest: {
    type: Number,
    default: 0,
  }
};

const UserSchema = new Schema(userModel);

module.exports = mongoose.model("User", UserSchema);
