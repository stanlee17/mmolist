import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { device } from '../../styles/BreakPoints';
import { FlxCenter } from '../../styles/Global';
import useAuth from '../../hooks/useAuth';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import MLCard from '../../components/common/MLCard';
import Contribution from '../../components/features/Contribution';
import ProfileImage from '../../images/blue-protocol-bg2.jpg';

const StyledProfile = styled.div`
  ${FlxCenter}
  background: linear-gradient(rgba(21, 34, 50, 0.85), rgba(21, 34, 50, 0.85)),
    url(${(props) => props.bg}) no-repeat center center;
  background-size: cover;
  min-height: 45vh;

  .username {
    color: var(--blue);
    font-weight: 600;
    font-size: 2rem;
  }

  @media ${device.tablet} {
    .username {
      font-size: 1.8rem;
    }
  }
`;

const Profile = () => {
  useDocumentTitle('Profile | MMOList');
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
      <StyledProfile bg={ProfileImage}>
        <div className="text-center mb-4">
          <h4 className="username">Welcome back, {user.username}</h4>
        </div>
      </StyledProfile>
      <Container>
        <Contribution />
      </Container>
    </Fragment>
  );
};

export default Profile;
