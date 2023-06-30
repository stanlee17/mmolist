import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Import bootstrap components
import { Container, Card, Col, Row } from 'react-bootstrap';

import gamesService from '../../services/gamesService';

const StyledSearch = styled.div`
  margin: 10rem 0;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;

  button {
    min-width: 0%;
  }
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  border-radius: 2rem;
  min-width: 70%;
  padding: 0.5rem 1rem;
  background-color: var(--dark-blue);
  color: var(--text-primary);

  ::placeholder {
    color: var(--greyish-blue);
  }

  @media only screen and (max-width: 1000px) {
    min-width: 100%;
  }
`;

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

const Search = () => {
  // HOOK: SETTING COMPONENT STATE (& init values)
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);

  console.log(search);

  // HOOK: Prevention of useEffect calling TWICE (React v18)
  const effectRan = useRef(false);

  useEffect(() => {
    console.log('Effect ran');

    if (effectRan.current === false) {
      fetchGames();

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
      // Get all data
      setData(data);
    } catch (err) {
      console.log(err?.response);
      setError(true);
    }
  }

  // Function to filter games based on the input search value
  const filteredGames = (game) => {
    if (search === '') {
      return game;
    } else if (game.title.toLowerCase().includes(search.toLowerCase())) {
      return game;
    }
  };

  // Function to get the search value from input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return <Container>Couldn't retrieve data at this time</Container>;
  }

  return (
    <Container>
      <StyledSearch>
        <h1 className="text-center mb-4">Search MMORPG</h1>
        <SearchForm onSubmit={(e) => e.preventDefault()}>
          <SearchInput
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
          />
        </SearchForm>
        <Row lg={5} md={3} xs={3} className="g-4">
          {data.filter(filteredGames).map((game) => (
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
      </StyledSearch>
    </Container>
  );
};

export default Search;
