import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Import bootstrap components
import { Container, Card, Col, Row } from "react-bootstrap";

import MLButton from "../../components/common/MLButton";

import gamesService from "../../services/gamesService";

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
  margin-right: 1rem;
  background-color: var(--dark-blue);
  color: var(--text-primary);

  ::placeholder {
    color: var(--greyish-blue);
  }
`;

const StyledCard = styled(Card)`
  background-color: transparent;
  border: none;

  .card-img {
    margin-bottom: 0.8rem;
    height: 310px;
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
`;

const Search = () => {
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

      // Get all data
      setData(data);
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
    <Container>
      <h1 className="text-center mt-5 mb-4">Search MMORPG</h1>
      <SearchForm>
        <SearchInput type="text" placeholder="Search..." />
        <MLButton>Search</MLButton>
      </SearchForm>
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
    </Container>
  );
};

export default Search;
