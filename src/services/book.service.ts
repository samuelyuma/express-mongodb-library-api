import { isValidObjectId } from 'mongoose';
import { Book, BookDocument } from '../models/book.model';

export const addNewBook = async (bookData: BookDocument) => {
  const { author, coverImage, description, initialQty, publishedDate, publisher, qty, rating, tags, title } = bookData;

  if (!author || !coverImage || !description || !publishedDate || !publisher || !rating || !tags || !title || !qty || !initialQty) {
    throw new Error('All fields are required');
  }

  if (!rating.average || !rating.count) {
    throw new Error('Rating must include average and count');
  }

  if (initialQty <= 0 || qty <= 0) {
    throw new Error('Initial Qty and Qty should not be 0 or less');
  }

  if (qty > initialQty) {
    throw new Error('Qty should not be more than Initial Qty');
  }

  return await Book.create(bookData);
};

export const getAllBooks = async () => {
  return await Book.find();
};

export const getBookById = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new Error(`Invalid book id: ${id}`);
  }

  const book = await Book.findById(id);

  if (!book) {
    throw new Error(`Book with id: ${id} not found`);
  }

  return book;
};

export const updateBookData = async (id: string, bookData: Partial<BookDocument>) => {
  if (!isValidObjectId(id)) {
    throw new Error(`Invalid book id: ${id}`);
  }

  const updatedBook = await Book.findByIdAndUpdate(id, bookData, {
    new: true,
    runValidators: true,
  });

  if (!updatedBook) {
    throw new Error('Book not found');
  }

  return updatedBook;
};

export const deleteBook = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new Error(`Invalid book id: ${id}`);
  }

  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    throw new Error(`Book with id: ${id} not found`);
  }

  return book;
};
