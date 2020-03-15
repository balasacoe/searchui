import React, { Fragment } from 'react';
import './App.css';
import Search from  './components/search';

function App() {
  return (
    <Fragment >
      <span className="search-title">Search Demo</span>
      <Search />
    </Fragment>
  );
}

export default App;
