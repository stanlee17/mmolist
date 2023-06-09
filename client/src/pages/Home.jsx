import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Import bootstrap components
import { Container } from 'react-bootstrap';

// Import images
import HeroImg from '../images/blue-protocol.jpg';

// Import components
import HeroBox from '../components/common/HeroBox';
import TopRated from '../components/features/TopRated';
import Upcoming from '../components/features/Upcoming';
import NewReleased from '../components/features/NewReleased';

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
  margin: 2rem 0;

  @media only screen and (max-width: 800px) {
    h1 {
      font-size: 1.8rem;
    }

    a {
      font-size: 0.9rem;
    }
  }
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
        <div style={{ margin: '5rem 0' }}>
          {/* Top Rated */}
          <div className="my-5" id="top-rated">
            <StyledHeading>
              <h1>Top Rated</h1>
              <Link to="/search">View All</Link>
            </StyledHeading>
            <TopRated />
          </div>

          {/* Upcoming */}
          <div className="my-5">
            <StyledHeading>
              <h1>Upcoming </h1>
              <Link to="/search">View All</Link>
            </StyledHeading>
            <Upcoming />
          </div>
          {/* New Released */}
          <div className="my-5">
            <StyledHeading>
              <h1>New Released</h1>
              <Link to="/search">View All</Link>
            </StyledHeading>
            <NewReleased />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Home;
