import gameModel from '../models/gameModel.js';
export const findGames = () => gameModel.find();
export const findGame = (gid) => gameModel.findOne({ game_id: gid });
export const createGame = (game) => gameModel.create(game);
export const deleteGame = (gid) => gameModel.deleteOne({ game_id: gid });
export const updateGame = (gid, game) =>
  gameModel.updateOne({ game_id: gid }, { $set: game });
