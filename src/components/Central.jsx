import React, { useState, useEffect } from "react"; // Importa React insieme a useState e useEffect
import { Container, Row, Col, Card, Badge } from "react-bootstrap"; // Importa componenti da react-bootstrap

// Definizione del componente Central
const Central = (props) => {
  // Stati del componente
  const [weatherData, setWeatherData] = useState(null); // Stato per i dati meteorologici
  const [loading, setLoading] = useState(true); // Stato per il caricamento
  const [isCloudy, setIsCloudy] = useState(false); // Stato per nuvoloso
  const [isRainy, setIsRainy] = useState(false); // Stato per piovoso
  const [isSunny, setIsSunny] = useState(false); // Stato per soleggiato

  // Effetto che si attiva all'avvio del componente e ogni 60 secondi
  useEffect(() => {
    // Funzione per recuperare i dati meteorologici
    const fetchWeatherData = () => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=10ce33ccf310ad1616cfecc580676068`
      )
        .then((response) => {
          if (!response.ok) {
            // Se la risposta non è ok, solleva un errore
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parsa la risposta in JSON
        })
        .then((data) => {
          // Dopo aver ricevuto i dati
          setWeatherData(data); // Imposta i dati meteorologici
          setLoading(false); // Imposta il caricamento su false
          const weatherDescription = data.weather[0].description.toLowerCase(); // Descrizione del meteo in minuscolo
          // Determina il tipo di condizioni meteorologiche
          if (
            weatherDescription.includes("clouds") ||
            weatherDescription.includes("mist") ||
            weatherDescription.includes("haze") ||
            weatherDescription.includes("fog")
          ) {
            setIsCloudy(true);
          } else if (
            weatherDescription.includes("rain") ||
            weatherDescription.includes("drizzle") ||
            weatherDescription.includes("thunderstorm")
          ) {
            setIsRainy(true);
          } else if (
            weatherDescription.includes("clear") ||
            weatherDescription.includes("sun") ||
            weatherDescription.includes("sunny")
          ) {
            setIsSunny(true);
          }
        })
        .catch((error) => {
          // Gestione degli errori
          console.error("Error fetching weather data:", error);
        });
    };

    fetchWeatherData(); // Richiama la funzione per recuperare i dati meteorologici

    const intervalId = setInterval(fetchWeatherData, 60 * 1000); // Imposta l'intervallo per aggiornare i dati ogni 60 secondi

    return () => clearInterval(intervalId); // Pulisce l'intervallo prima che il componente venga dismesso
  }, [props.city]); // Dipendenza dell'effetto: cambia solo quando props.city cambia

  // Se il caricamento è in corso, mostra un messaggio di caricamento
  if (loading) {
    return <div>Loading...</div>;
  }

  // Se il caricamento è completato, mostra le informazioni meteorologiche
  return (
    <Container className=" align-items-center d-flex justify-content-center vh-100 mt-5">
      <Card
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderRadius: "9rem",
          padding: "1.5rem 3rem",
        }}
      >
        <Card.Body className="text-white">
          <Card.Title className="text-center" style={{ fontSize: "4rem" }}>
            Meteo in {weatherData.name}
          </Card.Title>
          <Row className="text-center">
            <Col xs={12} className="mt-5 mb-5">
              <p className="mb-1 fs-5">TEMPERATURA</p>
              <h2 style={{ fontSize: "7rem" }}>
                {Math.round(weatherData.main.temp - 273.15)}°C
              </h2>
            </Col>
            <Col xs={12} className="mb-5">
              <p className="mb-1 fs-5">CONDIZIONI</p>
              {isCloudy && <h2 style={{ fontSize: "3rem" }}>Nuvoloso</h2>}
              {isRainy && <h2 style={{ fontSize: "3rem" }}>Piovoso</h2>}
              {isSunny && <h2 style={{ fontSize: "3rem" }}>Soleggiato</h2>}
            </Col>
            <Col xs={12} className="mb-5 ">
              <p className="mb-1 fs-5">DESCRIZIONE</p>
              <h2 style={{ fontSize: "3rem" }}>
                {weatherData.weather[0].description}
              </h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} md={4}>
              <Badge
                variant="info"
                className="fs-4"
                style={{ borderRadius: "10rem", padding: "1rem 2rem" }}
              >
                Humidity: {weatherData.main.humidity}%
              </Badge>
            </Col>
            <Col xs={12} md={4}>
              <Badge
                variant="secondary"
                className="fs-4"
                style={{ borderRadius: "10rem", padding: "1rem 2rem" }}
              >
                Min Temp: {Math.round(weatherData.main.temp_min - 273.15)}°C
              </Badge>
            </Col>
            <Col xs={12} md={4}>
              <Badge
                variant="secondary"
                className="fs-4"
                style={{ borderRadius: "10rem", padding: "1rem 2rem" }}
              >
                Max Temp: {Math.round(weatherData.main.temp_max - 273.15)}°C
              </Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Central; // Esporta il componente Central come default
