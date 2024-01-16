import React from 'react'
import "./Navbar.css"
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    
      <div className="navbar">
        <div className="navbar-container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/Home">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/Favourite">Favourite</Link>
            </li>
            <li className="nav-item">
              <Link to="/Saved">Saved</Link>
            </li>
            <li className="nav-item">
              <Link to="/Login">Logout</Link>
            </li>
            <li className="nav-item-search">
              <input type="text" placeholder="Serach Here" />
              <FaSearch />
            </li>
          </ul>
        </div>
       
      </div>
    </>
  )
}

export default Navbar
