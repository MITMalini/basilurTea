const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const moment = require("moment-timezone");

const changeoverSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: function () {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    },
  },
  // orderNumber: {
  //   type: String,
  //   required: true
  // },
  selectedMachine: {
    type: Number,
    required: true,
  },
  customercode: {
    type: String,
    required: true,
  },
  ordernumber: {
    type: String,
    required: true,
  },
  endedAt: {
    type: String,
    default: null,
  },
  selectedshift: {
    type: String,
    enum: ["Morning shift", "Evening shift"],
    required: true,
  },
  changeoverNumber: {
    type: Number,
    default: 1,
  },
  selectedoperator: {
    type: Array,
    required: true,
  },
  selectedpacking: {
    type: Array,
    required: true,
  },
  selectedqc: {
    type: Array,
    required: true,
  },
  selectedtechnician: {
    type: Array,
    required: true,
  },
  selectedsupervisor: {
    type: Array,
    required: true,
  },
  startedAt: {
    type: String,
    default: function () {
      return moment().tz("Asia/Colombo").format("hh:mm:ss A");
    },
  },
  endedAt: {
    type: String,
    default: null,
  },
});

changeoverSchema.virtual("formattedDate").get(function () {
  return moment(this.date).format("YYYY-MM-DD");
});

changeoverSchema.set("toJSON", { virtuals: true });

changeoverSchema.pre("save", async function () {
  const doc = this;
  if (doc.isNew) {
    const count = await mongoose
      .model("Changeover", changeoverSchema)
      .find({
        date: doc.date,
        selectedMachine: doc.selectedMachine,
        selectedshift: doc.selectedshift,
      })
      .countDocuments();
    doc.changeoverNumber = count + 1;
  } else {
    const previousDoc = await mongoose
      .model("Changeover", changeoverSchema)
      .findById(doc._id);
    if (previousDoc && previousDoc.selectedshift !== doc.selectedshift) {
      doc.changeoverNumber = 1;
    }
  }
});

module.exports = mongoose.model("Changeover", changeoverSchema);
