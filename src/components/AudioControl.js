import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'src/components/atoms/Icon';

const AudioControl = ({
  name,
  isPlaying,
  replaceIcon,
  mx,
  hanldeControlClick
}) => {
  const _name = isPlaying ? replaceIcon : name;
  return <Icon mx={mx} name={_name} hanldeIconClick={hanldeControlClick} />;
};

AudioControl.propTypes = {
  name: PropTypes.string,
  replaceIcon: PropTypes.string,
  isPlaying: PropTypes.bool,
  mx: PropTypes.number,
  hanldeControlClick: PropTypes.func
};

AudioControl.defaultProps = {
  name: '',
  replaceIcon: '',
  isPlaying: false
};

export default AudioControl;
