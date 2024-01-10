import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Login from './components/login';
import SignUp from './components/signup';
import Logout from './components/logout';
import Contact from './components/contact';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
