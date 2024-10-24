import mongoose, { Document, Schema } from 'mongoose';

type BookDocument = Document & {
  title: string;
  author: string;
  publishedDate: Date;
  publisher: string;
  description: string;
  coverImage: string;
  rating: {
    average: number;
    count: number;
  };
  tags: string[];
  initialQty: number;
  qty: number;
};

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    publisher: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    rating: {
      average: { type: Number, required: true },
      count: { type: Number, required: true },
    },
    tags: { type: [String], required: true },
    initialQty: { type: Number, required: true },
    qty: { type: Number, required: true },
  },
  { collection: 'books', timestamps: true },
);

const Book = mongoose.model<BookDocument>('Book', bookSchema);

export { Book };
export type { BookDocument };
