import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';

import Card from 'react-bootstrap/Card';

function Header() {
  return (
    <Card>

      <Card.Body className="bg-light" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Logo de la pharmacie" className="header__logo" style={{ width: '100px', height: '100px' }} />
        <div style={{ flex: '1', textAlign: 'center', marginLeft: '10px' }}>
          <Card.Title className="text-dark" style={{ fontSize: '2rem' }}>PharmaLOCATIONS</Card.Title>
          <Card.Text className="text-center text-dark">Votre santé, Notre priorité.</Card.Text>
        </div>
      </Card.Body>



      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#accueil">Accueil</Nav.Link>
              <NavDropdown title="A propos" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#services">Nos services</NavDropdown.Item>
                <NavDropdown.Item href="#conseils">Nos conseils</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <Nav.Link href="#contacts">Contacts</Nav.Link>
              <Nav.Link href="#" disabled></Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Rechercher"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Card>
  );
}

export default Header;





























