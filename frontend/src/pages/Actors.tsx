import React, { useEffect, useState } from 'react'
import { Actor } from '../models/actor';
import { getActors } from '../network/movie_api';
import { Col, Container, Row } from 'react-bootstrap';
import { DefaultCard } from '../components/DefaultCard';
import { ActorModal } from '../components/ActorModal';

export const Actors = () => {
    const [actorSelected, setActorSelected] = useState<Actor | null>(null); // [1
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
                    <Col md={3} className='mb-3'>
                        <DefaultCard title={actor.name + " " + actor.lastname} img={actor.image} clickFunction={()=>setActorSelected(actor)} />
                    </Col>
                )
                )}
            </Row>
            {
                actorSelected && (
                    <ActorModal onDismiss={() => setActorSelected(null)} actor={actorSelected} />
                )
            }

        </Container>
  )
}
