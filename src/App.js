import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MagicGrid from './MagicGrid/MagicGrid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Magic React Grid</h1>
        </header>
        <MagicGrid size={50} />
      </div>
    );
  }
}

export default App;
