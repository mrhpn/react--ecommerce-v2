import React, { Component } from 'react';
import Home from './pages/home';
import './App.css';
import NavBar from './components/navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Home />
      </div>
    );
  }
}

export default App;
