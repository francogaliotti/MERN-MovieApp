import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Props {
    onAddMovieClicked: () => void;
    onAddActorClicked: () => void;
    onAddGenderClicked: () => void;
}

const NavbarComponent = ({ onAddMovieClicked, onAddActorClicked, onAddGenderClicked }: Props) => {
    return (
        <Navbar bg="light" expand="lg" className='mb-5'>
            <Container>
                <Navbar.Brand as={Link} to="/">MovieApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
                        <Nav.Link as={Link} to="/actors">Actors</Nav.Link>
                    </Nav>
                    <Nav className='ms-auto'>
                        <NavDropdown title="Actions" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={onAddMovieClicked}>Add Movie</NavDropdown.Item>
                            <NavDropdown.Item onClick={onAddActorClicked}>Add Actor</NavDropdown.Item>
                            <NavDropdown.Item onClick={onAddGenderClicked}>Add Genre</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
