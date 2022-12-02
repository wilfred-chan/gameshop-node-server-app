import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    game_id: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
  },
  {
    collection: 'games',
  }
);

const gameModel = mongoose.model('gameModel', gameSchema);
export default gameModel;
