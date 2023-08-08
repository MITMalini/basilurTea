const mongoose = require("mongoose");

const nomrnbreakdownSchema = new mongoose.Schema({
  machinenumber: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
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
nomrnbreakdownSchema.pre("save", async function (next) {
  if (this.IsBreakdown) {
    const existingRecord = await mongoose.models.NomrnBreakdown.findOne({
      machinenumber: this.machinenumber,
      date: this.date,
      IsBreakdown: true,
    });

    if (existingRecord) {
      const error = new Error("A breakdown is already active.");
      return next(error);
    }
  }
  next();
});
const NomrnBreakdown = mongoose.model("NomrnBreakdown", nomrnbreakdownSchema);
module.exports = NomrnBreakdown;
