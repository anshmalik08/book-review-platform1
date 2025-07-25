
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 3, title: "Deep Work", author: "Cal Newport" },
  { id: 4, title: "Zero to One", author: "Peter Thiel" },
  { id: 5, title: "Clean Code", author: "Robert C. Martin" }
];

let reviews = [
  { id: 1, bookId: 1, review: "Great book on building habits." }
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.get('/reviews', (req, res) => {
  res.json(reviews);
});

app.post('/reviews', (req, res) => {
  const { bookId, review } = req.body;
  const newReview = {
    id: reviews.length + 1,
    bookId,
    review
  };
  reviews.push(newReview);
  res.status(201).json(newReview);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
