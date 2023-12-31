import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Movies } from './pages/Movies';
import { Actors } from './pages/Actors';

function App() {
  return (
    <BrowserRouter>
      <div className="App vh-100 d-flex align-items-center justify-content-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/actors" element={<Actors />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
