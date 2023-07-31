const mongoose = require("mongoose");

const isbreakdownSchema = new mongoose.Schema({
  machinenumber: {
    type: Number,
    required: true,
  },
  breakdown: {
    type: String,
    required: true,
  },
  option: {
    type: Boolean,
    default: false,
    required: true,
  },
});

isbreakdownSchema.pre("save", async function (next) {
  if (this.option) {
    // If the current document's option is true, check if there is any other document with option set to true
    const existingTrueOption = await IsBreakdown.findOne({
      machinenumber: this.machinenumber,
      option: true,
    });

    if (
      existingTrueOption &&
      existingTrueOption._id.toString() !== this._id.toString()
    ) {
      const err = new Error("Only one breakdown at a time");
      return next(err);
    }
  }
  next();
});

const IsBreakdown = mongoose.model("IsBreakdown", isbreakdownSchema);
module.exports = IsBreakdown;
