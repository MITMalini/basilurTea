const router = require('express').Router();

const {
    getQCs,
    getQC,
    addQC,
    deleteQC,
    updateQC 
} = require('../controllers/qc.controller.js')

// get all students
router.get('/getqcs', getQCs);

// get a single student
router.get('/getqc:id', getQC);

// add a new student
router.post('/addqc', addQC);

// delete a student
router.delete('/deleteqc:id', deleteQC);

// update a student
router.patch('/updateqc:id', updateQC);

module.exports = router;