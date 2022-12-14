/////////////
// IMPORTS //
/////////////

import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";


////////////////
// COMPONENTS //
////////////////

import Post from './components/Post';
import Navbar from './components/Navbar'
import Edit from './components/Edit'
import Add from './components/Add';
import Login from './components/Login'

//////////////////npm
// APP FUNCTION //
//////////////////

const App = () => {

  ////////////
  // STATES //
  ////////////

  const [drinks, setDrinks] = useState([]);
  const [currentUser, setCurrentUser] = useState({})

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
  const handleCreate = (newDrink) => {
    axios.post('http://localhost:8000/api/drinks', newDrink)
    .then((response) => {
      setDrinks([...drinks, response.data])
    });
  };

  // PUT Request and Update Drinks Comment State
  const handleUpdateComment = (editDrink) => {
    axios.put('http://localhost:8000/api/drinks/' + editDrink.id, editDrink)
    .then((response)=> {
      setDrinks(drinks.map((drink) => {
        return drink.id !== editDrink.id ? drink : editDrink
      }))
    })
  }

  //PUT Request and Update Drinks State
  const handleUpdate = (editDrink) => {
    axios.put('http://localhost:8000/api/drinks/' + editDrink.id, editDrink)
    .then((response) => {
      setDrinks(drinks.map((drink) => {
        return drink.id !== editDrink.id ? drink : editDrink
      }))
    })
  }

  //DELETE Request and Update Drinks State
  const handleDelete = (deletedDrink) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete ${deletedDrink.name}?`,
      buttons:[{
        label: 'Yes',
        onClick:() =>{
          axios
      .delete('http://localhost:8000/api/drinks/' + deletedDrink.id)
      .then((response) => {
        setDrinks(drinks.filter(drinks => drinks.id !== deletedDrink.id))
      })}
      },
      {
        label: 'No',
        onClick: () => {}
      }
    ]
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
      <Navbar handleCreate={handleCreate} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className='posts-container'>
        {
          drinks.map((drink) => {
            return (
              <Post drink={drink} handleUpdateComment={handleUpdateComment} handleUpdate={handleUpdate} handleDelete={handleDelete} key={drink.id} currentUser={currentUser} setCurrentUser={setCurrentUser} />
            )
          })
        }
      </div>

    </div>
  );
}

export default App;