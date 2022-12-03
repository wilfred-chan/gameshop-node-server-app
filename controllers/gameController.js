import * as gameDAO from '../DAOs/gameDAO.js';
import axios from 'axios';

const gameController = (app) => {
  app.get('/api/games', getGames);
  app.get('/api/games/:id', findGameById);
  app.post('/api/games', createGame);
  app.delete('/api/games/:id', deleteGame);
  app.put('/api/games/:id', updateGame);
};

const RAWG_API_URL = 'https://api.rawg.io/api/games/';
const RAWG_API_KEY = process.env.RAWG_API_KEY;

const getGames = async (req, res) => {
  try {
    const games = await gameDAO.findGames();
    res.json(games);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const findGameById = async (req, res) => {
  try {
    // find the game in local database
    const gameIdToFind = req.params.id;
    console.log('current game:', gameIdToFind);
    const game = await gameDAO.findGame(gameIdToFind);
    // retrieve data from RAWG API
    const config = {
      headers: { 'accept-encoding': '*' },
      params: { key: RAWG_API_KEY },
    };
    const extraInfo = await axios
      .get(RAWG_API_URL + gameIdToFind, config)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    const { rating, esrb_rating } = extraInfo;
    // retrieve game screenshots
    const screenshots = await axios
      .get(RAWG_API_URL + gameIdToFind + '/screenshots', config)
      .then((response) => {
        return response.data.results;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    console.log({ screenshots });
    // merge extra game information from RAWG API with local database data
    const mergedGame = {
      ...game._doc,
      rating,
      esrb_rating: esrb_rating.name,
      screenshots: screenshots.map((screenshot) => screenshot.image),
    };
    res.json(mergedGame);
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
    // const { cover_image } = req.body;
    // if (!cover_image)
    //   return res.status(400).json({ msg: 'No cover image URL provided.' });

    const gameIdToUpdate = req.params.id;
    const updates = req.body;
    const status = await gameDAO.updateGame(gameIdToUpdate, updates);
    res.json({ msg: 'Updated a game', status });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export default gameController;
