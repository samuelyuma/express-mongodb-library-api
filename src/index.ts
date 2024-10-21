import express from 'express';
import { connectToDatabase } from './db-connection';
import { authRoutes } from './routes/auth.route';

const HOST = process.env.HOST!;
const PORT = parseInt(process.env.PORT!);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRoutes());

app.get('/', (req, res) => {
  return res.status(200).json({ status: 'success', message: 'Hello World!', date: new Date().toDateString() });
});

app.listen(PORT, async () => {
  await connectToDatabase();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
