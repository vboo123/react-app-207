// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

//useEffect hook is a way to run code on every render

function MyApp() {

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
}

useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
}, [] );
//We indicated that our useEffect hook should be called only when the MyApp component first mounts by passing an empty array []
//the empty array indiciates that we want to trigger this if the state is emptys
  //useState returns a pair
  //current state value
  //a function that lets you update it
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
