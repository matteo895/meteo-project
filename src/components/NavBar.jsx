// NavBar.jsx
import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap"; // Importiamo i componenti necessari da React Bootstrap

const NavBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    onSearch(city);
  };

  return (
    <Container>
      <Row>
        <Navbar bg="primary" fixed="top" className="w-100 px-5">
          <Col>
            <Navbar.Brand
              href="#home"
              className="text-white fs-1 font-weight-bold"
            >
              METEO
            </Navbar.Brand>
            <Nav className="mr-auto">
              {/* Aggiungi qui l'icona del meteo, se necessario */}
            </Nav>
          </Col>
          <Col className="d-flex justify-content-end">
            <Form inline onSubmit={handleSearch} className="d-flex">
              <FormControl type="text" placeholder="Cerca città" name="city" />
              <Button variant="primary" type="submit">
                Cerca
              </Button>
            </Form>
          </Col>
        </Navbar>
      </Row>
    </Container>
  );
};

export default NavBar;
