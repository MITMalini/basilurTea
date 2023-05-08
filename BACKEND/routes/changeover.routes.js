const router = require('express').Router();

const {
    getChangeovers,
    getChangeover,
    addChangeover,
    deleteChangeover,
    updateChangeover
    
} = require('../controllers/changeover.controller')

// get all students
router.get('/getchangeovers', getChangeovers);

// get a single student
router.get('/getchangeover/:id', getChangeover);

// add a new student
router.post('/addchangeover', addChangeover);

// delete a student
router.delete('/deletechangeover/:id', deleteChangeover);

// update a student
router.patch('/updatechangeover/:id', updateChangeover);


module.exports = router;