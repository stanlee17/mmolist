import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Container } from "react-bootstrap";

// Import custom components
import gamesService from "../../services/gamesService";
import ErrorPage from "../../components/common/ErrorPage";

const GamesDetail = () => {
  // HOOKS
  const params = useParams();

  //   INITIAL STATES
  const [gamesData, setGamesData] = useState({
    id: params.id,
    title: "",
    classification: "",
    description: "",
    status: "",
    release_date: 0,
    rating: 0,
    engine: "",
    developer: "",
    trailer: "",
    createdBy: "",
    cover_image: "",
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
        console.log(fetchedGames);

        setGamesData((gamesData) => ({
          ...gamesData,
          ...fetchedGames,
        }));
      } catch (err) {
        console.log(err?.response);
        setError(true);
      }
    }
    fetchGames();
    setLoading(false);
  }, [id]);

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return (
      <Container className="text-center">
        <ErrorPage />
      </Container>
    );
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return <Container>Loading...</Container>;
  }

  // COMPONENT FUNCTIONS
  // [1] Text Standardiser
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Container>
      <h1>{title}</h1>
      <img src={cover_image} alt={title} />
    </Container>
  );
};

export default GamesDetail;
