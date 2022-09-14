/////////////
// IMPORTS //
/////////////

import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import Edit from './Edit'
import '../App.css'

///////////////////
// POST FUNCTION //
///////////////////

const Post = (props) => {
    // Variable Declaration
    let commentsArray = props.drink.comments.split(', ');
    const tagsArray = props.drink.tags.split(', ');
    let tagsString = '';
    let commentsTitle = '';

    // Make Comment Title Variable
    if (commentsArray.length === 1 && commentsArray[0] === 'placeholder') {
        commentsTitle = "View 0 Comments";
    } else {
        commentsTitle = 'View ' + commentsArray.length + ' Comments';
    }

    // Making String for Tags
    if (tagsArray[0] === "placeholder") {
        tagsArray.remove(tagsArray[0]);
    }
    for (let i = 0; i < tagsArray.length; i++) {
        tagsArray[i] = '#' + tagsArray[i];
    }
    tagsString = tagsArray.join('  ');

    // States Declaration
    const [likeColor, setLikeColor] = useState(" gray ");
    const [likeFill, setLikeFill] = useState("evenodd");
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [commentsHeader, setCommentsHeader] = useState(commentsTitle);

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


      
    // Function to Handle Toggling Comment Section
    const handleCommentToggle = (event) => {
        if (showComments) {
            setShowComments(false);
            if (commentsArray[0] === 'placeholder') {
                setCommentsHeader('View ' + (commentsArray.length - 1) + ' Comments');
            } else {
                setCommentsHeader('View ' + commentsArray.length + ' Comments');
            }
        }
        else {
            setShowComments(true);
            setCommentsHeader('Comments');
        }
    }
    
    // Return HTML Elements
    return (
        <div className='post-container'>
            <div className='post-header'>
                <div className='post-location-container'>
                    <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z"
                        fill=" gray "
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z"
                        fill=" gray "
                    />
                    </svg>
                    <h5 className='location-p'>{props.drink.location}</h5>
                </div>
                <Edit drink={props.drink} handleUpdate={props.handleUpdate}/>
            </div>
            <img className='post-image' src={props.drink.image} alt={props.drink.name}/>
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
                <h3 className='post-name'>{props.drink.name}</h3>
                <h4 className='ingredients-title'>Ingredients</h4>
                <p className='ingredients-list'>{props.drink.ingredients}</p>
            <h4 className='comments-title' onClick={handleCommentToggle}>{commentsHeader}</h4>
                {
                    showComments ?
                        <>
                            {commentsArray.map((comment, i) => {
                                return(
                                    (comment === 'placeholder') ?
                                        null
                                    :
                                        <div className='comment-container' key={i}>
                                        <p>{comment}</p>
                                        <button className='delete-comment-button' value={comment} onClick={handleCommentDelete}>
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
                                )
                            })}
                            <form className='add-comment-form' onSubmit={handleCommentSubmit}>
                                <input type="text" value={newComment} onChange={handleNewComment} name="comment" placeholder='Type comment here...' />
                                <button className='submit-comment-button' value='Add Comment' type="submit">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z"
                                            fill="white"
                                        />
                                    </svg>
                                </button>
                            </form>
                        </>
                    :
                        null
                }
            </div>
            <div className='divider-line'></div>
            <div className='tags-container'>
                <p>{tagsString}</p>
            </div>
        </div>
    )
}

/////////////
// EXPORTS //
/////////////

export default Post;