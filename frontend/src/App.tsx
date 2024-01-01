import React, { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Movies } from './pages/Movies';
import { Actors } from './pages/Actors';
import NavbarComponent from './components/NavbarComponent';
import AddEditMovieDialog from './components/AddEditMovieDialog';
import AddEditActorDialog from './components/AddEditActorDialog';
import AddEditGenreDialog from './components/AddEditGenreDialog';

function App() {

  const [showMovieForm, setShowMovieForm] = useState<boolean>(false);
  const [showActorForm, setShowActorForm] = useState<boolean>(false);
  const [showGenreForm, setShowGenreForm] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <div className="App vh-100 ">
        <NavbarComponent
          onAddMovieClicked={() => { setShowMovieForm(true) }}
          onAddActorClicked={() => { setShowActorForm(true) }}
          onAddGenderClicked={() => { setShowGenreForm(true) }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/actors" element={<Actors />} />
        </Routes>

        {
          showMovieForm && (
            <AddEditMovieDialog
              onDismiss={() => setShowMovieForm(false)}
              onSuccess={(movie) => {
                setShowMovieForm(false);
              }}
            />
          )
        }
        {
          showActorForm && (
            <AddEditActorDialog
              onDismiss={() => setShowActorForm(false)}
              onSuccess={(actor) => {
                setShowActorForm(false);
              }}
            />
          )
        }
        {
          showGenreForm && (
            <AddEditGenreDialog
              onDismiss={() => setShowGenreForm(false)}
              onSuccess={() => {
                setShowGenreForm(false);
              }}
            />
          )
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
