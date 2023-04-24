const  Changeover = require('../models/changeover.models');

//get all Technicians

const getChangeovers = async (req, res) => {
  const changeovers = await  Changeover.find();

  if (!changeovers) {
    return res.status(404).json({ message: 'No any available changeovers found' });
  } else {
    return res.status(200).json(changeovers);
  }
};

//get searach a single  Technician

const getChangeover = async (req, res) => {
  const { id } = req.params;

  const changeover = await  Changeover.findById({ _id: id });

  if (!changeover) {
    return res.status(404).json({ message: 'No changeover found' });
  } else {
    return res.status(200).json(changeover);
  }
};

//add new  Technician

const addChangeover = async (req, res) => {
    const bag_count = Number(req.body.bag_count);
    const error_count = Number(req.body.error_count);
    const Changeover = Number(req.body.Changeover);
  const { Date, Packing_name,operator_name,technician_name,qc_name,supervisor_name,runtime,jogtime} =
    req.body;

  try {
    const newchangeover = await  Changeover.create({
        Date,
        Changeover,
        Packing_name,
        operator_name,
        technician_name,
        qc_name,
        supervisor_name,
        bag_count,
        error_count,
        runtime,
        jogtime
    });

    return res.status(200).json(newchangeover);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

//delete a  Technician

const deleteChangeover = async (req, res) => {
  const { id } = req.params;

  const changeover = await  Changeover.findOneAndDelete({ _id: id });

  if (!changeover) {
    return res.status(400).json({ error: 'No such changeover' });
  } else {
    return res.status(200).json({ message: ' changeover deleted successfully' });
  }
};

//update a  Technician

const updateChangeover = async (req, res) => {
  const { id } = req.params;

  const changeover = await  Changeover.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!changeover) {
    return res.status(400).json({ error: 'No such changeover' });
  } else {
    return res.status(200).json(changeover);
  }
};

module.exports = {
    getChangeovers,
    getChangeover,
    addChangeover,
    deleteChangeover,
    updateChangeover,
};