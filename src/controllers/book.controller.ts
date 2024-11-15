import { Request, Response, NextFunction } from 'express';
import * as bookService from '../services/book.service';

export const addNewBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await bookService.addNewBook(req.body);

    return res.status(201).json({
      status: 'success',
      message: 'Book added successfully',
      data: { book },
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllBooks = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const books = await bookService.getAllBooks();

    return res.status(200).json({
      status: 'success',
      message: 'Successfully get all books',
      data: books,
    });
  } catch (error) {
    return next(error);
  }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    return res.status(200).json({
      status: 'success',
      message: 'Successfully get book',
      data: book,
    });
  } catch (error) {
    return next(error);
  }
};

export const modifyBookData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedBook = await bookService.updateBookData(req.params.id, req.body);

    return res.status(200).json({
      status: 'success',
      message: 'Successfully update book',
      data: updatedBook,
    });
  } catch (error) {
    return next(error);
  }
};

export const removeBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await bookService.deleteBook(req.params.id);
    return res.status(200).json({
      status: 'success',
      message: 'Successfully remove book',
    });
  } catch (error) {
    return next(error);
  }
};
