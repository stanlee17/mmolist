import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";

import useAuth from "../../hooks/useAuth";

import MMOButton from "../../components/common/MMOButton";
import FormCard from "../../components/common/FormCard";
import gamesService from "../../services/gamesService";

const AddGames = () => {
  const { user } = useAuth();

  // HOOK: INITIAL STATES
  const [gamesData, setGamesData] = useState({
    title: "",
    classification: "aaa",
    description: "",
    status: "released",
    release_date: 0,
    rating: 0,
    engine: "",
    developer: "",
    trailer: "",
    createdBy: user?.id,
    cover_image: "",
  });

  const [loading, setLoading] = useState(false);

  const {
    title,
    classification,
    description,
    status,
    release_date,
    rating,
    engine,
    developer,
    trailer,
  } = gamesData;

  const navigate = useNavigate();

  // COMPONENT FUNCTIONS
  // 1. Map changing text input fields to state
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    console.log([name]);

    setGamesData({
      ...gamesData,
      [name]: value,
    });
  };

  // 2. Map changing file input to state
  // const handleCoverImgChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log(file);

  //   setGamesData({
  //     ...gamesData,
  //     cover_image: file,
  //   });
  // };

  // 2. Map changing file input to state
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGamesData({
      ...gamesData,
      cover_image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(gamesData);

    try {
      const response = await gamesService.post(gamesData);
      console.log(response);
      navigate("/");
    } catch (err) {
      console.log(err?.response);
      window.scroll({ top: 0, left: 0, behaviour: "smooth" });
    }
    setLoading(false);
    navigate("/create-games");
  };

  // 3. Function to control form submission event

  return (
    <FormCard title="Add Games">
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
              <Form.Control
                as="select"
                name="status"
                value={status}
                onChange={handleTextChange}
              >
                <option value="released">Released</option>
                <option value="development">Development</option>
                <option value="beta testing">Beta Testing</option>
              </Form.Control>
            </Col>
            <Col lg={3} md={3} sm={12}>
              <Form.Label>Classification</Form.Label>
              <Form.Control
                as="select"
                name="classification"
                value={classification}
                onChange={handleTextChange}
              >
                <option value="aaa">AAA</option>
                <option value="indie">Indie</option>
              </Form.Control>
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
          <Form.Label>Video Trailer URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. https://www.youtube.com/watch?v=7fYBmoeVKEU"
            name="trailer"
            value={trailer}
            onChange={handleTextChange}
          />
        </Form.Group>

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
        <MMOButton loadingState={loading}>
          {loading ? "..." : "Submit"}
        </MMOButton>
      </Form>
    </FormCard>
  );
};

export default AddGames;
