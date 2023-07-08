import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const SkeletonStyles = styled(Skeleton)`
  background-color: var(--dark-blue);
  border-radius: 1rem;
`;

const SkeletonCard = ({ cards }) => {
  return (
    <div>
      <Row lg={5} md={3} xs={2} className="g-5">
        {Array(cards)
          .fill(0)
          .map((_, i) => (
            <Col key={i}>
              <SkeletonStyles height={320} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default SkeletonCard;
