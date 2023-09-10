import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";

import Book from "../Book";

function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    BooksAPI.get(id).then((ref) => {
      setBook(ref);
    });
  }, [id]);

  const updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      setBook(book);
    });
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-page">
        <Link to="/">Home</Link> | <Link to="/search">Search</Link>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{book && book.title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {book && <Book updateBook={updateBook} book={book} />}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
