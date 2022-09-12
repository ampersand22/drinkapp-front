/////////////
// IMPORTS //
/////////////

import { useState } from 'react';

///////////////////
// POST FUNCTION //
///////////////////

const Post = (props) => {
    // Variable Declaration
    let commentsArray = props.drink.comments.split(', ');

    // States Declaration
    const [likeColor, setLikeColor] = useState(" gray ");
    const [likeFill, setLikeFill] = useState("evenodd");
    const [newComment, setNewComment] = useState('');

    // Function to Handle Toggling Like Button
    const handleLikeToggle = () => {
        if (likeColor === " red ") {
            setLikeColor(" gray ");
            setLikeFill("evenodd");
            const newDrink = {
                id: props.drink.id,
                name: props.drink.name,
                image: props.drink.image,
                ingredients: props.drink.ingredients,
                comments: props.drink.comments,
                likes: props.drink.likes -= 1,
                location: props.drink.location,
                tags: props.drink.tags
            }
            props.handleUpdateComment(newDrink);
        } else {
            setLikeColor(" red ");
            setLikeFill("nonzero");
            const newDrink = {
                id: props.drink.id,
                name: props.drink.name,
                image: props.drink.image,
                ingredients: props.drink.ingredients,
                comments: props.drink.comments,
                likes: props.drink.likes += 1,
                location: props.drink.location,
                tags: props.drink.tags
            }
            props.handleUpdateComment(newDrink);
        }
    }

    // Function to Handle Comment Change
    const handleNewComment = (event) => {
        setNewComment(event.target.value);
    }

    // Function to Handle Submitting Comment
    const handleCommentSubmit = (event) => {
        event.preventDefault();
        const newDrink = {
            id: props.drink.id,
            name: props.drink.name,
            image: props.drink.image,
            ingredients: props.drink.ingredients,
            comments: props.drink.comments + ', ' + event.target.comment.value,
            likes: props.drink.likes,
            location: props.drink.location,
            tags: props.drink.tags
        }
        props.handleUpdateComment(newDrink);
        setNewComment('');
    }

    // Function to Handle Deleting Comment
    const handleCommentDelete = (event) => {
        commentsArray.splice(commentsArray.indexOf(event.target.value), 1);
        const newDrink = {
            id: props.drink.id,
            name: props.drink.name,
            image: props.drink.image,
            ingredients: props.drink.ingredients,
            comments: commentsArray.join(', '),
            likes: props.drink.likes,
            location: props.drink.location,
            tags: props.drink.tags
        }
        props.handleUpdateComment(newDrink);
    }

    // Return HTML Elements
    return (
        <div className='post-container'>
            <img className='post-image' src={props.drink.image} />
            <div className='post-info-container'>
                <div className='likes-container'>
                    <svg
                        className='like-button'
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="rgb(0,0,0)"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleLikeToggle}
                    >
                        <path
                            fillRule={likeFill}
                            clipRule="evenodd"
                            d="M12.0122 5.57169L10.9252 4.48469C8.77734 2.33681 5.29493 2.33681 3.14705 4.48469C0.999162 6.63258 0.999162 10.115 3.14705 12.2629L11.9859 21.1017L11.9877 21.0999L12.014 21.1262L20.8528 12.2874C23.0007 10.1395 23.0007 6.65711 20.8528 4.50923C18.705 2.36134 15.2226 2.36134 13.0747 4.50923L12.0122 5.57169ZM11.9877 18.2715L16.9239 13.3352L18.3747 11.9342L18.3762 11.9356L19.4386 10.8732C20.8055 9.50635 20.8055 7.29028 19.4386 5.92344C18.0718 4.55661 15.8557 4.55661 14.4889 5.92344L12.0133 8.39904L12.006 8.3918L12.005 8.39287L9.51101 5.89891C8.14417 4.53207 5.92809 4.53207 4.56126 5.89891C3.19442 7.26574 3.19442 9.48182 4.56126 10.8487L7.10068 13.3881L7.10248 13.3863L11.9877 18.2715Z"
                            fill={likeColor}
                        />
                    </svg>
                    <p>{props.drink.likes} Likes</p>
                </div>
                <h3>{props.drink.name}</h3>
                <h4>Ingredients</h4>
                <p>{props.drink.ingredients}</p>
                <h4>Comments</h4>
                {
                    commentsArray.map((comment, i) => {
                        return (
                            <div className='comment-container' key={i}>
                                <p>{comment}</p>
                                <button value={comment} onClick={handleCommentDelete}>X</button>
                            </div>
                            
                        )
                    })
                }
                <form onSubmit={handleCommentSubmit}>
                    <input type="text" value={newComment} onChange={handleNewComment} name="comment" placeholder='Type comment here...' />
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