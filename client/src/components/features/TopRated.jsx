import React, { useState, useEffect, useRef, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Import bootstrap components
import { Container } from 'react-bootstrap';

import gamesService from '../../services/gamesService';
import SkeletonTopRated from '../common/skeleton/SkeletonTopRated';

const limit = (string, limit) => {
  return string.substring(0, limit) + '...';
};

const StyledTopRated = styled.div`
  display: flex;
  flex-direction: ${(props) => props.reverse && 'row-reverse'};
  align-items: center;
  background: linear-gradient(rgba(15, 29, 45, 0.9), rgba(15, 29, 45, 0.9)),
    url(${(props) => props.bg}) no-repeat center center;
  border-radius: 20px;
  overflow: hidden;

  :not(:last-child) {
    margin-bottom: 4rem;
  }

  .game-image {
    min-width: 230px;
    height: 100%;
    object-fit: cover;
  }

  .game-info {
    padding: 2.5rem;

    .heading {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3,
      h5 {
        color: var(--blue);
        font-weight: 700;
      }
    }
  }

  @media only screen and (max-width: 1000px) {
    flex-direction: column;

    .game-image {
      margin-top: 2.5rem;
      border-radius: 20px;
    }
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

      // Filter by released status games
      const releasedGames = data.filter((data) => data.status === 'Released');

      // Only get the top 5 rated released games
      setData(releasedGames.slice(0, 3));
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return <SkeletonTopRated cards={3} />;
  }

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return <Container>Couldn't retrieve data at this time</Container>;
  }

  return (
    <Fragment>
      {data.map((game, i) => {
        if ((i + 1) % 2 === 0) {
          return (
            <StyledTopRated bg={game.background_image} reverse>
              <img
                className="game-image"
                src={game.cover_image}
                alt={game.title}
              />
              <div className="game-info">
                <div className="heading">
                  <h3>{game.title}</h3>
                  <h5>#{i + 1}</h5>
                </div>
                <p>{limit(game.description, 400)}</p>
                <Link className="read-more" to={`/games/${game.id}`}>
                  Read more...
                </Link>
              </div>
            </StyledTopRated>
          );
        } else {
          return (
            <StyledTopRated bg={game.background_image}>
              <img
                className="game-image"
                src={game.cover_image}
                alt={game.title}
              />
              <div className="game-info">
                <div className="heading">
                  <h3>{game.title}</h3>
                  <h5>#{i + 1}</h5>
                </div>
                <p>{limit(game.description, 400)}</p>
                <Link className="read-more" to={`/games/${game.id}`}>
                  Read more...
                </Link>
              </div>
            </StyledTopRated>
          );
        }
      })}
    </Fragment>
  );
};

export default TopRated;
