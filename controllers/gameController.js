import * as gameDAO from '../DAOs/gameDAO.js';
import gameModel from '../models/gameModel.js';

const gameController = (app) => {
  app.get('/api/games', getGames);
  //   app.get('/api/games/:id', findGameById);
  app.post('/api/games', createGame);
  app.delete('/api/games/:id', deleteGame);
  app.put('/api/games/:id', updateGame);
};

const getGames = async (req, res) => {
  try {
    const games = await gameDAO.findGame();
    res.json(games);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const createGame = async (req, res) => {
  try {
    // const { game_id, cover_image } = req.body;
    // if (!cover_image)
    //   return res.status(400).json({ msg: 'No cover image URL provided.' });
    // const game = await gameModel.findOne({ game_id });
    // if (game) return res.status(400).json({ msg: 'This game already exists.' });

    const newGame = req.body;
    const createdGame = await gameDAO.createGame(newGame);
    res.json(createdGame);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const deleteGame = async (req, res) => {
  try {
    const gameIdToDelete = req.params.id;
    const status = await gameDAO.deleteGame(gameIdToDelete);
    res.json({ msg: 'Deleted a game.', status });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const updateGame = async (req, res) => {
  try {
    const { cover_image } = req.body;
    if (!cover_image)
      return res.status(400).json({ msg: 'No cover image URL provided.' });

    const gameIdToUpdate = req.params.id;
    const updates = req.body;
    const status = await gameDAO.updateGame(gameIdToUpdate, updates);
    res.json({ msg: 'Updated a game', status });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export default gameController;
