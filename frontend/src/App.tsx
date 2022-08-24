import './App.css';
import Filter from './components/filter';
import Header from './components/header';

function App() {
  return (
    <>
      <Header />
      <main className="main-container">
        <Filter />
      </main>
    </>
  );
}

export default App;
