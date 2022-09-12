/////////////
// IMPORTS //
/////////////

import { useState } from 'react';

///////////////////
// POST FUNCTION //
///////////////////

const Post = (props) => {
    const commentsArray = props.drink.comments.split(', ');

    const [drink, setDrink] = useState({...props.drink})
    const [newComment, setNewComment] = useState("");

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    }

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        setDrink({...drink, ["comments"]: props.drink.comments + ', ' + newComment});
        console.log(drink);
        props.handleUpdateComment(drink);
        // setNewComment('');
    }

    return (
        <div className='post-container'>
            <img className='post-image' src={props.drink.image} />
            <div className='post-info-container'>
                <div className='likes-container'>
                    <button>Like</button>
                    <p>{props.drink.likes} Likes</p>
                </div>
                <h3>{props.drink.name}</h3>
                <h4>Ingredients</h4>
                <p>{props.drink.ingredients}</p>
                <h4>Comments</h4>
                {
                    commentsArray.map((comment) => {
                        return (
                            <p>{comment}</p>
                        )
                    })
                }
                <form onSubmit={handleCommentSubmit}>
                    <input type="text" onChange={handleCommentChange} name="comments" placeholder='Type comment here...' />
                    <input className='submit-button' value='Add Comment' type="submit"/>
                </form>
            </div>
        </div>
    )
}

/////////////
// EXPORTS //
/////////////

export default Post;