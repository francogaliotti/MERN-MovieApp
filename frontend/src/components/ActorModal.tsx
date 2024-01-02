import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Actor } from '../models/actor';
import { Movie } from '../models/movie';
import { getMoviesByActor } from '../network/movie_api';
import styles from "../styles/Modal.module.css";
import { formatDate } from '../utils/formatDate';
import CarouselComponent from './CarouselComponent';
import { DefaultCard } from './DefaultCard';
import { Button } from 'react-bootstrap';
import { FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa';

interface Props {
    onDismiss: () => void;
    actor: Actor;
    onDelete: (id: string) => void;
    openEdit: () => void;
    openMultiSelect: () => void;
}

export const ActorModal = ({ onDismiss, actor, onDelete, openEdit, openMultiSelect }: Props) => {
    const [actorMovies, setActorMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await getMoviesByActor(actor._id);
            setActorMovies(res);
            console.log(res);
        }
        fetchMovies();
    }, [])

    return (
        <Modal className={`${styles.modalContent}`} size='xl' show onHide={onDismiss} >
            <Modal.Header className={`${styles.modalHeader}`} closeButton>
                <img src={actor.image ? process.env.REACT_APP_IMG_ENPOINT + actor.image : ""} alt="" />
                <div className={`${styles.modalDescription}`}>
                    <h3>{actor.name} {actor.lastname}{' '}
                        <Button variant="outline-secondary border-0" onClick={openMultiSelect}><FaPlus /></Button>{' '}
                        <Button variant="outline-secondary border-0" onClick={()=>onDelete(actor._id)}><FaTrash /></Button>{' '}
                        <Button variant="outline-secondary border-0" onClick={openEdit}><FaPencilAlt /></Button>{' '}</h3>
                    <p>Birth Date: {formatDate(actor.birth_date)}</p>
                    <p>{actor.biography}</p>
                    {actorMovies.length < 4 ?
                        <div className={`${styles.movieActors}`}>
                            {actorMovies.map((movie) => (
                                <DefaultCard title={movie.title} img={movie.image} />
                            ))}
                        </div> :
                        <CarouselComponent objects={actorMovies} />
                    }
                </div>
            </Modal.Header>
        </Modal>
    )
}
