import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  const requiredFields = { username, email, password };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res.status(422).json({ status: 'failed', message: `${field} is required` });
    }
  }

  try {
    const userData = await authService.register(email, password, username);

    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: userData,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    const statusCode = errorMessage === 'User already registered' ? 401 : 500;

    return res.status(statusCode).json({
      status: 'error',
      message: errorMessage,
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
    const loginData = await authService.login(username, password);

    return res.status(200).json({
      status: 'success',
      message: 'Login success',
      data: loginData,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    const statusCode = errorMessage === 'User not registered' || errorMessage === 'Invalid credentials' ? 401 : 500;

    return res.status(statusCode).json({
      status: 'error',
      message: errorMessage,
    });
  }
};
