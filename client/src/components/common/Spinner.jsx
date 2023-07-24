import React from 'react';
import styled from 'styled-components';
import { FlxCenter } from '../../styles/Global';
import PropagateLoader from 'react-spinners/PropagateLoader';

const StyledSpinner = styled.div`
  ${FlxCenter}
  margin: auto;
  min-height: ${(props) => props.height};
`;

const Spinner = ({ loading, height }) => {
  return (
    <StyledSpinner height={height}>
      <PropagateLoader color="#3db4f2" size={20} loading={loading} />
    </StyledSpinner>
  );
};

export default Spinner;
