const router = require('express').Router();

const {
    getSupervisors,
    getSupervisor,
    addSupervisor,
    deleteSupervisor,
    updateSupervisor,
    login
} = require('../controllers/supervisor.controller.js')

// get all students
router.get('/', getSupervisors);

// get a single student
router.get('/:id', getSupervisor);

// add a new student
router.post('/', addSupervisor);

// delete a student
router.delete('/:id', deleteSupervisor);

// update a student
router.patch('/:id', updateSupervisor);
router.post("/operator_login",login)

module.exports = router;