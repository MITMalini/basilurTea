const NomrnBreakdown = require("../models/nomrnbreakdown.models");

//get all Breakdowns

const getNomrnBreakdowns = async (req, res) => {
  const nomrnBreakdowns = await NomrnBreakdown.find();

  if (!nomrnBreakdowns) {
    return res
      .status(404)
      .json({ message: "No any available nomrnBreakdowns found" });
  } else {
    return res.status(200).json(nomrnBreakdowns);
  }
};

//get / serach a single NomrnBreakdown

const getNomrnBreakdown = async (req, res) => {
  const { id } = req.params;

  const nomrnBreakdown = await NomrnBreakdown.findById({ _id: id });

  if (!nomrnBreakdown) {
    return res.status(404).json({ message: "No nomrnBreakdown found" });
  } else {
    return res.status(200).json(nomrnBreakdown);
  }
};

//add new NomrnBreakdown

const addNomrnBreakdown = async (req, res) => {
  const { machinenumber, date, starttime, endtime, Description, IsBreakdown } =
    req.body;

  try {
    const nomrnBreakdown = await NomrnBreakdown.create({
      machinenumber,
      date,
      starttime,
      endtime,
      Description,
      IsBreakdown,
    });

    return res.status(200).json(nomrnBreakdown);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

//delete a NomrnBreakdown

const deleteNomrnBreakdown = async (req, res) => {
  const { id } = req.params;

  const nomrnBreakdown = await NomrnBreakdown.findOneAndDelete({ _id: id });

  if (!nomrnBreakdown) {
    return res.status(400).json({ nomrnBreakdown: "No such nomrnBreakdown" });
  } else {
    return res
      .status(200)
      .json({ message: "NomrnBreakdown deleted successfully" });
  }
};

//update a NomrnBreakdown

const updateNomrnBreakdown = async (req, res) => {
  const { id } = req.params;

  const nomrnBreakdown = await NomrnBreakdown.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!nomrnBreakdown) {
    return res.status(400).json({ nomrnBreakdown: "No such nomrnBreakdown" });
  } else {
    return res.status(200).json(nomrnBreakdown);
  }
};

module.exports = {
  getNomrnBreakdowns,
  getNomrnBreakdown,
  addNomrnBreakdown,
  deleteNomrnBreakdown,
  updateNomrnBreakdown,
};
