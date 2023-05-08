const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const changeoverSchema = new mongoose.Schema({
  date: {
    type: String,
    default: function () {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return year + '/' + month + '/' + day;
    }
  },
  MachineNumber: {
    type: Number,
    required: true
  },
  selectedshift: {
    type: String,
    enum: ['Morning shift', 'Evening shift'],
    required: true
  },
  changeoverNumber: {
    type: Number,
    default: 1
  },
  selectedoperator: {
    type: String,
    required: true,
  },
  selectedpacking: {
    type: String,
    required: true,
  },
  selectedqc: {
    type: String,
    required: true,
  },
  selectedtechnician: {
    type: String,
    required: true,
  },
  selectedsupervisor: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

changeoverSchema.pre('save', async function () {
  const doc = this;
  if (doc.isNew) {
    const count = await mongoose.model('Changeover', changeoverSchema).find({
      date: doc.date,
      MachineNumber: doc.MachineNumber,
      selectedshift: doc.selectedshift
    }).countDocuments();
    doc.changeoverNumber = count + 1;
  } else {
    const previousDoc = await mongoose.model('Changeover', changeoverSchema).findById(doc._id);
    if (previousDoc && previousDoc.selectedshift !== doc.selectedshift) {
      doc.changeoverNumber = 1;
    }
  }
});



module.exports = mongoose.model('Changeover', changeoverSchema);