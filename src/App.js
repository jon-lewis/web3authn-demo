import { useState } from 'react';
import './App.css';
import { createKey, getKeys } from "@near-js/biometric-ed25519";
import { createAccount, getCorrectAccessKey } from "./utils";

function App() {
  const [createdKey, setCreatedKey] = useState(null);
  const [retrievedKeys, setretrievedKeys] = useState([]);
  const [correctKey, setCorrectKey] = useState([]);

  const onCreateKey = async (name) => {
    // TODO: should include logic for checking if the user name is already taken
    const key = await createKey(name);
    const publicKey = key.getPublicKey().toString();
    setCreatedKey(publicKey);

    await createAccount(name, key).then(() => {
      console.log(`Account ${name} Created`);
    });
  };

  const onGetKey = async (name) => {
    const keys = await getKeys(name);
    const publicKeys = keys.map((key) => key.getPublicKey().toString());
    setretrievedKeys(publicKeys);
    const correctPublicKey =  await getCorrectAccessKey(name, keys[0], keys[1]);
    setCorrectKey(correctPublicKey?.getPublicKey().toString());
  };


  const [name, setName] = useState('dannytest31.testnet');

  return (
    <div className="App">
      <header className="App-header">
      <p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={() => onCreateKey(name)}>Register</button>
        <button onClick={() => onGetKey(name)}>Login</button>
      </p>
      <p>
      {`Created Key: ${createdKey}`} <br /><br />
      {`Retrieved Keys: ${retrievedKeys.join(' ')}`} <br /><br />
      {`Correct Key: ${correctKey}`} <br /><br />
      { correctKey === createdKey ? 'Key matched' : 'Key Unmatched' }
      </p>
      </header>
    </div>
  );
}

export default App;
