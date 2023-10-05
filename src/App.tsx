import SongList from './components/SongList/SongList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-4xl font-bold text-center py-10">iTunes top 50</h1>
      </header>
      <div className="px-5">
        <SongList />
      </div>
    </div>
  );
}

export default App;
