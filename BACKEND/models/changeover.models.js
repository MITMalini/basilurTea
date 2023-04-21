const mongoose = require('mongoose');


const changeoverSchema = new mongoose.Schema({
  epfno: {
    type: Number,
    required: true,
    unique: true,
  },
  operator_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  }
});

 const Changeover = mongoose.model('Changeover', changeoverSchema);
 module.exports = Changeover;