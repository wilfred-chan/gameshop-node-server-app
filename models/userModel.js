import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    firstname: {
      type: String,
      trim: true,
      default: '',
    },
    lastname: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'customer', // can be 'admin' or 'customer'
    },
    bio: {
      type: String,
      default: 'This gamer is lazy and has not written a bio yet.',
    },
    location: {
      type: String,
      default: 'Unknown',
    },
    image_url: {
      type: String,
      default: '/images/avatar/avatar.jpeg',
    },
    cart: {
      type: [String],
      default: [], // e.g. ['elden-ring', 'cyberpunk-2077']
    },
    favorites: {
      type: [String],
      default: [], // e.g. ['elden-ring', 'cyberpunk-2077']
    }
  },
  {
    collection: 'users',
  }
);

const userModel = mongoose.model('userModel', userSchema);
export default userModel;
