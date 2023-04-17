const router = require('express').Router();

const {
    getTechnicians,
    getTechnician,
    addTechnician,
    deleteTechnician,
    updateTechnician
} = require('../controllers/technician.controller.js')

// get all students
router.get('/', getTechnicians);

// get a single student
router.get('/:id', getTechnician);

// add a new student
router.post('/', addTechnician);

// delete a student
router.delete('/:id', deleteTechnician);

// update a student
router.patch('/:id', updateTechnician);

module.exports = router;