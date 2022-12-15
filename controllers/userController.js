import e from 'express';
import * as userDAO from '../DAOs/userDAO.js';
const userController = (app) => {
  app.get('/api/users', getFriends);
  app.get('/api/users/:username', userDAO.findByUsername);
  app.put('/api/users/:username', updateUser);
  app.post('/api/register', register);
  app.post('/api/login', login);
};

const register = async (req, res) => {
  const user = req.body;
  const existingEmail = await userDAO.findByEmail(user.email);
  const existingUsername = await userDAO.findByUsername(user.username);
  if (existingEmail) {
    return res.status(409).json({ msg: 'Email already exists' });
  }
  if (existingUsername) {
    return res.status(409).json({ msg: 'Username already exists' });
  }
  try {
    const createdUser = await userDAO.createUser(user);
    delete createdUser['_doc']['password'];
    res.json(createdUser);
  } catch (error) {
    res.status(401).json({
      msg: 'No value for key username, email, or password. ' + error.msg,
    });
  }
};

const login = async (req, res) => {
  const user = req.body;
  if (!user.email || !user.password) {
    res.status(409).json({ msg: 'No value for key email or password' });
    return;
  }
  const foundUser = await userDAO.findByCredentials(user.email, user.password);
  if (foundUser) {
    res.json(foundUser);
  } else {
    res.status(401).json({ msg: 'Wrong email or password' });
  }
};

const updateUser = async (req, res) => {
  const user = req.body;
  const username = req.params.username;
  const status = await userDAO.updateUser(username, user);
  if (status.modifiedCount === 1) {
    res.json({ msg: 'User updated successfully', status });
  } else {
    res.status(404).json({ msg: 'User not found' });
  }
};

const getFriends = async (req, res) => {
  try {
    const users = await userDAO.findAllUsers();
    const friends = users.filter((user) => user.role === 'customer');
    res.json(friends);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export default userController;
