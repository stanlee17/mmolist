import React, { useState, useEffect, useRef } from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../styles/BreakPoints';
import SkeletonCard from '../common/skeleton/SkeletonCard';
import gamesService from '../../services/gamesService';

const StyledCard = styled(Card)`
  background-color: transparent;
  border: none;

  .card-img {
    margin-bottom: 0.8rem;
    border-radius: 1rem;
    height: 320px;
    object-fit: cover;
  }

  a {
    font-weight: 500;
    transition: all 0.5s;
    color: var(--text-primary);
  }

  a:hover {
    color: var(--text-hover);
  }

  @media ${device.laptop} {
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
    if (effectRan.current === false) {
      fetchGames();

      // CLEAN UP FUNCTION
      return () => {
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
        (data) => data.release_date >= dateNow - 5 && data.status === 'Released'
      );

      // Only get the top 3 rated released games
      setLoading(false);
      setData(releasedGames.slice(0, 5));
    } catch (err) {
      setError(true);
    }
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return <SkeletonCard cards={5} />;
  }

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return <Container>Couldn't retrieve data at this time</Container>;
  }

  return (
    <div>
      <Row lg={5} md={3} xs={3} className="g-4">
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
