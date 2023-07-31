const IsBreakdown = require("../models/isbreakdown.model");

//get all IsBreakdowns

const getIsBreakdowns = async (req, res) => {
  const isbreakdowns = await IsBreakdown.find();

  if (!isbreakdowns) {
    return res
      .status(404)
      .json({ message: "No any available isbreakdowns found" });
  } else {
    return res.status(200).json(isbreakdowns);
  }
};

//get / serach a single IsBreakdown

const getIsBreakdown = async (req, res) => {
  const { id } = req.params;

  const isbreakdown = await IsBreakdown.findById({ _id: id });

  if (!isbreakdown) {
    return res.status(404).json({ message: "No isbreakdown found" });
  } else {
    return res.status(200).json(isbreakdown);
  }
};

//add new IsIsBreakdown

const addIsBreakdown = async (req, res) => {
  const { machinenumber, breakdown, option } = req.body;

  try {
    const isbreakdown = await IsBreakdown.create({
      machinenumber,
      breakdown,
      option,
    });

    return res.status(200).json(isbreakdown);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

//delete a IsIsBreakdown

const deleteIsBreakdown = async (req, res) => {
  const { id } = req.params;

  const isbreakdown = await IsBreakdown.findOneAndDelete({ _id: id });

  if (!isbreakdown) {
    return res.status(400).json({ isbreakdown: "No such isbreakdown" });
  } else {
    return res
      .status(200)
      .json({ message: "IsBreakdown deleted successfully" });
  }
};

//update a IsBreakdown

const updateIsBreakdown = async (req, res) => {
  const { id } = req.params;

  const isbreakdown = await IsBreakdown.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!isbreakdown) {
    return res.status(400).json({ isbreakdown: "No such isbreakdown" });
  } else {
    return res.status(200).json(isbreakdown);
  }
};

module.exports = {
  getIsBreakdowns,
  getIsBreakdown,
  addIsBreakdown,
  deleteIsBreakdown,
  updateIsBreakdown,
};
