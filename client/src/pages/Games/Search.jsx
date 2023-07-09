import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { device } from '../../styles/BreakPoints';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { StyledCard, FlxCenter } from '../../styles/Global';
import Spinner from '../../components/common/Spinner';
import gamesService from '../../services/gamesService';

const StyledSearch = styled.div`
  margin: 10rem 0;
`;

const SearchForm = styled.form`
  ${FlxCenter}
  margin-bottom: 3rem;

  button {
    min-width: 0%;
  }
`;

const SearchInput = styled.input`
  border-radius: 2rem;
  min-width: 70%;
  padding: 0.5rem 1rem;
  background-color: var(--dark-blue);
  color: var(--text-primary);
  outline: none;
  border: none;

  ::placeholder {
    color: var(--greyish-blue);
  }

  @media ${device.laptop} {
    min-width: 100%;
  }
`;

const Search = () => {
  useDocumentTitle('Search | MMOList');
  // HOOK: SETTING COMPONENT STATE (& init values)
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
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
        {/* GROUP 1: SEARCH FORM */}
        <SearchForm onSubmit={(e) => e.preventDefault()}>
          <SearchInput
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
          />
        </SearchForm>

        {/* GROUP 2: FILTERED GAMES */}
        <Row lg={5} md={3} xs={2} className="g-5">
          {data.length ? (
            data.filter(filteredGames).map((game) => (
              <Col key={game.id}>
                <StyledCard>
                  <Link to={`/games/${game.id}`}>
                    <div className="img-wrapper">
                      <Card.Img src={game.cover_image} />
                    </div>
                    <Link to={`/games/${game.id}`}>{game.title}</Link>
                  </Link>
                </StyledCard>
              </Col>
            ))
          ) : (
            <Spinner />
          )}
        </Row>
      </StyledSearch>
    </Container>
  );
};

export default Search;
