const  Changeover = require('../models/changeover.models.js');

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
    // const bag_count = Number(req.body.bag_count);
    // const error_count = Number(req.body.error_count);
    const Changeoverno = Number(req.body.Changeoverno);
  const { selectedshift,selectedoperator,selectedpacking,selectedqc,selectedtechnician,selectedsupervisor} =
    req.body;

  try {
    const newchangeover = await  Changeover.create({
        selectedshift,
        selectedoperator,
        selectedpacking,
        selectedqc,
        selectedtechnician,
        selectedsupervisor
        // bag_count,
        // error_count,
        // runtime,
        // start_time,
        // end_time
    });
    const savedChangeover = await newchangeover.save();

    return res.status(200).json(savedChangeover);
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