import React, { Fragment } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from "./components/page/MainPage";
import SearchPage from "./components/page/SearchPage";
import BookPage from "./components/page/BookPage";

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/book/:id" element={<BookPage />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;