import React, { Fragment } from 'react';
import styled from 'styled-components';
import { device } from '../styles/BreakPoints';
import { FlxCenter } from '../styles/Global';
import { Container } from 'react-bootstrap';
import useDocumentTitle from '../hooks/useDocumentTitle';
import HeroBox from '../components/common/HeroBox';
import TopRated from '../components/features/TopRated';
import Upcoming from '../components/features/Upcoming';
import NewReleased from '../components/features/NewReleased';
import HeroImg from '../images/blue-protocol.jpg';

const StyledHero = styled.div`
  ${FlxCenter}
  background: linear-gradient(rgba(21, 34, 50, 0.85), rgba(21, 34, 50, 0.85)),
    url(${(props) => props.bg}) no-repeat center center;
  background-size: cover;
  min-height: 100vh;
`;

const StyledHeading = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;

  @media ${device.tablet} {
    h1 {
      font-size: 1.8rem;
    }

    a {
      font-size: 0.9rem;
    }
  }
`;

const Home = () => {
  useDocumentTitle('MMOList');

  return (
    <Fragment>
      <StyledHero bg={HeroImg}>
        <Container>
          <HeroBox
            title="Explore the latest MMORPG Games"
            content="Looking for MMORPG games to play? Find the latest MMORPG games where you can find the most popular, highest rated and upcoming games. You can also contribute by adding new MMORPG games to our vast database"
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
            </StyledHeading>
            <TopRated />
          </div>
          {/* Upcoming */}
          <div className="my-5">
            <StyledHeading>
              <h1>Upcoming</h1>
            </StyledHeading>
            <Upcoming />
          </div>
          {/* New Released */}
          <div className="my-5">
            <StyledHeading>
              <h1>New Released</h1>
            </StyledHeading>
            <NewReleased />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Home;
