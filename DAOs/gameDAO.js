import gameModel from '../models/gameModel.js';
export const findGame = () => gameModel.find();
export const createGame = (game) => gameModel.create(game);
export const deleteGame = (id) => gameModel.deleteOne({ _id: id });
export const updateGame = (id, game) =>
  gameModel.updateOne({ _id: id }, { $set: game });
