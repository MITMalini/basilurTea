const Packing = require("../models/packing.model.js");

//get all Packings

const getPackings = async (req, res) => {
  const q = req.query.q;

  const packings = await Packing.find();

  if (!packings) {
    return res
      .status(404)
      .json({ message: "No any available packing Operators found" });
  } else {
    return res.status(200).json(packings);
  }
};

//get / serach a single Packing

const getPacking = async (req, res) => {
  const { id } = req.params;

  const packing = await Packing.findById({ _id: id });

  if (!packing) {
    return res.status(404).json({ message: "No packing Operator found" });
  } else {
    return res.status(200).json(packing);
  }
};

//add new Packing

const addPacking = async (req, res) => {
  const epfno = Number(req.body.epfno);
  const { packing_name } = req.body;

  try {
    const newpacking = await Packing.create({
      epfno,
      packing_name,
    });

    return res.status(200).json(newpacking);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

//delete a Packing

const deletePacking = async (req, res) => {
  const { id } = req.params;

  const packing = await Packing.findOneAndDelete({ _id: id });

  if (!packing) {
    return res.status(400).json({ error: "No such packing Operator" });
  } else {
    return res
      .status(200)
      .json({ message: "Packing Operator deleted successfully" });
  }
};

//update a Packing

const updatePacking = async (req, res) => {
  const { id } = req.params;

  const packing = await Packing.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!packing) {
    return res.status(400).json({ error: "No such packing Packing Operator" });
  } else {
    return res.status(200).json(packing);
  }
};

module.exports = {
  getPackings,
  getPacking,
  addPacking,
  deletePacking,
  updatePacking,
};
