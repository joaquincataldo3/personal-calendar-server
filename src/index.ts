import express from 'express';
import dotenv from 'dotenv';
import { db } from './db/database';
import authRouter from './routes/auth.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true, 
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);

db.connect()
  .then(() => {
    console.log('successfully connected to db ');
    app.listen(PORT, () => {
      console.log(`server running on ${PORT} port`);
    });
  })
  .catch((err) => {
    console.error('error while connecting to db ', err);
  });
