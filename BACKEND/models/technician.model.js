const mongoose = require("mongoose");

const techniciansSchema = new mongoose.Schema({
  epfno: {
    type: Number,
    required: true,
  },
  technician_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Technician", techniciansSchema);
