import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../styles/BreakPoints';
import gamesService from '../../services/gamesService';
import ErrorPage from '../../components/common/ErrorPage';

const StyledBackground = styled.div`
  background: linear-gradient(rgba(21, 34, 50, 0.85), rgba(21, 34, 50, 0.85)),
    url(${(props) => props.bg}) no-repeat center center;
  background-size: cover;
  min-height: 45vh;
`;

const StyledGamesDetail = styled.div`
  margin-top: -200px;
  margin-bottom: 5rem;

  h4 {
    color: var(--blue);
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .game-intro {
    margin-top: 3rem;
  }
`;

const StyledHero = styled.div`
  display: flex;
  align-items: center;

  .game-image {
    border-radius: 20px;
    min-width: 250px;
    min-height: 350px;
    object-fit: cover;
  }

  .game-details {
    display: inline-block;
    background-color: var(--dark-blue);
    margin-left: 2rem;
    border-radius: 20px;
    padding: 2rem;
    height: 80%;
    width: 100%;

    .title {
      color: var(--blue);
      font-weight: bold;
      margin-bottom: 2rem;
    }

    .more-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      width: 100%;

      h6 {
        display: inline-block;
        font-weight: bold;
      }
    }
  }

  @media ${device.laptop} {
    flex-direction: column;

    .game-image {
      max-width: 150px;
      max-height: 250px;
      margin-bottom: 2rem;
    }

    .game-details {
      text-align: center;
      margin-left: 0;
    }
  }

  @media ${device.mobileL} {
    .game-details {
      .more-info {
        grid-template-columns: repeat(2, 1fr);

        h6,
        p {
          font-size: 0.9rem;
        }
      }
    }
  }
`;

const StyledTrailer = styled.div`
  margin-top: 3rem;

  .trailer {
    border-radius: 20px;
  }

  @media ${device.laptop} {
    .trailer {
      width: 100%;
    }
  }
`;

const GamesDetail = () => {
  // HOOKS
  const params = useParams();

  // INITIAL STATES
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
    background_image,
  } = gamesData;

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await gamesService.getById(id);
        const fetchedGames = await response.data;
        console.log(fetchedGames);

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
    <Fragment>
      <StyledBackground bg={background_image} />
      <Container>
        <StyledGamesDetail>
          {/* GROUP 1: Image, Title, More Info */}
          <StyledHero>
            <img className="game-image" src={cover_image} alt={title} />
            <div className="game-details">
              <h2 className="title">{title}</h2>
              <div className="more-info">
                <div>
                  <h6>Developer:</h6>
                  <p>{developer}</p>
                </div>
                <div>
                  <h6>Release Date:</h6>
                  <p>{release_date}</p>
                </div>
                <div>
                  <h6>Classification:</h6>
                  <p>{classification}</p>
                </div>
                <div>
                  <h6>Rating:</h6>
                  <p>{rating}</p>
                </div>
                <div>
                  <h6>Engine:</h6>
                  <p>{engine}</p>
                </div>
                <div>
                  <h6>Status:</h6>
                  <p>{status}</p>
                </div>
              </div>
            </div>
          </StyledHero>

          {/* GROUP 2: Description */}
          <div className="game-intro">
            <h4>Introduction</h4>
            <p>{description}</p>
          </div>

          {/* GROUP 3: Trailer */}
          <StyledTrailer>
            <h4>Trailer</h4>
            <iframe
              title={title}
              width="560"
              height="315"
              class="trailer"
              allow="fullscreen;"
              src={`https://www.youtube.com/embed/${trailer}`}
            ></iframe>
          </StyledTrailer>
        </StyledGamesDetail>
      </Container>
    </Fragment>
  );
};

export default GamesDetail;
