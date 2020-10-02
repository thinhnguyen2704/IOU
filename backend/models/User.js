const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = {
  userID: {
    type: Schema.Types.ObjectId,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  numOfDebts: {
    type: Number,
    default: 0,
  },
  numOfCompletedRequests: {
    type: Number,
    default: 0,
  }
};

const UserSchema = new Schema(userModel);

module.exports = mongoose.model('users', UserSchema);
