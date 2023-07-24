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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // COMPONENT FUNCTIONS
  async function fetchGames() {
    try {
      const response = await gamesService.getBySearch(search);
      const data = await response.data;
      // Get all data
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err?.response);
      setError(true);
    }
  }

  // Function to get the search value from input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchGames();
    setSearch('');
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
        <SearchForm onSubmit={handleSubmit}>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
          />
        </SearchForm>

        {/* GROUP 2: FILTERED GAMES */}
        <Row lg={5} md={3} xs={2} className="g-5">
          {!loading ? (
            data.map((game) => (
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
            <Spinner loading={loading} height="40vh" />
          )}
        </Row>
      </StyledSearch>
    </Container>
  );
};

export default Search;
