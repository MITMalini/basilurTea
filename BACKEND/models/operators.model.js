const mongoose = require("mongoose");

const operatorsSchema = new mongoose.Schema({
  epfno: {
    type: Number,
    required: true,
    unique: true,
  },
  operator_name: {
    type: String,
    required: true,
  },
});

const Operator = mongoose.model("Operator", operatorsSchema);
module.exports = Operator;
