const router = require('express').Router();

const {
    getOperators,
    getOperator,
    addOperator,
    deleteOperator,
    updateOperator
    // login
} = require('../controllers/operators.controller.js')

// get all students
router.get('/getoperators', getOperators);

// get a single student
router.get('/getoperator:id', getOperator);

// add a new student
router.post('/addoperator', addOperator);

// delete a student
router.delete('/deleteoperator:id', deleteOperator);

// update a student
router.patch('/updateoperator:id', updateOperator);
// router.post("/operator_login",login)

module.exports = router;