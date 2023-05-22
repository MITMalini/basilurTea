const Error = require('../models/errors.model.js');

//get all Errors

const getErrors = async (req, res) => {
  const errors = await Error.find();

  if (!errors) {
    return res.status(404).json({ message: 'No any available errors found' });
  } else {
    return res.status(200).json(errors);
  }
};

//get / serach a single Error

const getError = async (req, res) => {
  const { id } = req.params;

  const error = await Error.findById({ _id: id });

  if (!error) {
    return res.status(404).json({ message: 'No error found' });
  } else {
    return res.status(200).json(error);
  }
};

//add new Error

const addError = async (req, res) => {
  const {errorno, error_description } =
    req.body;

  try {
    const error = await Error.create({
        errorno,
        error_description
    });

    return res.status(200).json(error);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

//delete a Error

const deleteError = async (req, res) => {
  const { id } = req.params;

  const error = await Error.findOneAndDelete({ _id: id });

  if (!error) {
    return res.status(400).json({ error: 'No such error' });
  } else {
    return res.status(200).json({ message: 'Error deleted successfully' });
  }
};

//update a Error

const updateError = async (req, res) => {
  const { id } = req.params;

  const error = await Error.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!error) {
    return res.status(400).json({ error: 'No such error' });
  } else {
    return res.status(200).json(error);
  }
};

module.exports = {
    getErrors,
    getError,
    addError,
    deleteError,
    updateError,
};