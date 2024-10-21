import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../models/user.model';

const secretKey = process.env.SECRET_KEY!;

export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  const requiredFields = { username, email, password };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res.status(422).json({ status: 'failed', message: `${field} is required` });
    }
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { password, username } = req.body;
  const requiredFields = { username, password };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res.status(422).json({ status: 'failed', message: `${field} is required` });
    }
  }
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'User not registered' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    return res.status(200).json({
      status: 'success',
      message: 'Login Success',
      data: {
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};
