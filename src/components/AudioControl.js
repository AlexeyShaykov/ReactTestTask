import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'src/components/atoms/Icon';

const AudioControl = ({ icon, mx, onClick }) => {
  return <Icon mx={mx} name={icon} onClick={onClick} />;
};

AudioControl.propTypes = {
  name: PropTypes.string,
  replaceIcon: PropTypes.string,
  isPlaying: PropTypes.bool,
  mx: PropTypes.number,
  hanldeControlClick: PropTypes.func,
};

AudioControl.defaultProps = {
  name: '',
  replaceIcon: '',
  isPlaying: false,
};

export default AudioControl;
