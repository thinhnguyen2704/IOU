const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prizeModel = {
  prize: {
    type: String,
    required: true,
  },
};

const PrizeSchema = new Schema(prizeModel);

module.exports = mongoose.model('Prize', PrizeSchema);
