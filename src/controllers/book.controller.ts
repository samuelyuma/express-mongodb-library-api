import { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { isValidObjectId } from 'mongoose';

export const addNewBook = async (req: Request, res: Response) => {
  try {
    const { author, coverImage, description, initialQty, publishedDate, publisher, qty, rating, tags, title } = req.body;

    if (!author || !coverImage || !description || !publishedDate || !publisher || !rating || !tags || !title || !qty || !initialQty) {
      return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    if (!rating.average || !rating.count) {
      return res.status(400).json({ status: 'error', message: 'Rating must include average and count' });
    }

    if (initialQty <= 0 || qty <= 0) {
      return res.status(400).json({ status: 'error', message: 'Initial Qty and Qty should not be 0 or less' });
    }

    if (qty > initialQty) {
      return res.status(400).json({ status: 'error', message: 'Qty should not be more than Initial Qty' });
    }

    const newBook = {
      author,
      coverImage,
      description,
      publishedDate,
      publisher,
      rating: {
        average: rating.average,
        count: rating.count,
      },
      tags,
      title,
      initialQty,
      qty,
    };

    const book = await Book.create(newBook);

    return res.status(201).json({
      status: 'success',
      message: 'Book added successfully',
      data: {
        book,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();

    return res.status(200).json({
      status: 'success',
      message: 'Successfully get all books',
      data: books.length > 0 ? books : [],
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
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

    return res.status(200).json({
      status: 'success',
      message: 'Successfully get book',
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const modifyBookData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 'error',
        message: `Invalid book id: ${id}`,
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedBook) {
      return res.status(404).json({
        status: 'error',
        message: `Book not found`,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Successfully update book',
      data: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const removeBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 'error',
        message: `Invalid book id: ${id}`,
      });
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: `Book with id: ${id} not found`,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Successfully remove book',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};
