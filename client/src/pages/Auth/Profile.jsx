import React, { Fragment } from 'react';
import styled from 'styled-components';

// Import images
import ProfileImage from '../../images/blue-protocol-bg2.jpg';

// Import bootstrap components
import { Container } from 'react-bootstrap';

import useAuth from '../../hooks/useAuth';

import MLCard from '../../components/common/MLCard';
import Contribution from '../../components/features/Contribution';

const ProfileBg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(21, 34, 50, 0.85), rgba(21, 34, 50, 0.85)),
    url(${ProfileImage}) no-repeat center center;
  background-size: cover;
  min-height: 45vh;

  .username {
    color: var(--blue);
    font-weight: 600;
    font-size: 2rem;
  }

  @media only screen and (max-width: 600px) {
    .username {
      font-size: 1.8rem;
    }
  }
`;

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <MLCard title="Profile">
        <div className="text-center mb-4">Cannot Retrieve User</div>
      </MLCard>
    );
  }

  return (
    <Fragment>
      <ProfileBg>
        <div className="text-center mb-4">
          <h4 className="username">Welcome back, {user.username}</h4>
        </div>
      </ProfileBg>
      <Container>
        <Contribution />
      </Container>
    </Fragment>
  );
};

export default Profile;
