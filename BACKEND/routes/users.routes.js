const router = require('express').Router();

const {
    getUsers,
    getUser,
    addUser,
    login
    
} = require('../controllers/users.controllers.js')


// add a new student
router.post('/getusers', getUsers);
router.get('/getuser/:id', getUser);
router.post('/adduser', addUser);
router.post('/login', login);

module.exports = router;