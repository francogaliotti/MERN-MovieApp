import React, { useEffect, useState } from 'react'
import { Actor } from '../models/actor';
import { getActors } from '../network/movie_api';
import { Col, Container, Row } from 'react-bootstrap';
import { DefaultCard } from '../components/DefaultCard';

export const Actors = () => {
    const [actors, setActors] = useState<Actor[]>([]);
    useEffect(() => {
        const fetchActors = async () => {
            const res = await getActors();
            setActors(res);
            console.log(res);
        }
        fetchActors();
    }, []);
  return (
    <Container>
            <Row>
                {actors.map((actor) => (
                    <Col md={3}>
                        <DefaultCard title={actor.name + " " + actor.lastname} img={actor.image} />
                    </Col>
                )
                )}
            </Row>

        </Container>
  )
}
