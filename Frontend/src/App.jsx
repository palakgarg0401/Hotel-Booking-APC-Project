import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import ExistingRooms from './components/room/ExistingRooms';
import EditRoom from './components/room/EditRoom';
import Home from './components/Home/Home';
import AddRoom from './components/room/AddRoom';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import RoomListing from './components/room/RoomListing';
import Admin from './components/admin/Admin';

function App() {
  return (
    <>
      <main>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/existing-rooms" element={<ExistingRooms />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/browse-all-rooms" element={<RoomListing />} />
          <Route path="/admin" element={<Admin />} />

        </Routes>
        <Footer/>
      </main>
    </>
  );
}

export default App;
