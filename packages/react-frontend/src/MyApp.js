// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

//useEffect hook is a way to run code on every render
//The useEffect hook is a fundamental part of React, a popular JavaScript library for building user interfaces. Its primary purpose is to allow you to perform side effects in functional components. Side effects are actions that happen outside the normal flow of your application, such as data fetching, DOM manipulation, and setting up event listeners
function MyApp() {
  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          // If the response status is 201, add the person to the characters state.
          setCharacters([...characters, person]);
        } else {
          // Handle other status codes if needed.
          console.log("Failed to add user. Status code: " + response.status);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
  

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

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
