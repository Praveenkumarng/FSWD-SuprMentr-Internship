const express = require('express');
const router = express.Router();

// In-memory data for authors
let authors = [
    { id: 1, name: "F. Scott Fitzgerald", nationality: "American", birthYear: 1896 },
    { id: 2, name: "Harper Lee", nationality: "American", birthYear: 1926 },
    { id: 3, name: "George Orwell", nationality: "British", birthYear: 1903 }
];

// GET /api/authors - Get all authors
router.get('/', (req, res) => {
    console.log('GET /api/authors');
    res.json(authors);
});

// GET /api/authors/:id - Get an author by ID
router.get('/:id', (req, res) => {
    console.log(`GET /api/authors/${req.params.id}`);
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) return res.status(404).send('Author not found');
    res.json(author);
});

// POST /api/authors - Add a new author
router.post('/', (req, res) => {
    console.log('POST /api/authors', req.body);
    const { name, nationality, birthYear } = req.body;
    if (!name) {
        return res.status(400).send('Name is required');
    }
    const newAuthor = {
        id: authors.length + 1,
        name,
        nationality,
        birthYear
    };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

// PUT /api/authors/:id - Update an author
router.put('/:id', (req, res) => {
    console.log(`PUT /api/authors/${req.params.id}`, req.body);
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) return res.status(404).send('Author not found');

    const { name, nationality, birthYear } = req.body;
    author.name = name || author.name;
    author.nationality = nationality || author.nationality;
    author.birthYear = birthYear || author.birthYear;

    res.json(author);
});

// DELETE /api/authors/:id - Delete an author
router.delete('/:id', (req, res) => {
    console.log(`DELETE /api/authors/${req.params.id}`);
    const index = authors.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Author not found');

    const deletedAuthor = authors.splice(index, 1);
    res.json(deletedAuthor[0]);
});

module.exports = router;
