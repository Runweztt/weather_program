
import React from 'react'
import  './Navbar.css'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useRef } from 'react'



function Navbar() {
    const navRef= useRef();
     
    const showNavbar =()=>{
        navRef.current.classList.toggle("responsive_nav")

    }


  return (
   <header   >
      <h2>Weather update</h2>
      <nav ref={navRef}>
        <a href='/#'> Home</a>
        <a href='/#'> About</a>
        <a href='/#'> Service</a>
        <a href='/#'> Product</a>
        <a href='/#'> Blog</a>

        <button className='nav-btn nav-close-btn' onClick={showNavbar}>
           <FaTimes/>
        </button>
      </nav>

      <button className='nav-btn ' onClick={showNavbar}>
        <FaBars/>

      </button>
   </header>
  )
}

export default Navbar