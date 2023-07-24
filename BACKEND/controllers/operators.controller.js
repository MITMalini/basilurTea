const Operator = require("../models/operators.model.js");

//get all Operators

const getOperators = async (req, res) => {
  const q = req.query.q;

  const operators = await Operator.find();

  if (!operators) {
    return res
      .status(404)
      .json({ message: "No any available operators found" });
  } else {
    return res.status(200).json(operators);
  }
};

//get / serach a single Operator

const getOperator = async (req, res) => {
  const { id } = req.params;

  const operator = await Operator.findById({ _id: id });

  if (!operator) {
    return res.status(404).json({ message: "No operator found" });
  } else {
    return res.status(200).json(operator);
  }
};

//add new Operator

const addOperator = async (req, res) => {
  const epfno = Number(req.body.epfno);
  const { operator_name } = req.body;

  try {
    const newoperator = await Operator.create({
      epfno,
      operator_name,
    });

    return res.status(200).json(newoperator);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

//delete a Operator

const deleteOperator = async (req, res) => {
  const { id } = req.params;

  const operator = await Operator.findOneAndDelete({ _id: id });

  if (!operator) {
    return res.status(400).json({ error: "No such operator" });
  } else {
    return res.status(200).json({ message: "Operator deleted successfully" });
  }
};

//update a Operator

const updateOperator = async (req, res) => {
  const { id } = req.params;

  const operator = await Operator.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!operator) {
    return res.status(400).json({ error: "No such operator" });
  } else {
    return res.status(200).json(operator);
  }
};

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const data = { email: email, password: password }
//   return Operator.find(data)
//     .then((operator) => {
//       if (operator.length > 0) {

//         return res.status(200).json({ operator })
//       } else {
//         return res.status(404).json({ "message": "operator not found" })
//       }
//     })
//     .catch(err => { console.log("login failed " + err) })
// }

module.exports = {
  getOperators,
  getOperator,
  addOperator,
  deleteOperator,
  updateOperator,
  // login,
};
