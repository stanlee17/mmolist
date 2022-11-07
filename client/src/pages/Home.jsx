import React, { Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Import bootstrap components
import { Container } from "react-bootstrap";

import HeroImg from "../images/blue-protocol.jpg";

// Import components
import HeroBox from "../components/common/HeroBox";

// Import features
import Popular from "../components/features/Popular";

const StyledHero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(21, 34, 50, 0.8), rgba(21, 34, 50, 0.8)),
    url(${HeroImg}) no-repeat center center;
  background-size: cover;
  min-height: 95vh;
`;

const StyledHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5rem 0 2rem 0;
`;

const Home = () => {
  return (
    <Fragment>
      <StyledHero>
        <Container>
          <HeroBox
            title="Explore the latest MMORPG Games"
            content="Looking for MMORPG games to play? Discover MMOList, where you can find the most popular, underrated, and upcoming MMORPG games"
            button="Explore"
          />
        </Container>
      </StyledHero>
      <Container>
        <StyledHeading>
          <h1>Popular MMOs</h1>
          <Link to="/search">View All</Link>
        </StyledHeading>
        <Popular
          title="Final Fantasy XIV"
          image_url="https://www.nme.com/wp-content/uploads/2021/07/Final-Fantasy-XIV@2000X1270.jpg"
          description="test"
        />
      </Container>
    </Fragment>
  );
};

export default Home;
