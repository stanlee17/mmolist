import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";
import { toast } from "react-toastify";

// Import bootstrap components
import Form from "react-bootstrap/Form";

import MLButton from "../../components/common/MLButton";
import AuthCard from "../../components/common/MLCard";
import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";

const UserNav = styled.div`
  text-align: center;
  margin-top: 1rem;
  padding-top: 1rem;
  font-size: 0.9rem;

  a {
    text-decoration: none;
    color: var(--blue);
    font-weight: 600;
    transition: 0.3s;
  }

  a:hover {
    color: var(--text-hover);
  }
`;

const Signup = () => {
  const { loginSaveUser } = useAuth();
  const navigate = useNavigate();

  // State init
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Destructuring data state nested object properties
  const { username, email, password } = user;

  // HOOK: useRef
  const passwordConfirmRef = useRef();

  // Form functions
  const handleTextChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // EARLY VALIDATION: PASSWORD CONFIRM
    if (password !== passwordConfirmRef.current.value) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    // API Call to write user data
    try {
      const response = await authService.register(user);
      loginSaveUser(response.data);
      navigate("/profile");
    } catch (err) {
      console.log(err?.response);
    }
  };

  return (
    <AuthCard title="Sign Up" authform>
      <Form onSubmit={handleSubmit}>
        {/* USERNAME */}
        <Form.Group className="mb-4" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={handleTextChange}
          />
        </Form.Group>
        {/* EMAIL */}
        <Form.Group className="mb-4" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleTextChange}
          />
        </Form.Group>
        {/* PASSWORD */}
        <Form.Group className="mb-4" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleTextChange}
          />
        </Form.Group>
        {/* CONFIRM PASSWORD */}
        <Form.Group className="mb-4" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            ref={passwordConfirmRef}
          />
        </Form.Group>
        <MLButton loadingState={loading} buttonform>
          {loading ? "..." : "Signup"}
        </MLButton>
      </Form>
      <UserNav>
        Already have an account? &nbsp;<Link to="/login">Login</Link>
      </UserNav>
    </AuthCard>
  );
};

export default Signup;
