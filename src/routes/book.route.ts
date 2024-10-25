import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { addNewBook, getAllBooks, getBookById, removeBook, modifyBookData } from '../controllers/book.controller';

export const bookRoutes = () => {
  const router = Router();

  router.use(authenticateToken);

  router.post('/', addNewBook);
  router.get('/', getAllBooks);
  router.get('/:id', getBookById);
  router.patch('/:id', modifyBookData);
  router.delete('/:id', removeBook);

  return router;
};
