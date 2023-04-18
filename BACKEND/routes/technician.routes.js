const router = require('express').Router();

const {
    getTechnicians,
    getTechnician,
    addTechnician,
    deleteTechnician,
    updateTechnician
} = require('../controllers/technician.controller.js')

// get all students
router.get('/gettechnicians', getTechnicians);

// get a single student
router.get('/gettechnician:id', getTechnician);

// add a new student
router.post('/addtechnician', addTechnician);

// delete a student
router.delete('/deletetechnician:id', deleteTechnician);

// update a student
router.patch('/updatetechnician:id', updateTechnician);

module.exports = router;