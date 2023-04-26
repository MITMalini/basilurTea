const mongoose = require('mongoose');


const changeoverSchema = new mongoose.Schema({
  // Date: {
  //   type:Date,
  //   required: true,
  // },
  // Changeoverno: {
  //   type: Number,
  //   default: null,
  // },
  selectedoperator:{
    type: String,
    required: true,
  },
  selectedpacking:{
    type: String,
    required: true,
  },
  selectedqc:{
    type: String,
    required: true,
  },
  selectedtechnician:{
    type: String,
    required: true,
  },
  selectedsupervisor:{
    type: String,
    required: true,
  }
  // bag_count:{
  //   type: Number,
  //   default: null,
  // },
  // error_count:{
  //   type: Number,
  //   default: null,
  // }, 
  // runtime:{
  //   type: String,
  //   default: null,
  // },
  // start_time:{
  //   type: String,
  //   default: null,
  // },
  // end_time:{
  //   type: String,
  //   default: null,
  // }
  
});

module.exports = mongoose.model('Changeover', changeoverSchema);