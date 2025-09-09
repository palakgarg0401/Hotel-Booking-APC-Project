import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import ExistingRooms from './components/room/ExistingRooms';
import EditRoom from './components/room/EditRoom';
import Home from './components/Home/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit-room/:roomId" element={<EditRoom />} />
        <Route path="/existing-rooms" element={<ExistingRooms />} />
      </Routes>
    </main>
  )
}

export default App
