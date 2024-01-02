import React, { useEffect, useState } from 'react'
import { Actor } from '../models/actor';
import { addMoviesToActor, deleteActor, getActors, getMovies } from '../network/movie_api';
import { Col, Container, Row } from 'react-bootstrap';
import { DefaultCard } from '../components/DefaultCard';
import { ActorModal } from '../components/ActorModal';
import AddEditActorDialog from '../components/AddEditActorDialog';
import { Movie } from '../models/movie';
import MultiSelectModal from '../components/MultiSelectModal';

export const Actors = () => {
    const [actorSelected, setActorSelected] = useState<Actor | null>(null); // [1
    const [actors, setActors] = useState<Actor[]>([]);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openMultiSelectModal, setOpenMultiSelectModal] = useState<boolean>(false);
    const [moviesForMultiselect, setMoviesForMultiselect] = useState<Movie[]>([]);
    useEffect(() => {
        const fetchActors = async () => {
            const res = await getActors();
            setActors(res);
            console.log(res);
        }
        fetchActors();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await getMovies();
            setMoviesForMultiselect(res);
        }
        if (openMultiSelectModal && moviesForMultiselect.length === 0) {
            fetchMovies();
        }
    }, [moviesForMultiselect.length, openMultiSelectModal]);

    const onDelete = async (id: string) => {
        try {
            await deleteActor(id);
            setActors(actors.filter(actor => actor._id !== id));
            setActorSelected(null);
        } catch (error) {
            console.log(error);
        }
    }

    const setMovies = async (movieIds: string[]) => {
        try {
            await addMoviesToActor(actorSelected?._id || '', movieIds);
            setActorSelected(null);
            setOpenMultiSelectModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Row>
                {actors.map((actor) => (
                    <Col md={3} className='mb-3'>
                        <DefaultCard title={actor.name + " " + actor.lastname} img={actor.image} clickFunction={() => setActorSelected(actor)} />
                    </Col>
                )
                )}
            </Row>
            {
                actorSelected && (
                    <ActorModal
                        onDismiss={() => setActorSelected(null)}
                        actor={actorSelected}
                        onDelete={onDelete}
                        openEdit = {() => setOpenEditModal(true)}
                        openMultiSelect = {() => setOpenMultiSelectModal(true)}
                    />
                )
            }
            {
                openEditModal && (
                    <AddEditActorDialog
                        onDismiss={() => setOpenEditModal(false)}
                        onSuccess={(actor) => {
                            setActors(actors.map(existingActor => existingActor._id === actor._id ? actor : existingActor));
                            setOpenEditModal(false);
                            setActorSelected(null);
                        }}
                        actorToEdit={actorSelected || undefined}
                    />
                )
            }
            {
                openMultiSelectModal && (
                    <MultiSelectModal
                        options={moviesForMultiselect.map(movie => ({ value: movie._id, label: movie.title }))}
                        handleSave={(movieIds) => { 
                            setMovies(movieIds);
                         }}
                        onDismiss={() => setOpenMultiSelectModal(false)}
                    />
                )
            }

        </Container>
    )
}
