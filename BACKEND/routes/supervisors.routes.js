const router = require('express').Router();

const {
    getSupervisors,
    getSupervisor,
    addSupervisor,
    deleteSupervisor,
    updateSupervisor
} = require('../controllers/supervisor.controller.js')

// get all students
router.get('/getsupervisors', getSupervisors);

// get a single student
router.get('/getsupervisor:id', getSupervisor);

// add a new student
router.post('/addsupervisor', addSupervisor);

// delete a student
router.delete('/deletesupervisor:id', deleteSupervisor);

// update a student
router.patch('/updatesupervisor:id', updateSupervisor);

module.exports = router;