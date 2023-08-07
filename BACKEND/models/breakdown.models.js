const mongoose = require("mongoose");

const breakdownSchema = new mongoose.Schema({
  machinenumber: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  mrnnumber: {
    type: String,
    required: true,
  },
  changeoverNumber: {
    type: Number,
    required: true,
  },
  starttime: {
    type: String,
    required: true,
  },
  endtime: {
    type: String,
    default: 0,
  },
  Description: {
    type: String,
    required: true,
  },
  IsBreakdown: {
    type: Boolean,
    required: true,
    default: true,
  },
});
breakdownSchema.pre("save", async function (next) {
  if (this.IsBreakdown) {
    const existingRecord = await mongoose.models.Breakdown.findOne({
      machinenumber: this.machinenumber,
      date: this.date,
      shift: this.shift,
      mrnnumber: this.mrnnumber,
      changeoverNumber: this.changeoverNumber,
      IsBreakdown: true,
    });

    if (existingRecord) {
      const error = new Error("A breakdown is already active.");
      return next(error);
    }
  }
  next();
});
const Breakdown = mongoose.model("Breakdown", breakdownSchema);
module.exports = Breakdown;
