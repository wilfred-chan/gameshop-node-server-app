import userModel from '../models/userModel.js';

export const createUser = (user) => userModel.create(user);
export const findByEmail = (email) => userModel.findOne({ email });
export const findByUsername = (username) => userModel.findOne({ username });
export const findByCredentials = (email, password) =>
  userModel.findOne({ email, password }, { password: 0 });
export const findAllUsers = () => userModel.find();
export const updateUser = (username, user) => {
  return userModel.updateOne({ username: username }, { $set: user });
};
