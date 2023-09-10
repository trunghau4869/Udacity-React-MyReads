import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import * as BooksAPI from "../../BooksAPI";

import Book from "../Book";

function SearchPage() {
  const [books, setBooks] = useState([]);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    BooksAPI.getAll().then((resp) => {
      setBooks(resp);
    });
  }, []);

  function updateQuery(query) {
    setQuery(query);
    submitSearch(query);
  }

  function submitSearch(query) {
    if (query === "" || query === undefined) {
      setResults([]);
    } else {
      BooksAPI.search(query.trim()).then((res) => {
        if (res.error) {
          setResults([]);
        } else {
          res.forEach((b) => {
            let f = books.filter((B) => B.id === b.id);
            if (f[0]) {
              b.shelf = f[0].shelf;
            }
          });
          setResults(res);
        }
      });
    }
  }

  function updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then((resp) => {
      book.shelf = shelf;
      setBooks((prevBooks) =>
        prevBooks
          .filter((b) => b.id !== book.id)
          .concat([book])
      );
    });
  }

  return (
 
    <div className="search-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-page">
        <Link to="/">Home</Link> | <Link to="/search">Search</Link>
      </div>
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {results.map((book, key) => (
            <Book updateBook={updateBook} book={book} key={key} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;