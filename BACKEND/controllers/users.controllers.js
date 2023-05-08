const User = require('../models/users.models.js');

const getUsers = async (req, res) => {
  const users = await  User.find();

  if (!users) {
    return res.status(404).json({ message: 'No any available changeovers found' });
  } else {
    return res.status(200).json(users);
  }
};
//add new User

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await  User.findById({ _id: id });

  if (!user) {
    return res.status(404).json({ message: 'No user found' });
  } else {
    return res.status(200).json(user);
  }
};
const addUser = async (req, res) => {
  
  const {username, password} =
    req.body;

  try {
    const newuser = await User.create({
      username,
      password
    });

    return res.status(200).json(newuser);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const data = { username: username, password: password }
  return User.find(data)
    .then((user) => {
      if (user.length > 0) {
        
        return res.status(200).json({ user })
      } else {
        return res.status(404).json({ "message": "user not found" })
      }
    })
    .catch(err => { console.log("login failed " + err) })
}

module.exports = {
  getUsers,
  getUser,
    addUser,
    login,
};