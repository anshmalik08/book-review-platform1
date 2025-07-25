import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000';

function App() {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [newReview, setNewReview] = useState({ bookId: '', review: '' });
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchBooks();
    fetchReviews();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/books`);
      setBooks(res.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/reviews`);
      setReviews(res.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const addBook = async () => {
    if (!newBook.title || !newBook.author) return;
    try {
      await axios.post(`${API_URL}/books`, newBook);
      setNewBook({ title: '', author: '' });
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const addReview = async () => {
    if (!newReview.bookId || !newReview.review) return;
    try {
      await axios.post(`${API_URL}/reviews`, newReview);
      setNewReview({ bookId: '', review: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="book-icon">📚</span>
            BookSpace
            <span className="subtitle">Your Literary Community</span>
          </h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="content-grid">
          {/* Add Book Section */}
          <section className="card add-book-card">
            <div className="card-header">
              <h2 className="card-title">
                <span className="icon">✨</span>
                Add New Book
              </h2>
            </div>
            <div className="card-body">
              <div className="input-group">
                <input
                  className="modern-input"
                  placeholder="Book Title"
                  value={newBook.title}
                  onChange={e => setNewBook({ ...newBook, title: e.target.value })}
                />
                <input
                  className="modern-input"
                  placeholder="Author Name"
                  value={newBook.author}
                  onChange={e => setNewBook({ ...newBook, author: e.target.value })}
                />
                <button 
                  className="btn btn-primary"
                  onClick={addBook}
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Book'}
                </button>
              </div>
            </div>
          </section>

          {/* Books Display */}
          <section className="card books-card">
            <div className="card-header">
              <h2 className="card-title">
                <span className="icon">📖</span>
                Book Collection ({books.length})
              </h2>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Loading books...</p>
                </div>
              ) : (
                <div className="books-grid">
                  {books.map(book => (
                    <div key={book.id} className="book-item">
                      <div className="book-cover">
                        <span className="book-emoji">📚</span>
                      </div>
                      <div className="book-info">
                        <h3 className="book-title">{book.title}</h3>
                        <p className="book-author">by {book.author}</p>
                        <span className="book-id">ID: {book.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {books.length === 0 && !loading && (
                <div className="empty-state">
                  <span className="empty-icon">📚</span>
                  <p>No books yet. Add your first book!</p>
                </div>
              )}
            </div>
          </section>

          {/* Add Review Section */}
          <section className="card add-review-card">
            <div className="card-header">
              <h2 className="card-title">
                <span className="icon">💭</span>
                Share Your Review
              </h2>
            </div>
            <div className="card-body">
              <div className="input-group">
                <select
                  className="modern-select"
                  value={newReview.bookId}
                  onChange={e => setNewReview({ ...newReview, bookId: e.target.value })}
                >
                  <option value="">Select a book...</option>
                  {books.map(book => (
                    <option key={book.id} value={book.id}>
                      {book.title} by {book.author}
                    </option>
                  ))}
                </select>
                <textarea
                  className="modern-textarea"
                  placeholder="Write your review..."
                  value={newReview.review}
                  onChange={e => setNewReview({ ...newReview, review: e.target.value })}
                  rows="4"
                />
                <button 
                  className="btn btn-secondary"
                  onClick={addReview}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </section>

          {/* Reviews Display */}
          <section className="card reviews-card">
            <div className="card-header">
              <h2 className="card-title">
                <span className="icon">⭐</span>
                Community Reviews ({reviews.length})
              </h2>
            </div>
            <div className="card-body">
              <div className="reviews-list">
                {reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <span className="review-book-id">Book #{review.bookId}</span>
                      <span className="review-date">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <p className="review-content">{review.review}</p>
                    <div className="review-footer">
                      <span className="review-rating">⭐⭐⭐⭐⭐</span>
                    </div>
                  </div>
                ))}
              </div>
              {reviews.length === 0 && (
                <div className="empty-state">
                  <span className="empty-icon">💭</span>
                  <p>No reviews yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 BookSpace. Made with ❤️ for Ansh Malik</p>
      </footer>
    </div>
  );
}

export default App;
