const mongoose = require("mongoose");

const supervisorsSchema = new mongoose.Schema({
  epfno: {
    type: Number,
    required: true,
  },
  supervisor_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Supervisor", supervisorsSchema);
