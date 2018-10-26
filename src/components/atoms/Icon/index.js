import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const icons = {
  play: require('./icons/Play').default,
  pause: require('./icons/Pause').default,
  forward: require('./icons/Forward').default,
  backward: require('./icons/Backward').default,
  volume: require('./icons/Volume').default,
  cross: require('./icons/Cross').default,
  cd: require('./icons/Cd').default,
  stop: require('./icons/Stop').default,
};

const IconRoot = styled.div`
  width: 35px;
  height: 35px;
  cursor: pointer;
`;
const Icon = ({ name }) => {
  const Component = icons[name];

  return name ? (
    <IconRoot>
      <Component />
    </IconRoot>
  ) : null;
};

Icon.propTypes = {
  name: PropTypes.string,
};

Icon.defaultProps = {
  name: '',
};

export default Icon;
