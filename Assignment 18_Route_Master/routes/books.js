const express = require('express');
const router = express.Router();

// In-memory data for books
let books = [
    { id: 1, title: "The Great Gatsby", authorId: 1, genre: "Classic", year: 1925 },
    { id: 2, title: "To Kill a Mockingbird", authorId: 2, genre: "Fiction", year: 1960 },
    { id: 3, title: "1984", authorId: 3, genre: "Dystopian", year: 1949 }
];

// GET /api/books - Get all books
router.get('/', (req, res) => {
    console.log('GET /api/books');
    res.json(books);
});

// GET /api/books/:id - Get a book by ID
router.get('/:id', (req, res) => {
    console.log(`GET /api/books/${req.params.id}`);
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});

// POST /api/books - Add a new book
router.post('/', (req, res) => {
    console.log('POST /api/books', req.body);
    const { title, authorId, genre, year } = req.body;
    if (!title || !authorId) {
        return res.status(400).send('Title and Author ID are required');
    }
    const newBook = {
        id: books.length + 1,
        title,
        authorId,
        genre,
        year
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /api/books/:id - Update a book
router.put('/:id', (req, res) => {
    console.log(`PUT /api/books/${req.params.id}`, req.body);
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    const { title, authorId, genre, year } = req.body;
    book.title = title || book.title;
    book.authorId = authorId || book.authorId;
    book.genre = genre || book.genre;
    book.year = year || book.year;

    res.json(book);
});

// DELETE /api/books/:id - Delete a book
router.delete('/:id', (req, res) => {
    console.log(`DELETE /api/books/${req.params.id}`);
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Book not found');

    const deletedBook = books.splice(index, 1);
    res.json(deletedBook[0]);
});

module.exports = router;
