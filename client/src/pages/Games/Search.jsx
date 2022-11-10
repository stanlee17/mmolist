import React from "react";
import styled from "styled-components";

// Import bootstrap components
import { Container } from "react-bootstrap";

import MMOButton from "../../components/common/MMOButton";

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  margin: 3rem 0;

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

const Search = () => {
  return (
    <Container>
      <SearchForm>
        <SearchInput type="text" placeholder="Search..." />
        <MMOButton>Search</MMOButton>
      </SearchForm>
    </Container>
  );
};

export default Search;
