/////////////
// IMPORTS //
/////////////

import { useState } from 'react';
import Edit from './Edit'

///////////////////
// POST FUNCTION //
///////////////////

const Post = (props) => {
    const commentsArray = props.drink.comments.split(', ');

    const [likeColor, setLikeColor] = useState(" gray ");

    const [display, setDisplay] = useState("post")


    const handleEditDisplay = () => {
        (display == "post") ? setDisplay("edit") : setDisplay("post")
    }

    const handleLikeToggle = () => {
        if (likeColor === " red ") {
            setLikeColor(" gray ");
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
    }


    return (
        <div className='post-container'>
            
            {display === "post" ?
            <>
            <svg className='edit-menu' onClick={handleEditDisplay}
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z"
                fill="currentColor"
            />
            <path
                d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                fill="currentColor"
            />
            <path
                d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z"
                fill="currentColor"
            />
            </svg>
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
                            fillRule="evenodd"
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
                            <p key={i}>{comment}</p>
                        )
                    })
                }
                <form onSubmit={handleCommentSubmit}>
                    <input type="text" defaultValue={""} name="comment" placeholder='Type comment here...' />
                    <input className='submit-button' value='Add Comment' type="submit"/>
                </form>
            </div>
            </>
            : display === "edit" ?
            <>
            <svg className='close-edit' onClick={handleEditDisplay} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="black" /></svg>
            <Edit drink={props.drink} handleUpdate={props.handleUpdate} display={display} setDisplay={setDisplay} handleEditDisplay={handleEditDisplay}/>
            </>
            :null
            }
        </div>
    )
}

/////////////
// EXPORTS //
/////////////

export default Post;