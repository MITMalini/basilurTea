const Supervisor = require('../models/supervisors.model.js');

//get all Supervisors

const getSupervisors = async (req, res) => {
  const supervisors = await Supervisor.find();

  if (!supervisors) {
    return res.status(404).json({ message: 'No any available supervisors found' });
  } else {
    return res.status(200).json(supervisors);
  }
};

//get / serach a single Supervisor

const getSupervisor = async (req, res) => {
  const { id } = req.params;

  const supervisor = await Supervisor.findById({ _id: id });

  if (!supervisor) {
    return res.status(404).json({ message: 'No supervisor found' });
  } else {
    return res.status(200).json(supervisor);
  }
};

//add new Supervisor

const addSupervisor = async (req, res) => {
  const epfno = Number(req.body.epfno);
  const {supervisor_name, email} =
    req.body;

  try {
    const newsupervisor = await Supervisor.create({
      epfno,
      supervisor_name,
      email
    });

    return res.status(200).json(newsupervisor);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

//delete a Supervisor

const deleteSupervisor = async (req, res) => {
  const { id } = req.params;

  const supervisor = await Supervisor.findOneAndDelete({ _id: id });

  if (!supervisor) {
    return res.status(400).json({ error: 'No such supervisor' });
  } else {
    return res.status(200).json({ message: 'Supervisor deleted successfully' });
  }
};

//update a Supervisor

const updateSupervisor = async (req, res) => {
  const { id } = req.params;

  const supervisor = await Supervisor.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!supervisor) {
    return res.status(400).json({ error: 'No such supervisor' });
  } else {
    return res.status(200).json(supervisor);
  }
};


module.exports = {
    getSupervisors,
    getSupervisor,
    addSupervisor,
    deleteSupervisor,
    updateSupervisor
};