import React, {useState} from 'react';
import Add from './Add';
import '../App.css';
import SearchBar from './UpdatedSearchBar';
import Login from './Login'

const Navbar = (props) => {
  const [showLogin, setShowLogin] = useState(false)

  const toggleShowLogin = (event) => {
    setShowLogin(!showLogin)
  }
  const handleLogout = () => { 
    props.setCurrentUser({})
    alert('You have logged out.')
   }

  

  return (
    <div className='navbar'>
        <div className='logo'>
        <img src='/wastd-logo.png' height='40'/>
        </div>
        <div>
          <SearchBar onSearchChange={props.onSearchChange} />
        </div>
        <div className='icons'>
        {props.currentUser.email ?
            <div className='login-parent'>
              <p className="login">Logged in as <span style={{ color: 'blue' }}> {props.currentUser.email} </span></p>
              <button className="login" onClick={handleLogout}>Logout</button>
              </div>
                :
                <p className="login" onClick={toggleShowLogin} style={{ cursor: 'pointer'}}>
          Login</p>
            }
          {showLogin ? <Login toggleShowLogin={toggleShowLogin} showLogin={showLogin} currentUser={props.currentUser} setCurrentUser={props.setCurrentUser} /> : null }
        <a href='/'>
            <svg className='icon-color' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21 8.77217L14.0208 1.79299C12.8492 0.621414 10.9497 0.621413 9.77817 1.79299L3 8.57116V23.0858H10V17.0858C10 15.9812 10.8954 15.0858 12 15.0858C13.1046 15.0858 14 15.9812 14 17.0858V23.0858H21V8.77217ZM11.1924 3.2072L5 9.39959V21.0858H8V17.0858C8 14.8767 9.79086 13.0858 12 13.0858C14.2091 13.0858 16 14.8767 16 17.0858V21.0858H19V9.6006L12.6066 3.2072C12.2161 2.81668 11.5829 2.81668 11.1924 3.2072Z" fill="currentColor" />
            </svg>
        </a>
        <Add handleCreate={props.handleCreate} currentUser={props.currentUser} />
        </div>
    </div>
  )
}

export default Navbar