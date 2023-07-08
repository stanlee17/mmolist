import React from 'react';
import styled from 'styled-components';
import { FlxCenter } from '../../styles/Global';
import PropagateLoader from 'react-spinners/PropagateLoader';

const StyledSpinner = styled.div`
  ${FlxCenter}
  margin: auto;
  min-height: 100vh;
`;

const Spinner = ({ loading }) => {
  return (
    <StyledSpinner>
      <PropagateLoader color="#3db4f2" size={20} loading={loading} />
    </StyledSpinner>
  );
};

export default Spinner;
