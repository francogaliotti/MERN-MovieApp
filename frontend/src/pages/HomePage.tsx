import { Col, Container, Row } from 'react-bootstrap';
import { DefaultCard } from '../components/DefaultCard';

const HomePage = () => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <DefaultCard title="Movies" url="movies" img="uploads/images/sections/movie.jpg" />
                </Col>
                <Col md={4}>
                    <DefaultCard title="Actors" url="actors" img="uploads/images/sections/actor.jpg" />
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage