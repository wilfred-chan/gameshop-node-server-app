import express from 'express';
const app = express();
app.get('/', (req, res) => {
  res.send('Welcome to GameShop!');
});
app.listen(4000);
