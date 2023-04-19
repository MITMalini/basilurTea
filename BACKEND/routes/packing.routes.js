const router = require('express').Router();

const {
    getPackings,
    getPacking,
    addPacking,
    deletePacking,
    updatePacking
} = require('../controllers/packing.controller.js')

// get all students
router.get('/getpackings', getPackings);

// get a single student
router.get('/getpacking:id', getPacking);

// add a new student
router.post('/addpacking', addPacking);

// delete a student
router.delete('/deletepacking:id', deletePacking);

// update a student
router.patch('/updatepacking:id', updatePacking);

module.exports = router;