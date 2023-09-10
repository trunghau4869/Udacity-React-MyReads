import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";

import Shelf from "../Shelf";

function MainPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((resp) => {
      setBooks(resp);
    });
  }, []);

  const updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((resp) => {
      book.shelf = shelf;
      setBooks((prevBooks) =>
        prevBooks.filter((b) => b.id !== book.id).concat([book])
      );
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
          <Shelf
            updateBook={updateBook}
            name="Currently Reading"
            books={books.filter((b) => b.shelf === "currentlyReading")}
          />
          <Shelf
            updateBook={updateBook}
            name="Want To Read"
            books={books.filter((b) => b.shelf === "wantToRead")}
          />
          <Shelf
            updateBook={updateBook}
            name="Read"
            books={books.filter((b) => b.shelf === "read")}
          />
        </div>
      </div>
    </div>
  );
}

export default MainPage;