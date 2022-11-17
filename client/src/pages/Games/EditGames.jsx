import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Row, Col, Form } from 'react-bootstrap';

import MLButton from '../../components/common/MLButton';
import MLCard from '../../components/common/MLCard';

import ErrorPage from '../../components/common/ErrorPage';
import gamesService from '../../services/gamesService';

const PreviewImage = styled.img`
  border-radius: 20px;
  margin-top: 1rem;
  max-width: 200px;
`;

const EditGames = () => {
  const navigate = useNavigate();
  const params = useParams();

  // HOOK: INITIAL STATES
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Uploaded file from existing downloadURL
  const [uploadedFile, setUploadedFile] = useState('');
  const [preview, setPreview] = useState(true);

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

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      fetchGames();
      setLoading(false);

      return () => {
        effectRan.current = true;
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Form pre-population fetch call
  async function fetchGames() {
    try {
      // API FETCH CALL
      const response = await gamesService.getById(id);
      const fetchedGames = await response.data;
      console.log(fetchedGames);

      // UPDATE STATE DATA OBJECT
      setGamesData((gamesData) => ({
        ...gamesData,
        ...fetchedGames,
      }));

      // SAVE UPLOAED FILE "GLOB" TO STATE
      if (!fetchedGames.cover_image) {
        console.log('No downloadURL provided by the database');
      } else {
        const fileGlob = gamesService.getFileFromUrl(fetchedGames.cover_image);
        setUploadedFile(fileGlob);
      }
    } catch (err) {
      console.log(err?.response);
      setError(true);
    }
  }

  // COMPONENT FUNCTIONS
  // 1. Map changing text input fields to state
  const handleTextChange = (e) => {
    const { name, value } = e.target;

    setGamesData({
      ...gamesData,
      [name]: value,
    });
  };

  // 2. Map changing file input to state
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Add creator user id & their uploaded cover image
    setGamesData({
      ...gamesData,
      cover_image: file,
    });

    setPreview(false);
  };

  // 3. Function to control form submission event
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(gamesData);

    try {
      const response = await gamesService.put(id, gamesData, uploadedFile);
      console.log(response);
      navigate('/profile');
    } catch (err) {
      console.log(err?.response);
      setError(true);
      window.scroll({ top: 0, left: 0, behaviour: 'smooth' });
    }
    setLoading(false);
  };

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

  return (
    <MLCard title="Edit Games">
      <Form onSubmit={handleSubmit}>
        {/* GROUP 1: Game Title, Developer, Engine */}
        <Form.Group className="mb-3">
          <Row>
            <Col lg={4} md={4} sm={12}>
              <Form.Label>Game Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Blue Protocol"
                name="title"
                value={title}
                onChange={handleTextChange}
              />
            </Col>
            <Col lg={4} md={4} sm={12}>
              <Form.Label>Developer</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Bandai Namco"
                name="developer"
                value={developer}
                onChange={handleTextChange}
              />
            </Col>
            <Col lg={4} md={4} sm={12}>
              <Form.Label>Engine</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Unreal Engine 4"
                name="engine"
                value={engine}
                onChange={handleTextChange}
              />
            </Col>
          </Row>
        </Form.Group>

        {/* GROUP 2: Release Date, Status, Classification, Rating */}
        <Form.Group className="mb-3">
          <Row>
            <Col lg={3} md={3} sm={12}>
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 2022"
                name="release_date"
                value={release_date}
                onChange={handleTextChange}
              />
            </Col>
            <Col lg={3} md={3} sm={12}>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={status}
                onChange={handleTextChange}
              >
                <option value="" selected="selected" hidden="hidden">
                  Select
                </option>
                <option value="Released">Released</option>
                <option value="Development">Development</option>
                <option value="Beta testing">Beta Testing</option>
              </Form.Select>
            </Col>
            <Col lg={3} md={3} sm={12}>
              <Form.Label>Classification</Form.Label>
              <Form.Select
                name="classification"
                value={classification}
                onChange={handleTextChange}
              >
                <option value="" selected="selected" hidden="hidden">
                  Select
                </option>
                <option value="AAA">AAA</option>
                <option value="Indie">Indie</option>
              </Form.Select>
            </Col>
            <Col lg={3} md={3} sm={12}>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g. 8.2"
                name="rating"
                value={rating}
                onChange={handleTextChange}
              />
            </Col>
          </Row>
        </Form.Group>

        {/* GROUP 3: DESCRIPTION */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Enter description..."
            name="description"
            value={description}
            onChange={handleTextChange}
          />
        </Form.Group>

        {/* GROUP 4: NATION */}
        <Form.Group className="mb-3">
          <Form.Label>Youtube Trailer ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. 7fYBmoeVKEU"
            name="trailer"
            value={trailer}
            onChange={handleTextChange}
          />
        </Form.Group>

        {/* Cover Image */}
        {preview && !loading && (
          <div className="text-center mt-2 mb-5">
            <h6>Current Image</h6>
            <PreviewImage src={cover_image} alt="preview" />
          </div>
        )}

        {/* GROUP 5: COVER IMAGE, BANNER IMAGE */}
        <Form.Group className="mb-3" controlId="cover_image">
          <Form.Label>Cover Image</Form.Label>
          <Form.Control
            type="file"
            className="mb-4"
            onChange={handleFileChange}
          />
        </Form.Group>

        {/* SUBMIT BUTTON */}
        <MLButton loadingState={loading} buttonform>
          {loading ? '...' : 'Submit'}
        </MLButton>
      </Form>
    </MLCard>
  );
};

export default EditGames;
