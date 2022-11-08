import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Import bootstrap components
import { Container, Card, Col, Row } from "react-bootstrap";

import gamesService from "../../services/gamesService";

const StyledTopRated = styled.div`
  .card {
    background-color: var(--dark-blue);
  }

  .card-body {
    position: absolute;
    top: 40%;
    transform: translate(0, -40%);
    margin: 1rem;

    h1 {
      font-size: 1.8rem;
    }
  }

  .card-img {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
`;

const TopRated = () => {
  // HOOK: SETTING COMPONENT STATE (& init values)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // HOOK: Prevention of useEffect calling TWICE (React v18)
  const effectRan = useRef(false);

  useEffect(() => {
    console.log("Effect ran");

    if (effectRan.current === false) {
      fetchGames();
      setLoading(false);

      // CLEAN UP FUNCTION
      return () => {
        console.log("Unmounted");
        effectRan.current = true;
      };
    }
  }, []);

  // COMPONENT FUNCTIONS
  async function fetchGames() {
    try {
      const response = await gamesService.get();
      const data = await response.data;

      // Filter by released status games
      const releasedGames = data.filter((data) => data.status === "Released");

      // Only get the top 3 rated released games
      setData(releasedGames.slice(0, 3));
    } catch (err) {
      console.log(err?.response);
      setError(true);
    }
  }

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return <Container>Couldn't retrieve data at this time</Container>;
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <StyledTopRated>
      {data.map((game) => (
        <Card key={game.id}>
          <Row className="no-gutters">
            <Col lg={5}>
              <Card.Img src={game.banner_image} alt={game.name} />
            </Col>
            <Col>
              <Card.Body>
                <h1>{game.title}</h1>
                <p>{game.description}</p>
                <Link to="">Read More</Link>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </StyledTopRated>
  );
};

export default TopRated;
