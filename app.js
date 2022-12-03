import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import gameController from './controllers/gameController.js';

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/gameshop';

mongoose.connect(CONNECTION_STRING, (err) => {
  if (err) throw console.log({ err });
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to GameShop Server-side!');
});
gameController(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
