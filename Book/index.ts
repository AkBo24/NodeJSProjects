import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import booksRouter from './routes/books';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/books', booksRouter);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
