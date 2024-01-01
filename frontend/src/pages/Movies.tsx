import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { DefaultCard } from '../components/DefaultCard';
import { MovieModal } from '../components/MovieModal';
import { Movie } from '../models/movie';
import { getGenders, getMovies } from '../network/movie_api';
import { Genre } from '../models/genre';

export const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genders, setGenders] = useState<Genre[]>([]);
    const [movieSelected, setMovieSelected] = useState<Movie | null>(null);
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
                    <MovieModal onDismiss={() => setMovieSelected(null)} movie={movieSelected} genderName={(genders.find(gender => gender._id === movieSelected?.genderId)?.name)} />
                )
            }
        </Container>
    )
}
