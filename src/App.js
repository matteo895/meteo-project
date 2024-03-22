import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "./components/NavBar.jsx";
import Central from "./components/Central.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [city, setCity] = useState("Foggia"); // Stato per memorizzare il valore della città

  // Funzione per gestire la ricerca della città
  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <Container className="App">
      <Row>
        <Col xs={12}>
          <NavBar onSearch={handleSearch} />{" "}
          {/* Passa la funzione di ricerca alla NavBar */}
        </Col>
        <Col xs={12}>
          <Central city={city} />{" "}
          {/* Passa il valore della città al componente Central */}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
