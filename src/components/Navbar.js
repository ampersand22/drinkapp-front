import React from 'react'
import '../App.css'


const Navbar = () => {
  return (
    <div className='navbar'>
        <p id='logo'>Logo</p>
        <ul>
            <li><a className="gg-home" href='#'></a></li>
            <li><a href='#'></a></li>
            <li><a className="gg-add-r" href='#'></a></li>
        </ul>

    </div>
  )
}

export default Navbar