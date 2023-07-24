const mongoose = require("mongoose");

const qcsSchema = new mongoose.Schema({
  epfno: {
    type: Number,
    required: true,
  },
  qc_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("QC", qcsSchema);
