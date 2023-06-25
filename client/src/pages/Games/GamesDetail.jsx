import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

// Import custom components
import gamesService from '../../services/gamesService';
import ErrorPage from '../../components/common/ErrorPage';

const StyledImage = styled.img`
  border-radius: 20px;
  min-width: 272px;
  max-height: 380px;
  object-fit: cover;

  @media only screen and (max-width: 1000px) {
    min-width: 100%;
    max-height: 100%;
  }
`;

const StyledInfo = styled.div`
  margin-left: 3rem;

  .game-title,
  .game-description {
    padding-bottom: 1rem;
  }

  .game-description {
    font-weight: 400;
    line-height: 1.8;
  }

  @media only screen and (max-width: 1000px) {
    margin-left: 0;
    text-align: center;

    .game-title {
      padding: 1rem 0;
    }

    .game-description {
      padding-bottom: 1rem;
    }

    .game-trailer {
      max-width: 350px;
    }
  }
`;

const StyledDetail = styled.div`
  border-radius: 20px;
  background-color: var(--dark-blue);
  padding: 1.5rem;
  margin: 2rem 0;

  .game-detail:not(:last-of-type) {
    padding-bottom: 10px;
  }

  .game-detail {
    h6 {
      color: var(--blue);
    }

    p {
      font-size: 0.9rem;
      font-weight: 400;
    }
  }
`;

const Styles = styled.div`
  margin: 10rem 0;
  display: flex;

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const GamesDetail = () => {
  // HOOKS
  const params = useParams();

  //   INITIAL STATES
  const [gamesData, setGamesData] = useState({
    id: params.id,
    title: '',
    classification: '',
    description: '',
    status: '',
    release_date: 0,
    rating: 0,
    engine: '',
    developer: '',
    trailer: '',
    createdBy: '',
    cover_image: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const {
    id,
    title,
    classification,
    description,
    status,
    release_date,
    rating,
    engine,
    developer,
    trailer,
    cover_image,
  } = gamesData;

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await gamesService.getById(id);
        const fetchedGames = await response.data;

        setGamesData((gamesData) => ({
          ...gamesData,
          ...fetchedGames,
        }));
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    }
    fetchGames();
  }, [id]);

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return <Container>Loading...</Container>;
  }

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return (
      <Container className="text-center">
        <ErrorPage />
      </Container>
    );
  }

  return (
    <Container>
      <Styles>
        <div>
          <StyledImage src={cover_image} alt={title} />
          <StyledDetail>
            <div className="game-detail">
              <h6>Developer</h6>
              <p>{developer}</p>
            </div>

            <div className="game-detail">
              <h6>Engine</h6>
              <p>{engine}</p>
            </div>

            <div className="game-detail">
              <h6>Classification</h6>
              <p>{classification}</p>
            </div>

            <div className="game-detail">
              <h6>Release Date</h6>
              <p>{release_date}</p>
            </div>

            <div className="game-detail">
              <h6>Rating</h6>
              <p>⭐{rating}</p>
            </div>

            <div className="game-detail">
              <h6>Status</h6>
              <p>{status}</p>
            </div>
          </StyledDetail>
        </div>
        <StyledInfo>
          <h1 className="game-title">{title}</h1>
          <p className="game-description">{description}</p>
          <iframe
            title={title}
            width="560"
            height="315"
            class="game-trailer"
            allow="fullscreen;"
            src={`https://www.youtube.com/embed/${trailer}`}
          ></iframe>
        </StyledInfo>
      </Styles>
    </Container>
  );
};

export default GamesDetail;
