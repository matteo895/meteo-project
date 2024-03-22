// Importa React e i componenti necessari da react-bootstrap
import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

// Definizione del componente NavBar, accetta una funzione onSearch come props
const NavBar = ({ onSearch }) => {
  // Gestisce la ricerca quando viene inviato il modulo
  const handleSearch = (e) => {
    e.preventDefault(); // Impedisce il comportamento predefinito del modulo
    const city = e.target.elements.city.value; // Ottiene il valore del campo di input "city"
    onSearch(city); // Richiama la funzione onSearch con il valore della città come argomento
  };

  // Ritorna il layout del NavBar
  return (
    <Navbar bg="primary" fixed="top" expand="md" className="px-5">
      <Container fluid>
        {/* Brand della Navbar */}
        <Navbar.Brand href="#home" className="text-white fs-1 font-weight-bold">
          METEO
        </Navbar.Brand>
        {/* Sezione di navigazione */}
        <Nav>
          {/* Form per la ricerca */}
          <Form inline onSubmit={handleSearch} className="d-flex">
            {/* Campo di input per la città */}
            <FormControl
              type="text"
              placeholder="Cerca città"
              name="city"
              className="mr-sm-2"
            />
            {/* Pulsante di invio per la ricerca */}
            <Button variant="primary" type="submit">
              Cerca
            </Button>
          </Form>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar; // Esporta il componente NavBar come default
