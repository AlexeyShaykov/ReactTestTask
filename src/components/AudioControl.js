import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from 'src/components/atoms/Icon';

export default class AudioControl extends Component {
  static propTypes = {
    name: PropTypes.string,
    hanldeControlClick: PropTypes.func,
    replaceIcon: PropTypes.string,
    mx: PropTypes.number,
    isPlaying: PropTypes.bool,
  };
  hanldeClick = name => {
    this.props.hanldeControlClick(name);
  };
  render() {
    const { name, isPlaying, replaceIcon, mx } = this.props;
    const _name = isPlaying ? replaceIcon : name;
    return (
      <div onClick={() => this.hanldeClick(_name)}>
        <Icon mx={mx} name={_name} />
      </div>
    );
  }
}
