import { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { isValidObjectId } from 'mongoose';

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 'error',
        message: `Invalid book id: ${id}`,
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: `Book with id: ${id} not found`,
      });
    }

    if (book.qty === 0) {
      return res.status(400).json({
        status: 'error',
        message: `Book with id: ${id} has no amount left`,
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { qty: book.qty - 1 },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      status: 'success',
      message: 'Successfully borrow book',
      data: { currentQty: updatedBook?.qty },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 'error',
        message: `Invalid book id: ${id}`,
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: `Book with id: ${id} not found`,
      });
    }

    if (book.initialQty === book.qty) {
      return res.status(400).json({
        status: 'error',
        message: `Book with id: ${id} is already on maximum Quantity`,
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { qty: book.qty + 1 },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      status: 'success',
      message: 'Successfully return book',
      data: { currentQty: updatedBook?.qty },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};
