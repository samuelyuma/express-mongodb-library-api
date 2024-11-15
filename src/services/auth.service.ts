import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { CustomError } from '../middleware/error.middleware';

const secretKey = process.env.SECRET_KEY!;

export const register = async (email: string, password: string, username: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await User.findOne({ username, email });

  if (existingUser) {
    throw new CustomError(400, 'User already registered');
  }

  const user = await User.create({
    email,
    password: hashedPassword,
    username,
  });

  return {
    id: user._id,
    username: user.username,
    email: user.email,
  };
};

export const login = async (username: string, password: string) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new CustomError(401, 'User not registered');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new CustomError(401, 'Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

  return {
    user: {
      username: user.username,
      email: user.email,
    },
    token,
  };
};
