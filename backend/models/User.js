const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = {
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // numOfDebts: {
  //   type: Int16Array,
  // },
  // numOfCompletedRequests: {
  //   type: Int16Array,
  // }
};

const UserSchema = new Schema(userModel);

module.exports = mongoose.model('users', UserSchema);
