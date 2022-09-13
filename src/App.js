/////////////
// IMPORTS //
/////////////

import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

////////////////
// COMPONENTS //
////////////////

import Post from './components/Post';
import Login from './components/Login'
import Navbar from './components/Navbar'

//////////////////
// APP FUNCTION //
//////////////////

function App() {

  ////////////
  // STATES //
  ////////////

  const [drinks, setDrinks] = useState([]);

  /////////////////////
  // AXIOS FUNCTIONS //
  /////////////////////

  // GET Request and Update Drinks State
  const getDrinks = () => {
    axios.get('http://localhost:8000/api/drinks')
    .then(
      (response) => setDrinks(response.data),
      (error) => console.error(error)
    )
    .catch((error) => console.error(error));
  };

  // POST Request and Update Drinks State
  const handleUpdateComment = (editDrink) => {
    axios.put('http://localhost:8000/api/drinks/' + editDrink.id, editDrink)
    .then((response)=> {
      setDrinks(drinks.map((drink) => {
        return drink.id !== editDrink.id ? drink : editDrink
      }))
    })
  }

  ////////////////
  // USE EFFECT //
  ////////////////

  useEffect(() => {
    getDrinks();
  }, []);

  return (
    <div className="App">
      
      <h1>Drinks</h1>
      <Login />

      <div className='posts-container'>
        {
          drinks.map((drink) => {
            return (
              <Post drink={drink} handleUpdateComment={handleUpdateComment} key={drink.id} />
            )
          })
        }
      </div>

    </div>
  );
}

export default App;