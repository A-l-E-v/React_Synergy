import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from 'react-calendar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Calendar />
        <p>
          Edit <code>src/App.tsx</code> and save to reload it now.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
