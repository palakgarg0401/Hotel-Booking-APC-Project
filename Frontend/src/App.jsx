import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import AddRoom from './components/room/AddRoom'
import ExistingRooms from './components/room/ExistingRooms';
function App(){
  return (
    <div className='container mt-5 mb-5'>
    <AddRoom/>
    <ExistingRooms />
    </ div>
  )
}

export default App
