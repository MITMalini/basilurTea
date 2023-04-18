const  Technician = require('../models/technician.model.js');

//get all Technicians

const getTechnicians = async (req, res) => {
  const technicians = await  Technician.find();

  if (!technicians) {
    return res.status(404).json({ message: 'No any available technicians found' });
  } else {
    return res.status(200).json(technicians);
  }
};

//get searach a single  Technician

const getTechnician = async (req, res) => {
  const { id } = req.params;

  const technician = await  Technician.findById({ _id: id });

  if (!technician) {
    return res.status(404).json({ message: 'No technician found' });
  } else {
    return res.status(200).json(technician);
  }
};

//add new  Technician

const addTechnician = async (req, res) => {
  const { epfno, technician_name, email} =
    req.body;

  try {
    const newtechnician = await  Technician.create({
      epfno,
      technician_name,
      email,
    });

    return res.status(200).json(newtechnician);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

//delete a  Technician

const deleteTechnician = async (req, res) => {
  const { id } = req.params;

  const technician = await  Technician.findOneAndDelete({ _id: id });

  if (!technician) {
    return res.status(400).json({ error: 'No such technician' });
  } else {
    return res.status(200).json({ message: ' Technician deleted successfully' });
  }
};

//update a  Technician

const updateTechnician = async (req, res) => {
  const { id } = req.params;

  const technician = await  Technician.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!technician) {
    return res.status(400).json({ error: 'No such technician' });
  } else {
    return res.status(200).json(technician);
  }
};

module.exports = {
    getTechnicians,
    getTechnician,
    addTechnician,
    deleteTechnician,
    updateTechnician,
};