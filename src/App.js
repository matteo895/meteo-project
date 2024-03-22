import React, { useState } from "react"; // Importa React e useState
import { Container, Row, Col } from "react-bootstrap"; // Importa componenti da react-bootstrap
import NavBar from "./components/NavBar.jsx"; // Importa il componente NavBar
import Central from "./components/Central.jsx"; // Importa il componente Central
import "bootstrap/dist/css/bootstrap.min.css"; // Importa lo stile di Bootstrap

// Definizione del componente principale App
function App() {
  const [city, setCity] = useState("Foggia"); // Stato per memorizzare il valore della città, inizializzato a "Foggia"

  // Funzione per gestire la ricerca della città
  const handleSearch = (searchCity) => {
    setCity(searchCity); // Imposta il valore della città con quello inserito dall'utente
  };

  // Ritorna il layout dell'applicazione
  return (
    <Container className="App">
      <Row>
        <Col xs={12}>
          {/* Componente NavBar, passa la funzione di ricerca */}
          <NavBar onSearch={handleSearch} />
        </Col>
        <Col xs={12}>
          {/* Componente Central, passa il valore della città */}
          <Central city={city} />
        </Col>
      </Row>
    </Container>
  );
}

export default App; // Esporta il componente App come default
