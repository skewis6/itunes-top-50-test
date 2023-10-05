import React from 'react';
import logo from './logo.svg';
import SongList from './components/SongList/SongList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        iTunes top 50
      </header>
      <SongList />
    </div>
  );
}

export default App;
