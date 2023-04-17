const router = require('express').Router();

const {
    getQCs,
    getQC,
    addQC,
    deleteQC,
    updateQC 
} = require('../controllers/qc.controller.js')

// get all students
router.get('/', getQCs);

// get a single student
router.get('/:id', getQC);

// add a new student
router.post('/', addQC);

// delete a student
router.delete('/:id', deleteQC);

// update a student
router.patch('/:id', updateQC);

module.exports = router;