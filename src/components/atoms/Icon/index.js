import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'src/components/atoms';

const icons = {
  play: require('./icons/Play').default,
  pause: require('./icons/Pause').default,
  forward: require('./icons/Forward').default,
  backward: require('./icons/Backward').default,
};

const IconBox = styled(Box)`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
const Icon = ({ name, mx, onClick }) => {
  const Component = icons[name];
  return name ? (
    <IconBox mx={mx} onClick={() => onClick(name)}>
      <Component />
    </IconBox>
  ) : null;
};

Icon.propTypes = {
  name: PropTypes.string,
};

Icon.defaultProps = {
  name: '',
};

export default Icon;
