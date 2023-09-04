import express from 'express';

type Books = {
    id: string;
    author: string;
    pages: number;
};

const booksRouter = express.Router();

let books: Books[] = [];

booksRouter.get('/', async (req, res) => {
    res.status(200).json(books);
});

booksRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const b = books.filter((book) => book.id === id);

    res.status(200).json(b);
});

booksRouter.post('/', async (req, res) => {
    const id = books.length === 0 ? '1' : `${Number.parseInt(books.at(-1)!.id) + 1}`;
    const newBook: Books = {
        id,
        author: req.body.author,
        pages: req.body.pages,
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

booksRouter.patch('/:id', async (req, res) => {
    const id = req.params.id;
    let index = -1;

    books.forEach((book, i) => {
        if (book.id === id) {
            index = i;
            return;
        }
    });

    if (index === -1) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }
    const newBook = {
        id: id,
        author: req.body.author,
        pages: req.body.pages,
    };

    books[index] = newBook;
    res.status(200).json(newBook);
});

booksRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const updatedBooks = books.filter((book, i) => book.id !== id);
    books = updatedBooks;

    res.status(200);
});

export default booksRouter;
