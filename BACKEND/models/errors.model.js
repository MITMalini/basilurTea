const mongoose = require('mongoose');

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

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