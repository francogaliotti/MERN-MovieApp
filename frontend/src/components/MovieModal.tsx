import Modal from 'react-bootstrap/Modal';
import { Movie } from '../models/movie';
import styles from "../styles/Modal.module.css";
import { formatDate } from '../utils/formatDate';
import { useEffect, useState } from 'react';
import { getActorsByMovie } from '../network/movie_api';
import { Actor } from '../models/actor';
import { DefaultCard } from './DefaultCard';
import CarouselComponent from './CarouselComponent';
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { Button } from 'react-bootstrap';

interface Props {
  onDismiss: () => void;
  movie: Movie;
  genderName?: string;
}

export const MovieModal = ({ onDismiss, movie, genderName }: Props) => {
  const [movieActors, setMovieActors] = useState<Actor[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
      const res = await getActorsByMovie(movie._id);
      setMovieActors(res);
      console.log(res);
    }
    fetchActors();
  }, [])

  return (
    <Modal className={`${styles.modalContent}`} size='xl' show onHide={onDismiss} >


      <Modal.Header className={`${styles.modalHeader}`} closeButton>
        <img src={movie.image ? process.env.REACT_APP_IMG_ENPOINT + movie.image : ""} alt="" />
        <div className={`${styles.modalDescription}`}>
          <h3>
            {movie.title}{' '}
            <Button variant="outline-secondary border-0"><FaPlus /></Button>{' '}
            <Button variant="outline-secondary border-0"><FaTrash /></Button>{' '}
            <Button variant="outline-secondary border-0"><FaPencilAlt /></Button>{' '}
          </h3>
          <p>Release Date: {formatDate(movie.release_date)}</p>
          <p>Genre: {genderName}</p>
          <p>{movie.description}</p>
          {movieActors.length < 4 ?
            <div className={`${styles.movieActors}`}>
              {movieActors.map((actor) => (
                <DefaultCard title={actor.name + " " + actor.lastname} img={actor.image} />
              ))}
            </div> :
            <CarouselComponent objects={movieActors} />
          }
        </div>
      </Modal.Header>
    </Modal>
  )
}
