import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { RiEdit2Fill } from 'react-icons/ri';
import { device } from '../../styles/BreakPoints';
import useAuth from '../../hooks/useAuth';
import gamesService from '../../services/gamesService';

const Styles = styled.div`
  margin: 4rem 0;

  .my-contribution {
    color: var(--blue);
    font-weight: 600;
  }
`;

const StyledCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(rgba(15, 29, 45, 0.9), rgba(15, 29, 45, 0.9)),
    url(${(props) => props.bg}) no-repeat center center;
  background-color: var(--dark-blue);
  border-radius: 20px;
  margin: 2rem 0;

  .game-data {
    display: flex;
  }

  .game-image {
    min-width: 100px;
    max-height: 100px;
    object-fit: cover;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  .game-details {
    margin: auto 1rem;
    line-height: 0;

    .game-title {
      font-size: 1.2rem;
    }

    .release-date {
      color: var(--text-primary);
      margin-top: 1rem;
    }
  }

  @media ${device.tablet} {
    padding: 1.5rem 0;

    .game-image {
      display: none;
    }

    .game-details {
      .game-title {
        font-size: 1rem;
      }
    }
  }
`;

const EditLink = styled(Link)`
  background-color: transparent;
  color: var(--success);
  padding: 1rem;
  border-radius: 10px;
  border: 1px var(--success) solid;
  outline: none;
  transition: all 0.3s;
  margin-right: 1rem;

  svg {
    font-size: 1.5rem;
  }

  :hover {
    color: #fff;
    background-color: var(--success);
  }

  @media ${device.tablet} {
    padding: 0.7rem;
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  color: var(--error);
  padding: 1rem;
  border-radius: 10px;
  border: 1px var(--error) solid;
  outline: none;
  transition: all 0.3s;
  margin-right: 1rem;

  svg {
    font-size: 1.2rem;
  }

  :hover {
    color: #fff;
    background-color: var(--error);
  }

  @media ${device.tablet} {
    padding: 0.7rem;
  }
`;

const Contribution = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // HOOK: SETTING COMPONENT STATE (& init values)
  const [contribution, setContribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // HOOK: Prevention of useEffect calling TWICE (React v18)
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      fetchGames();
      setLoading(false);

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

      // Games data will only be showed to the user that created/added the game/s
      if (user?.id) {
        const contribution = data.filter((data) => data.createdBy === user.id);
        setContribution(contribution);
      }
    } catch (err) {
      console.log(err?.response);
      setError(true);
    }
  }

  // DELETION OF DOC
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    const id = e.currentTarget.id;

    try {
      const response = await gamesService.del(id);
      console.log(response);

      setLoading(false);
      navigate('/search');
    } catch (err) {
      console.log(err?.response);
      setError(true);
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return <Container>Couldn't retrieve data at this time</Container>;
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Styles>
      <h4 className="my-contribution">My Contribution</h4>
      {contribution.map((game) => (
        <StyledCard key={game.id} bg={game.background_image}>
          <div className="game-data">
            <img
              src={game.cover_image}
              alt={game.title}
              className="game-image"
            />
            <div className="game-details">
              <Link to={`/games/${game.id}`}>
                <h5 className="game-title">{game.title}</h5>
              </Link>
              <p className="release-date">{game.release_date}</p>
            </div>
          </div>
          <div className="game-links">
            <EditLink to={`/edit/${game.id}`}>
              <RiEdit2Fill />
            </EditLink>
            <DeleteButton id={game.id} onClick={handleDeleteClick}>
              <FaTrashAlt />
            </DeleteButton>
          </div>
        </StyledCard>
      ))}
    </Styles>
  );
};

export default Contribution;
