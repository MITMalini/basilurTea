const QC = require("../models/qc.model.js");

//get all QCs

const getQCs = async (req, res) => {
  const qcs = await QC.find();

  if (!qcs) {
    return res.status(404).json({ message: "No any available QCs found" });
  } else {
    return res.status(200).json(qcs);
  }
};

//get / serach a single QC

const getQC = async (req, res) => {
  const { id } = req.params;

  const qc = await QC.findById({ _id: id });

  if (!qc) {
    return res.status(404).json({ message: "No qc found" });
  } else {
    return res.status(200).json(qc);
  }
};

//add new QC

const addQC = async (req, res) => {
  const { epfno, qc_name } = req.body;

  try {
    const newqc = await QC.create({
      epfno,
      qc_name,
    });

    return res.status(200).json(newqc);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

//delete a QC

const deleteQC = async (req, res) => {
  const { id } = req.params;

  const qc = await QC.findOneAndDelete({ _id: id });

  if (!qc) {
    return res.status(400).json({ error: "No such qc" });
  } else {
    return res.status(200).json({ message: "QC deleted successfully" });
  }
};

//update a QC

const updateQC = async (req, res) => {
  const { id } = req.params;

  const qc = await QC.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!qc) {
    return res.status(400).json({ error: "No such qc" });
  } else {
    return res.status(200).json(qc);
  }
};

module.exports = {
  getQCs,
  getQC,
  addQC,
  deleteQC,
  updateQC,
};
