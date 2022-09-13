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
import SearchBar from './components/SearchBar';

//////////////////
// APP FUNCTION //
//////////////////

function App() {

  ////////////
  // STATES //
  ////////////

  const [drinks, setDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([])
  const [isSearching, setIsSearching] = useState(false);

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

  const onSearchChange = (searchInput) => {
    console.log("butternut:", searchInput);
    if(searchInput.length > 0) {
      setIsSearching(true)
      const result = drinks.filter((drink)=> {
        return drink.name.toLowerCase().match(searchInput) || drink.ingredients.toLowerCase().match(searchInput) || drink.tags.toLowerCase().match(searchInput)
      })
      setFilteredDrinks(result);
    } else {
      setIsSearching(false)
    }
  }

  ////////////////
  // USE EFFECT //
  ////////////////

  useEffect(() => {
    getDrinks();
  }, []);

  const NoSearchResults = () => 
  {
    return(
      <><p className="noResults">No Drinks to Display</p></>
    )
  }

  const drinksToDisplay = isSearching ? filteredDrinks : drinks
  return (
    <div className="App">
      
      <h1>Drinks</h1>
      <SearchBar onSearchChange={onSearchChange} />
      <div className='posts-container'>
        {
          drinksToDisplay.length > 0 ?
          drinksToDisplay.map((drink) => {
            return (
              <>
              <Post drink={drink} handleUpdateComment={handleUpdateComment} key={drink.id} />
              </>
            )
          }) : <NoSearchResults/>
        }
      </div>

    </div>
  );
}

export default App;
