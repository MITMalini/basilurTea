const mongoose = require('mongoose');


const changeoverSchema = new mongoose.Schema({
  Date: {
    type:Date,
    required: true,
  },
  Changeover: {
    type: Number,
    required: true,
  },
  Packing_name:{
    type: String,
    required: true,
  },
  operator_name:{
    type: String,
    required: true,
  },
  technician_name:{
    type: String,
    required: true,
  },
  qc_name:{
    type: String,
    required: true,
  },
  supervisor_name:{
    type: String,
    required: true,
  },
  bag_count:{
    type: Number,
  },
  error_count:{
    type: Number,
  },
  runtime:{
    type: String,
  },
  jogtime:{
    type: String,
  }
  
});

const Changeover = mongoose.model('Changeover', changeoverSchema);
module.exports = Changeover;