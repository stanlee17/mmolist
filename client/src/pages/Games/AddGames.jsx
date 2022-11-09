import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";

import MMOButton from "../../components/common/MMOButton";
import FormCard from "../../components/common/FormCard";

const AddGames = () => {
  const [loading, setLoading] = useState(false);

  return (
    <FormCard title="Add Games">
      <Form>
        {/* GROUP 1: Game Title, Developer, Engine */}
        <Form.Group className="mb-3">
          <Row>
            <Col lg={4} md={4} sm={12}>
              <Form.Label>Game Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Blue Protocol"
                name="title"
              />
            </Col>
            <Col lg={4} md={4} sm={12}>
              <Form.Label>Developer</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Bandai Namco"
                name="developer"
              />
            </Col>
            <Col lg={4} md={4} sm={12}>
              <Form.Label>Engine</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Unreal Engine 4"
                name="engine"
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
                name="release-date"
              />
            </Col>
            <Col lg={3} md={3} sm={12}>
              <Form.Label>Status</Form.Label>
              <Form.Select name="status">
                <option value="released">Released</option>
                <option value="development">Development</option>
                <option value="beta testing">Beta Testing</option>
              </Form.Select>
            </Col>
            <Col lg={3} md={3} sm={12}>
              <Form.Label>Classification</Form.Label>
              <Form.Select name="classification">
                <option value="aaa">AAA</option>
                <option value="indie">Indie</option>
              </Form.Select>
            </Col>
            <Col lg={3} md={3} sm={12}>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g. 8.2"
                name="rating"
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
          />
        </Form.Group>

        {/* GROUP 4: NATION */}
        <Form.Group className="mb-3">
          <Form.Label>Video Trailer URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. https://www.youtube.com/watch?v=7fYBmoeVKEU"
            name="trailer"
          />
        </Form.Group>

        {/* GROUP 5: COVER IMAGE, BANNER IMAGE */}
        <Form.Group className="mb-3" controlId="image">
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Form.Label>Cover Image</Form.Label>
              <Form.Control type="file" className="mb-4" />
            </Col>
            <Col lg={6} md={6} sm={12}>
              <Form.Label>Banner Image</Form.Label>
              <Form.Control type="file" className="mb-4" />
            </Col>
          </Row>
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
