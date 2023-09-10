import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Book = ({ book, updateBook, myKey }) => {
  const shelfNames = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want To Read",
    read: "Read",
  };
  const thumbnail = (book.imageLinks && book.imageLinks.thumbnail) || "";

  const switchShelfName = () => {
    return shelfNames[book.shelf] || "None";
  };

  const shelves = [
    { id: "1",shelfName: "currentReading",shelfDisplayName: "Currently Reading" },
    { id: "2", shelfName: "wantToRead", shelfDisplayName: "Want to Read" },
    { id: "3", shelfName: "read", shelfDisplayName: "Read" },
    { id: "4", shelfName: "none", shelfDisplayName: "None" },
  ];
  
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url("${thumbnail}")`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={book.shelf}
              onChange={(e) => updateBook(book, e.target.value)}
            >
              {shelves.map((option, index) => (
                <option key={index} value={option.shelfName}>
                  {option.shelfDisplayName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">
          <Link to={`/book/${book.id}`}>{book.title}</Link>
        </div>
        <div className="book-authors">
          {book.authors && book.authors[0] ? book.authors[0] : "No Author..."}
        </div>
        <div className="book-authors">{switchShelfName()}</div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.element.isRequired,
};

export default Book;
