const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favorModel = {
  ownerID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  debtorID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Prize",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  isComplete: {
    type: Boolean,
    default: false,
  },
  createdImage: {
    type: String,
  },
  completedImage: {
    type: String,
  },
};

const FavorSchema = new mongoose.Schema(favorModel, { timestamps: true });

module.exports = mongoose.model("Favor", FavorSchema, "favors");
