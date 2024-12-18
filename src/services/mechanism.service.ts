import { CustomError } from '../middleware/error.middleware';
import { Book } from '../models/book.model';
import { isValidObjectId } from 'mongoose';

export const borrowBook = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new CustomError(400, `Invalid book id: ${id}`);
  }

  const book = await Book.findById(id);

  if (!book) {
    throw new CustomError(404, `Book with id: ${id} not found`);
  }

  if (book.qty === 0) {
    throw new CustomError(400, `Book with id: ${id} has no amount left`);
  }

  const updatedBook = await Book.findByIdAndUpdate(
    id,
    { qty: book.qty - 1 },
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedBook?.qty;
};

export const returnBook = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new CustomError(400, `Invalid book id: ${id}`);
  }

  const book = await Book.findById(id);

  if (!book) {
    throw new CustomError(404, `Book with id: ${id} not found`);
  }

  if (book.initialQty === book.qty) {
    throw new CustomError(400, `Book with id: ${id} is already at maximum quantity`);
  }

  const updatedBook = await Book.findByIdAndUpdate(
    id,
    { qty: book.qty + 1 },
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedBook?.qty;
};
