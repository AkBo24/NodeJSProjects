import express from 'express';

type Books = {
    id: number;
    author: string;
    pages: number;
};

const booksRouter = express.Router();

const mockBooks: Books[] = [
    {
        id: 1,
        author: 'me',
        pages: 30,
    },
];

booksRouter.get('/', async (req, res) => {
    res.status(200).json(mockBooks);
});

export default booksRouter;
