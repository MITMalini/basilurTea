const mongoose = require("mongoose");

const bagcountSchema = new mongoose.Schema({
  machinenumber: {
    type: Number,
    required: true,
  },

  mrnnumber: {
    type: String,
    required: true,
  },
  bagcount: {
    type: Number,
    required: true,
  },
});

const BagCount = mongoose.model("BagCount", bagcountSchema);
module.exports = BagCount;
