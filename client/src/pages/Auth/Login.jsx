import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";
import { toast } from "react-toastify";

// Import bootstrap components
import Form from "react-bootstrap/Form";

// Import components
import MMOButton from "../../components/common/MMOButton";
import AuthCard from "../../components/common/AuthCard";
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

const Login = () => {
  const { loginSaveUser } = useAuth();
  const navigate = useNavigate();

  // State init
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Destructuring data state nested object properties
  const { email, password } = user;

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

    // API Call to write user data
    try {
      const response = await authService.login(user);
      loginSaveUser(response.data);
      navigate("/dashboard");
    } catch (err) {
      console.log(err?.response);
    }
  };

  return (
    <AuthCard title="Login">
      <Form onSubmit={handleSubmit}>
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
        <MMOButton loadingState={loading}>
          {loading ? "..." : "Signup"}
        </MMOButton>
      </Form>
      <UserNav>
        Don't have an account? &nbsp;<Link to="/signup">Sign Up</Link>
      </UserNav>
    </AuthCard>
  );
};

export default Login;
