const Breakdown = require("../models/breakdown.models");

//get all Breakdowns

const getBreakdowns = async (req, res) => {
  const breakdowns = await Breakdown.find();

  if (!breakdowns) {
    return res
      .status(404)
      .json({ message: "No any available breakdowns found" });
  } else {
    return res.status(200).json(breakdowns);
  }
};

//get / serach a single Breakdown

const getBreakdown = async (req, res) => {
  const { id } = req.params;

  const breakdown = await Breakdown.findById({ _id: id });

  if (!breakdown) {
    return res.status(404).json({ message: "No breakdown found" });
  } else {
    return res.status(200).json(breakdown);
  }
};

//add new Breakdown

const addBreakdown = async (req, res) => {
  const {
    machinenumber,
    date,
    shift,
    changeoverNumber,
    starttime,
    mrnnumber,
    endtime,
    Description,
    IsBreakdown,
  } = req.body;

  try {
    const breakdown = await Breakdown.create({
      machinenumber,
      date,
      shift,
      changeoverNumber,
      mrnnumber,
      starttime,
      endtime,
      Description,
      IsBreakdown,
    });

    return res.status(200).json(breakdown);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

//delete a Breakdown

const deleteBreakdown = async (req, res) => {
  const { id } = req.params;

  const breakdown = await Breakdown.findOneAndDelete({ _id: id });

  if (!breakdown) {
    return res.status(400).json({ breakdown: "No such breakdown" });
  } else {
    return res.status(200).json({ message: "Breakdown deleted successfully" });
  }
};

//update a Breakdown

const updateBreakdown = async (req, res) => {
  const { id } = req.params;

  const breakdown = await Breakdown.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!breakdown) {
    return res.status(400).json({ breakdown: "No such breakdown" });
  } else {
    return res.status(200).json(breakdown);
  }
};

module.exports = {
  getBreakdowns,
  getBreakdown,
  addBreakdown,
  deleteBreakdown,
  updateBreakdown,
};
