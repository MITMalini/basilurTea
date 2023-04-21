const mongoose = require('mongoose');

const errorsSchema = new mongoose.Schema({
  errorno: {
    type: Number,
    required: true,
  },
  error_description: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Error', errorsSchema);