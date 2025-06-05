import express from 'express';
import dotenv from 'dotenv';
import { db } from './db/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

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
