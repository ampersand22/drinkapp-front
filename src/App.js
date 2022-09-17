/////////////
// IMPORTS //
/////////////

import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ColorRing } from 'react-loader-spinner';

////////////////
// COMPONENTS //
////////////////

import Post from './components/Post';
import Navbar from './components/Navbar'
import Edit from './components/Edit'
import Add from './components/Add';
import Login from './components/Login'
import Footer from './components/Footer'

const API_URL = process.env.REACT_APP_API_URL

//////////////////
// APP FUNCTION //
//////////////////

const App = () => {

  ////////////
  // STATES //
  ////////////

  const [drinks, setDrinks] = useState([]);
  const [isFetchingDrinks, setIsFetchingDrinks] = useState(false);
  const [filteredDrinks, setFilteredDrinks] = useState([])
  const [isSearching, setIsSearching] = useState(false);

  /////////////////////
  // AXIOS FUNCTIONS //
  /////////////////////

  // GET Request and Update Drinks State
  const getDrinks = () => {
    setIsFetchingDrinks(true);
    axios.get(`${API_URL}/api/drinks`)
      .then(
        (response) => {
          setDrinks(response.data)
          setIsFetchingDrinks(false);
        },
        (error) => console.error(error)
      )
      .catch((error) => {
        console.error(error)
        setIsFetchingDrinks(false);
      })
  };

  // POST Request and Update Drinks State
  const handleCreate = (newDrink) => {
    axios.post(`${API_URL}/api/drinks`, newDrink)
      .then((response) => {
        getDrinks();
      });
  };

  // PUT Request and Update Drinks Comment State
  const handleUpdateComment = (editDrink) => {
    axios.put(`${API_URL}/api/drinks/` + editDrink.id, editDrink)
      .then((response) => {
        setDrinks(drinks.map((drink) => {
          return drink.id !== editDrink.id ? drink : editDrink
        }))
      })
  }

  //PUT Request and Update Drinks State
  const handleUpdate = (editDrink) => {
    axios.put(`${API_URL}/api/drinks/` + editDrink.id, editDrink)
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
      message: `Are you sure you want to delete this post?`,
      buttons: [{
        label: 'Yes',
        onClick: () => {
          axios
            .delete(`${API_URL}/api/drinks/` + deletedDrink.id)
            .then((response) => {
              setDrinks(drinks.filter(drinks => drinks.id !== deletedDrink.id))
            })
        }
      },
      {
        label: 'No',
        onClick: () => { }
      }
      ]
    })
  }

  const onSearchChange = (searchInput) => {
    const searchInputLower = searchInput.toLowerCase()
    if (searchInput.length > 0) {
      setIsSearching(true)
      const result = drinks.filter((drink) => {
        return drink.name.toLowerCase().match(searchInputLower) || drink.ingredients.toLowerCase().match(searchInputLower) || drink.tags.toLowerCase().match(searchInputLower)
      })
      setFilteredDrinks(result);
    } else {
      setIsSearching(false)
    }
  }

  const NoSearchResults = () => {
    return (
      <><p className="noResults">No Drinks to Display</p></>
    )
  }

  const drinksToDisplay = isSearching ? filteredDrinks : drinks


  ////////////////
  // USE EFFECT //
  ////////////////

  useEffect(() => {
    getDrinks();
  }, []);

  return (
    <>
      <Navbar handleCreate={handleCreate} onSearchChange={onSearchChange} />
      <Login />
      <div className='posts-container'>
        {
          isFetchingDrinks ? <div className='spinner'>
            <>
              <ColorRing
                visible={true}
                height='200'
                width='200'
                ariaLabel='blocks-loading'
                wrapperStyle={{}}
                wrapperClass='blocks-wrapper'
                colors={['#c444b9', '#9e2419', '#c444b9', '#9e2419', '#c444b9']} />
            </>
          </div> :
            drinksToDisplay.length > 0 ?
              drinksToDisplay.map((drink) => {
                return (
                  <Post drink={drink} handleUpdateComment={handleUpdateComment} handleUpdate={handleUpdate} handleDelete={handleDelete} key={drink.id} />
                )
              })
              : <NoSearchResults />
        }
      </div>
      <Footer />
    </>
  );
}

export default App;