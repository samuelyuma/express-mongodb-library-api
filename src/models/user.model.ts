import mongoose, { Schema, Document } from 'mongoose';

type UserDocument = Document & {
  username: string;
  email: string;
  password: string;
};

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: 'users', timestamps: true },
);

const User = mongoose.model<UserDocument>('User', userSchema);

export { User };
export type { UserDocument };
