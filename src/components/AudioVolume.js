import React, { Component } from 'react';
import PropTypes from 'prop-types';

const enhanceWithClickOutside = require('react-click-outside');

class AudioVolume extends Component {
  state = {
    isMousedownOnVolume: false,
  };
  static propTypes = {
    handleVolumeChange: PropTypes.func,
  };
  handleClickOutside() {
    this.setState({ isMousedownOnVolume: false });
  }
  onVolumeChange = evt => {
    if (this.state.isMousedownOnVolume || evt.type === 'click') {
      let percent = evt.offsetX / evt.target.offsetWidth;
      if (percent < 0) return;
      if (percent >= 0.98) {
        percent = 1;
      }
      this.props.handleVolumeChange(percent);
      evt.target.value = percent;
    }
  };
  render() {
    return (
      <progress
        value="0.5"
        min="0"
        max="1"
        onClick={e => this.onVolumeChange(e.nativeEvent)}
        onMouseMove={e => this.onVolumeChange(e.nativeEvent)}
        onMouseDown={() => this.setState({ isMousedownOnVolume: true })}
        onMouseUp={() => this.setState({ isMousedownOnVolume: false })}
      />
    );
  }
}

export default enhanceWithClickOutside(AudioVolume);
