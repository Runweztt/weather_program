import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Weather from './Components/Weather'


const App = () => {
 


  return (
    <div className='app'>
      <Navbar/>
      <Weather/>
    </div>
  )
}

export default App