import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

function Shelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book, key) => (
            <Book updateBook={props.updateBook} book={book} myKey={key} key={key} />
          ))}
        </ol>
      </div>
    </div>
  );
}
Book.propTypes = {
  book: PropTypes.object,
};

export default Shelf;
