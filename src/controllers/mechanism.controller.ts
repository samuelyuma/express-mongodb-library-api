import { Request, Response } from 'express';
import * as mechanismService from '../services/mechanism.service';

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const currentQty = await mechanismService.borrowBook(req.params.id);

    return res.status(200).json({
      status: 'success',
      message: 'Successfully borrowed book',
      data: { currentQty },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

    return res.status(errorMessage.includes('Invalid book id') ? 400 : 500).json({
      status: 'error',
      message: errorMessage,
    });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const currentQty = await mechanismService.returnBook(req.params.id);

    return res.status(200).json({
      status: 'success',
      message: 'Successfully returned book',
      data: { currentQty },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

    return res.status(errorMessage.includes('Invalid book id') ? 400 : 500).json({
      status: 'error',
      message: errorMessage,
    });
  }
};
