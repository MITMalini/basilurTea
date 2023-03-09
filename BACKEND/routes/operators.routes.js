const router = require('express').Router();

const {
    getOperators,
    getOperator,
    addOperator,
    deleteOperator,
    updateOperator,
    login
} = require('../controllers/operators.controller.js');

// get all students
router.get('/', getOperators);

// get a single student
router.get('/:id', getOperator);

// add a new student
router.post('/', addOperator);

// delete a student
router.delete('/:id', deleteOperator);

// update a student
router.patch('/:id', updateOperator);
router.post("/operator_login",login)

module.exports = router;