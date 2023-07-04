import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const SkeletonStyles = styled(Skeleton)`
  background-color: var(--dark-blue);
  border-radius: 20px;
  width: 100%;

  :not(:last-child) {
    margin-bottom: 4rem;
  }
`;

const SkeletonTopRated = ({ cards }) => {
  return (
    <div>
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <SkeletonStyles key={i} height={320} />
        ))}
    </div>
  );
};

export default SkeletonTopRated;
