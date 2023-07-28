const mongoose = require("mongoose");

const breakdownSchema = new mongoose.Schema({
  machinenumber: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  mrnnumber: {
    type: String,
    required: true,
  },
  changeoverNumber: {
    type: Number,
    required: true,
  },
  starttime: {
    type: String,
    required: true,
  },
  endtime: {
    type: String,
  },
  Description: {
    type: String,
    required: true,
  },
  IsBreakdown: {
    type: Boolean,
    required: true,
    default: true,
  },
});
const Breakdown = mongoose.model("Breakdown", breakdownSchema);
module.exports = Breakdown;
