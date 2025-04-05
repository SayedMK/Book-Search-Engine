import { User } from '../models/User.js';
import { signToken } from '../utils/auth.js';

export const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return await User.findById(context.user._id).populate('savedBooks');
      }
      throw new Error('Not authenticated');
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error('Invalid credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { bookId, title, authors, description, image, link }, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: { bookId, title, authors, description, image, link } } },
        { new: true }
      );
    },
    removeBook: async (_, { bookId }, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },
  },
};