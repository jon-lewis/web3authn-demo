import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';
import { createKey } from "@near-js/biometric-ed25519";

function App() {
  console.log('createKey', createKey);

  useEffect(() => {
    console.log('calling')
    const getKey = async () => {
      await createKey('helloworld');
    }
    getKey();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
