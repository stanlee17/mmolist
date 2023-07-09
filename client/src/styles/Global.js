import styled, { css } from 'styled-components';
import { device } from './BreakPoints';
import { Card } from 'react-bootstrap';

export const FlxCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlxBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledCard = styled(Card)`
  background-color: transparent;
  border: none;

  .img-wrapper {
    overflow: hidden;
    border-radius: 1rem;
    margin-bottom: 0.5rem;
  }

  .card-img {
    border-radius: 1rem;
    height: 300px;
    transition: transform 0.5s ease;
    object-fit: cover;

    :hover {
      transform: scale(1.1);
    }
  }

  a {
    font-weight: 500;
    transition: all 0.5s;
    color: var(--text-primary);
  }

  a:hover {
    color: var(--text-hover);
  }

  @media ${device.laptop} {
    .card-img {
      min-height: 100%;
    }
  }

  @media ${device.mobileL} {
    .card-img {
      max-height: 200px;
    }
  }
`;
