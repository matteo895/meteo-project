import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

const Central = (props) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCloudy, setIsCloudy] = useState(false);
  const [isRainy, setIsRainy] = useState(false);
  const [isSunny, setIsSunny] = useState(false);

  useEffect(() => {
    const fetchWeatherData = () => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=10ce33ccf310ad1616cfecc580676068`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
          const weatherDescription = data.weather[0].description.toLowerCase();
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
          console.error("Error fetching weather data:", error);
        });
    };

    fetchWeatherData();

    const intervalId = setInterval(fetchWeatherData, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [props.city]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className=" align-items-center d-flex justify-content-center vh-100 ">
      <Card
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderRadius: "8rem",
          padding: "3rem",
        }}
      >
        <Card.Body className="text-white">
          <Card.Title className="text-center" style={{ fontSize: "4rem" }}>
            Meteo in {weatherData.name}
          </Card.Title>
          <Row className="text-center">
            <Col xs="12" className="mt-5 mb-5">
              <p className="mb-1 fs-5">TEMPERATURA</p>
              <h2 style={{ fontSize: "7rem" }}>
                {Math.round(weatherData.main.temp - 273.15)}°C
              </h2>
            </Col>
            <Col xs="12" className="mb-5">
              <p className="mb-1 fs-5">CONDIZIONI</p>
              {isCloudy && <h2 style={{ fontSize: "3rem" }}>Nuvoloso</h2>}
              {isRainy && <h2 style={{ fontSize: "3rem" }}>Piovoso</h2>}
              {isSunny && <h2 style={{ fontSize: "3rem" }}>Soleggiato</h2>}
            </Col>
            <Col xs="12" className="mb-5 ">
              <p className="mb-1 fs-5">DESCRIZIONE</p>
              <h2 style={{ fontSize: "3rem" }}>
                {weatherData.weather[0].description}
              </h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="12" md="auto text-center mb-3">
              <Badge
                variant="info"
                className="fs-3"
                style={{ borderRadius: "10rem", padding: "1rem 2rem" }}
              >
                Humidity: {weatherData.main.humidity}%
              </Badge>
            </Col>
            <Col xs="12" md="auto text-center mb-3">
              <Badge
                variant="secondary"
                className="fs-3"
                style={{ borderRadius: "10rem", padding: "1rem 2rem" }}
              >
                Min Temp: {Math.round(weatherData.main.temp_min - 273.15)}°C
              </Badge>
            </Col>
            <Col xs="12" md="auto text-center">
              <Badge
                variant="secondary"
                className="fs-3"
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

export default Central;
