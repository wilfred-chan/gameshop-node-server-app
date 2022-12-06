import e from 'express';
import * as userDAO from '../DAOs/userDAO.js';
const userController = (app) => {
  // app.get('/api/users', userDAO.findAllUsers);
  // app.post('/api/users', userDAO.createUser);
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
    res
      .status(401)
      .json({ msg: 'No value for key username, email, or password' });
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
  const result = await userDAO.updateUser(username, user);
  if (result.modifiedCount === 1) {
    res.json({ msg: 'User updated successfully' });
  } else {
    res.status(404).json({ msg: 'User not found' });
  }
};

export default userController;