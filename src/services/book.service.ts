import { isValidObjectId } from 'mongoose';
import { Book, BookDocument } from '../models/book.model';
import { CustomError } from '../middleware/error.middleware';

export const addNewBook = async (bookData: BookDocument) => {
  const { author, coverImage, description, initialQty, publishedDate, publisher, qty, rating, tags, title } = bookData;

  if (!author || !coverImage || !description || !publishedDate || !publisher || !rating || !tags || !title || !qty || !initialQty) {
    throw new CustomError(422, 'All fields are required');
  }

  if (!rating.average || !rating.count) {
    throw new CustomError(400, 'Rating must include average and count');
  }

  if (initialQty < 0 || qty < 0) {
    throw new CustomError(400, 'Initial Qty and Qty should not be less than 0');
  }

  if (qty > initialQty) {
    throw new CustomError(400, 'Qty should not be more than Initial Qty');
  }

  return await Book.create(bookData);
};

export const getAllBooks = async () => {
  return await Book.find();
};

export const getBookById = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new CustomError(400, `Invalid book id: ${id}`);
  }

  const book = await Book.findById(id);

  if (!book) {
    throw new CustomError(404, `Book with id: ${id} not found`);
  }

  return book;
};

export const updateBookData = async (id: string, bookData: Partial<BookDocument>) => {
  if (!isValidObjectId(id)) {
    throw new CustomError(400, `Invalid book id: ${id}`);
  }

  const isBookExist = await Book.findById(id);

  if (!isBookExist) {
    throw new CustomError(404, `Book with id: ${id} not found`);
  }

  if ((bookData.qty && bookData.qty < 0) || (bookData.initialQty && bookData.initialQty < 0)) {
    throw new CustomError(400, 'Qty and Initial Qty should not be less than 0');
  }

  if (bookData.qty) {
    if (bookData.initialQty && bookData.qty > bookData.initialQty) {
      throw new CustomError(400, `Qty should not be more than Initial Qty`);
    } else if (bookData.qty > isBookExist.initialQty) {
      throw new CustomError(400, `Qty should not be more than Initial Qty`);
    }
  } else if (bookData.initialQty && isBookExist.qty > bookData.initialQty) {
    throw new CustomError(400, `Qty should not be more than Initial Qty`);
  }

  const updatedBook = await Book.findByIdAndUpdate(id, bookData, {
    new: true,
    runValidators: true,
  });

  if (!updatedBook) {
    throw new CustomError(404, 'Book not found');
  }

  return updatedBook;
};

export const deleteBook = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new CustomError(400, `Invalid book id: ${id}`);
  }

  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    throw new CustomError(404, `Book with id: ${id} not found`);
  }

  return book;
};
