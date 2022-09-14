import React, { useState } from 'react'
import '../App.css'
const Edit = (props) => {
    const [drink, setDrink] = useState({...props.drink})
    const [editAlert, setEditAlert] = useState(false)

    // spread is used to change state without reload
    const handleChange = (event) => {
        setDrink({ ...drink, [event.target.name]: event.target.value })
    }

    //Function for Dropdown Menu on Post
    const dropdownFunction = () => {
        document.getElementById(`dropdown${props.drink.id}`).classList.toggle('show');      
    }
    //Closes Dropdown Menu when user clicks outside of menu
    window.onclick = function(event) {
        if (!event.target.matches('.clickable-svg')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }

    const openEditAlert = () => {
        setEditAlert(!editAlert)
    }
    const closeEditAlert = () => {
        setEditAlert(!editAlert)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleUpdate(drink)
        setEditAlert(false)
    }
    
    // function preventScroll(e){
    //     e.preventDefault();
    //     e.stopPropagation();

    //     return false;
    // }
    // const disable = (e) => {
    //     document.querySelector('.App').addEventListener('wheel', preventScroll);
    // }
  
    // const enable = (e) =>{
    //     document.querySelector('.App').removeEventListener('wheel', preventScroll);
    // }
    // const disablePrevent = () => {
    //     document.querySelector('#prevent').addEventListener('click', disable);
    // }
    // const enablePrevent = () => {
    //     document.querySelector('#allow').addEventListener('click', enable);
    // }
    
  return (
    <>
        <div className='dropdown-div'>
                <svg
                onClick={dropdownFunction}
                className='clickable-svg'
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fillRule="evenodd"
                    clipRule="nonzero"
                    d="M5 15C6.65685 15 8 13.6569 8 12C8 10.3431 6.65685 9 5 9C3.34315 9 2 10.3431 2 12C2 13.6569 3.34315 15 5 15ZM5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                    fill=" gray "
                />
                <path
                    fillRule="evenodd"
                    clipRule="nonzero"
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                    fill=" gray "
                />
                <path
                    fillRule="evenodd"
                    clipRule="nonzero"
                    d="M22 12C22 13.6569 20.6569 15 19 15C17.3431 15 16 13.6569 16 12C16 10.3431 17.3431 9 19 9C20.6569 9 22 10.3431 22 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z"
                    fill=" gray "
                />
                </svg>
                <div id={'dropdown'+ props.drink.id} className='dropdown-content'>
                    <p onClick={openEditAlert}>Edit</p>
                    <p onClick={() => {props.handleDelete(props.drink)}}>Delete</p>
                </div>
        </div>
        
        {editAlert ?
                <div className='edit-overlay'>
                <div className='edit-form-container'>
                    <div className='add-form-header'>
                        <h3>Edit Drink Post</h3>
                        <button onClick={closeEditAlert} className='close-add-button'>
                            <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.3956 7.75734C16.7862 8.14786 16.7862 8.78103 16.3956 9.17155L13.4142 12.153L16.0896 14.8284C16.4802 15.2189 16.4802 15.8521 16.0896 16.2426C15.6991 16.6331 15.0659 16.6331 14.6754 16.2426L12 13.5672L9.32458 16.2426C8.93405 16.6331 8.30089 16.6331 7.91036 16.2426C7.51984 15.8521 7.51984 15.2189 7.91036 14.8284L10.5858 12.153L7.60436 9.17155C7.21383 8.78103 7.21383 8.14786 7.60436 7.75734C7.99488 7.36681 8.62805 7.36681 9.01857 7.75734L12 10.7388L14.9814 7.75734C15.372 7.36681 16.0051 7.36681 16.3956 7.75734Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </div>    
                        <form className='add-form' onSubmit={handleSubmit}>
                            <label htmlFor="name">Name: </label>
                            <input className='add-input' type="text" name="name" value={drink.name} onChange={handleChange}/>
                            <br />
                            <label htmlFor="image">Image URL: </label>
                            <input className='add-input' type="text" name="image" value={drink.image} onChange={handleChange}/>
                            <br />
                            <label htmlFor="ingredients">Ingredients: </label>
                            <input className='add-input' type="text" name="ingredients" value={drink.ingredients} onChange={handleChange}/>
                            <br />
                            <label htmlFor="location">Location: </label>
                            <input className='add-input' type="text" name="location" value={drink.location} onChange={handleChange}/>
                            <br />
                            <label htmlFor="tags">Tags: </label>
                            <input className='add-input' type="text" name="tags" value={drink.tags} onChange={handleChange}/>
                            <br />
                        <input  className='add-submit-button' type="submit" />
                        </form>
                </div>
                </div>
            :
                null}
    </>
  )
}
export default Edit
