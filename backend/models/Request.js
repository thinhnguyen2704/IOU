const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const requestModel = {
  requestID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  requestContent: {
    type: String,
    required: true,
  },
  requestFavors: {
    from: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    rewards: {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      }
    },
  },
  resolverID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  resolverProof: {
    type: String,
  },
};

const RequestSchema = new Schema(requestModel);

module.exports = mongoose.model('requests', RequestSchema);
