import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Import bootstrap components
import { Container, Card, Col, Row } from 'react-bootstrap';

import gamesService from '../../services/gamesService';

const StyledCard = styled(Card)`
  background-color: transparent;
  border: none;

  .card-img {
    margin-bottom: 0.8rem;
    min-height: 310px;
    object-fit: cover;
  }

  a {
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s;
    color: var(--text-primary);
  }

  a:hover {
    color: var(--text-hover);
  }

  @media only screen and (max-width: 1000px) {
    .card-img {
      height: 100%;
    }
  }
`;

const NewReleased = () => {
  // HOOK: SETTING COMPONENT STATE (& init values)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // HOOK: Prevention of useEffect calling TWICE (React v18)
  const effectRan = useRef(false);

  useEffect(() => {
    console.log('Effect ran');

    if (effectRan.current === false) {
      fetchGames();
      setLoading(false);

      // CLEAN UP FUNCTION
      return () => {
        console.log('Unmounted');
        effectRan.current = true;
      };
    }
  }, []);

  // COMPONENT FUNCTIONS
  async function fetchGames() {
    try {
      const response = await gamesService.get();
      const data = await response.data;

      const dateNow = new Date().getFullYear();

      // Filter by released status games
      const releasedGames = data.filter(
        (data) => data.release_date >= dateNow - 3 && data.status === 'Released'
      );
      console.log(releasedGames);

      // Only get the top 3 rated released games
      setData(releasedGames.slice(0, 5));
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
    <div>
      <Row lg={5} md={3} xs={1} className="g-5">
        {data.map((game) => (
          <Col key={game.id}>
            <StyledCard>
              <Link to={`/games/${game.id}`}>
                <Card.Img src={game.cover_image} />
                {game.title}
              </Link>
            </StyledCard>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default NewReleased;
