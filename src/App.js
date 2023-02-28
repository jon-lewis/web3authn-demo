import { useEffect, useState } from "react";
import "./App.css";
import { createKey, getKeys } from "@near-js/biometric-ed25519";
import { parse } from "query-string";

function App() {
  const [createdKey, setCreatedKey] = useState(null);
  const [retrievedKeys, setretrievedKeys] = useState([]);
  const [correctKey, setCorrectKey] = useState([]);

  const searchParams = parse(window.location.search);
  const redirectUrl = searchParams.success_url;
  const accessKey = searchParams.public_key;

  const onCreateKey = async (name) => {
    const key = await createKey(name);
    const publicKey = key.getPublicKey().toString();
    setCreatedKey(publicKey);

    //await createAccount(name, key).then(() => {
    console.log(`Account ${name} Created`);
    console.log("redirecting to", redirectUrl);
    // Build a url to redirect to with the public key set
    const url = new URL(redirectUrl);
    url.searchParams.set("public_key", accessKey);
    url.searchParams.set("all_keys", publicKey);
    url.searchParams.set("account_id", name);

    // Redirect to the url
    window.location.href = url.toString();
    //});
  };

  const onGetKey = async (name) => {
    const keys = await getKeys(name);
    const publicKeys = keys.map((key) => key.getPublicKey().toString());
    // setretrievedKeys(publicKeys);
    // const correctPublicKey = await getCorrectAccessKey(name, keys[0], keys[1]);
    // setCorrectKey(correctPublicKey?.getPublicKey().toString());
    const publicKey = publicKeys[0];
    const url = new URL(redirectUrl);
    url.searchParams.set("public_key", accessKey);
    url.searchParams.set("all_keys", publicKey);
    url.searchParams.set("account_id", name);

    // Redirect to the url
    window.location.href = url.toString();
  };

  const [name, setName] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={() => onCreateKey(name)}>Register</button>
          <button onClick={() => onGetKey(name)}>Login</button>
        </p>
      </header>
    </div>
  );
}

export default App;
