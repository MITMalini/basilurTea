const router = require('express').Router();

const {
    getErrors,
    getError,
    addError,
    deleteError,
    updateError
} = require('../controllers/errors.controller.js');

// get all students
router.get('/', getErrors);

// get a single student
router.get('/:id', getError);

// add a new student
router.post('/', addError);

// delete a student
router.delete('/:id', deleteError);

// update a student
router.patch('/:id', updateError);

module.exports = router;