import React, { useState } from 'react'
import '../App.css'
const Edit = (props) => {
    const [drink, setDrink] = useState({...props.drink})
  // spread is used to change state without reload
  const handleChange = (event) => {
    setDrink({ ...drink, [event.target.name]: event.target.value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleUpdate(drink)
  }
  return (
    <>
      <details className='edit-content'>
        <summary className="edit"
            style={{ cursor: "pointer", color: "blue" }}>
                Edit Drink
        </summary>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" value={drink.name} onChange={handleChange}/>
            <br /><br />
            <label htmlFor="image">Age: </label>
            <input type="text" name="image" value={drink.image} onChange={handleChange}/>
            <br /><br />
            <label htmlFor="ingredients">Ingredients: </label>
            <input type="text" name="ingredients" value={drink.ingredients} onChange={handleChange}/>
            <br /><br />
            <label htmlFor="comments">Comments: </label>
            <input type="text" name="comments" value={drink.comments} onChange={handleChange}/>
            <br /><br />
            <label htmlFor="likes">Likes: </label>
            <input type="text" name="likes" value={drink.likes} onChange={handleChange}/>
            <br /><br />
            <label htmlFor="location">location: </label>
            <input type="text" name="location" value={drink.location} onChange={handleChange}/>
            <br /><br />
            <label htmlFor="tags">tags: </label>
            <input type="text" name="tags" value={drink.tags} onChange={handleChange}/>
            <br /><br />
          <input type="submit" />
        </form>
      </details>
    </>
  )
}
export default Edit
