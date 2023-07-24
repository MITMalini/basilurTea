const mongoose = require("mongoose");

const packingsSchema = new mongoose.Schema({
  epfno: {
    type: Number,
    required: true,
    unique: true,
  },
  packing_name: {
    type: String,
    required: true,
  },
});

const Packing = mongoose.model("Packing", packingsSchema);
module.exports = Packing;
