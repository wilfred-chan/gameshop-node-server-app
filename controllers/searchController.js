import * as gameDAO from '../DAOs/gameDAO.js';
import axios from 'axios';

const searchController = (app) => {
  app.get('/api/search/:input', searchGames);
};

const RAWG_API_URL = 'https://api.rawg.io/api/games';
const RAWG_API_KEY = process.env.RAWG_API_KEY;

const searchGames = async (req, res) => {
  try {
    const input = req.params.input;
    // retrieve search results from RAWG API
    const config = {
      headers: { 'accept-encoding': '*' },
      params: { key: RAWG_API_KEY, search: input, page_size: 10 },
    };
    let { results } = await axios
      .get(RAWG_API_URL, config)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    // extract useful fields from 3rd party API data
    results = results.map((result) => {
      const { slug, name, rating, released } = result;
      return { game_id: slug, title: name, rating, released };
    });
    // iterate and match each result with local database data, then merge them
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const game = await gameDAO.findGame(result.game_id);
      if (game !== null) {
        results[i] = {
          ...result,
          ...game._doc,
        };
      }
    }
    res.json(results);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export default searchController;
