import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { DefaultCard } from '../components/DefaultCard';
import { MovieModal } from '../components/MovieModal';
import { Movie } from '../models/movie';
import { addActorsToMovie, deleteMovie, getActors, getGenders, getMovies } from '../network/movie_api';
import { Genre } from '../models/genre';
import AddEditMovieDialog from '../components/AddEditMovieDialog';
import MultiSelectModal from '../components/MultiSelectModal';
import { Actor } from '../models/actor';

export const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genders, setGenders] = useState<Genre[]>([]);
    const [movieSelected, setMovieSelected] = useState<Movie | null>(null);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openMultiSelectModal, setOpenMultiSelectModal] = useState<boolean>(false);
    const [actorsForMultiselect, setActorsForMultiselect] = useState<Actor[]>([]);
    useEffect(() => {
        const fetchMovies = async () => {
            const res = await getMovies();
            setMovies(res);
        }
        const fetchGenders = async () => {
            const res = await getGenders();
            setGenders(res);
        }
        fetchMovies();
        fetchGenders();
    }, []);

    useEffect(() => {
        const fetchActors = async () => {
            const res = await getActors();
            setActorsForMultiselect(res);
        }
        if (openMultiSelectModal && actorsForMultiselect.length === 0) {
            fetchActors();
        }
    }, [actorsForMultiselect.length, openMultiSelectModal]);

    const onDelete = async (id: string) => {
        try {
            await deleteMovie(id);
            setMovies(movies.filter(movie => movie._id !== id));
            setMovieSelected(null);
        } catch (error) {
            console.log(error);
        }
    }

    const setActors = async (actorIds: string[]) => {
        try {
            await addActorsToMovie(movieSelected?._id || '', actorIds);
            setMovieSelected(null);
            setOpenMultiSelectModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Row>
                {movies.map((movie) => (
                    <Col md={3} className='mb-3'>
                        <DefaultCard title={movie.title} img={movie.image} clickFunction={() => setMovieSelected(movie)} />
                    </Col>
                )
                )}
            </Row>

            {
                movieSelected && (
                    <MovieModal
                        onDismiss={() => setMovieSelected(null)}
                        movie={movieSelected}
                        genderName={(genders.find(gender => gender._id === movieSelected?.genderId)?.name)}
                        onDelete={onDelete}
                        openEdit={() => setOpenEditModal(true)}
                        openMultiSelect={() => setOpenMultiSelectModal(true)}
                    />
                )
            }
            {
                openEditModal && (
                    <AddEditMovieDialog
                        onDismiss={() => setOpenEditModal(false)}
                        onSuccess={(movie) => {
                            setMovies(movies.map(existingMovie => existingMovie._id === movie._id ? movie : existingMovie));
                            setOpenEditModal(false);
                            setMovieSelected(null);
                        }}
                        movieToEdit={movieSelected || undefined}
                    />
                )
            }
            {
                openMultiSelectModal && (
                    <MultiSelectModal
                        options={actorsForMultiselect.map(actor => ({ value: actor._id, label: actor.name + ' ' + actor.lastname }))}
                        handleSave={(actorIds) => { 
                            setActors(actorIds);
                         }}
                        onDismiss={() => setOpenMultiSelectModal(false)}
                    />
                )
            }
        </Container>
    )
}
