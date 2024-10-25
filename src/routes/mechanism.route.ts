import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { borrowBook, returnBook } from '../controllers/mechanism.controller';

export const mechanismRoutes = () => {
  const router = Router();

  router.use(authenticateToken);

  router.post('/borrow/:id', borrowBook);
  router.post('/return/:id', returnBook);

  return router;
};
