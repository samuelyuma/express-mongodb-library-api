import { Request, Response, NextFunction } from 'express';
import * as mechanismService from '../services/mechanism.service';

export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentQty = await mechanismService.borrowBook(req.params.id);

    return res.status(200).json({
      status: 'success',
      message: 'Successfully borrowed book',
      data: { currentQty },
    });
  } catch (error) {
    return next(error);
  }
};

export const returnBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentQty = await mechanismService.returnBook(req.params.id);

    return res.status(200).json({
      status: 'success',
      message: 'Successfully returned book',
      data: { currentQty },
    });
  } catch (error) {
    return next(error);
  }
};
