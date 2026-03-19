import jwt from 'jsonwebtoken';
import User from '../models/user.server.model.js';
import Game from '../models/game.server.model.js';
import config from '../config/config.js';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.jwtSecret,
    { expiresIn: '30d' }
  );
};

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return User.findById(context.user.id).populate('games');
    },
    games: async () => {
      return Game.find({}).sort({ createdAt: -1 });
    },
    game: async (_, { id }) => {
      return Game.findById(id);
    },
    searchGames: async (_, { query }) => {
      return Game.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { genre: { $regex: query, $options: 'i' } },
          { platform: { $regex: query, $options: 'i' } }
        ]
      });
    }
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      const userExists = await User.findOne({ $or: [{ username }, { email }] });
      if (userExists) {
        throw new Error('User already exists');
      }

      const user = await User.create({
        username,
        email,
        password
      });

      const token = generateToken(user);
      return { token, user };
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const token = generateToken(user);
      return { token, user };
    },
    updateProfile: async (_, { email, avatarImage }, context) => {
      if (!context.user) throw new Error('Not authenticated');

      const user = await User.findById(context.user.id);
      if (!user) throw new Error('User not found');

      if (email) user.email = email;
      if (avatarImage) user.avatarImage = avatarImage;
      
      await user.save();
      return user.populate('games');
    },
    addFavoriteGame: async (_, { gameId }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      
      const user = await User.findById(context.user.id);
      const game = await Game.findById(gameId);
      
      if (!game) throw new Error('Game not found');
      
      if (!user.games.includes(gameId)) {
        user.games.push(gameId);
        await user.save();
      }
      
      return user.populate('games');
    },
    removeFavoriteGame: async (_, { gameId }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      
      const user = await User.findById(context.user.id);
      user.games = user.games.filter(id => id.toString() !== gameId.toString());
      await user.save();
      
      return user.populate('games');
    }
  },
  User: {
    id: (parent) => parent._id.toString(),
  },
  Game: {
    id: (parent) => parent._id.toString(),
  }
};

export default resolvers;
