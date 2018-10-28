import React, { Component } from 'react';
import PropTypes from 'prop-types';

const enhanceWithClickOutside = require('react-click-outside');

class AudioVolume extends Component {
  state = {
    isMousedownOnVolume: false
  };
  static propTypes = {
    hanldeVolumeChange: PropTypes.func
  };
  handleClickOutside() {
    this.setState({ isMousedownOnVolume: false });
  }
  volumeChange = evt => {
    if (this.state.isMousedownOnVolume || evt.type === 'click') {
      let percent = evt.offsetX / evt.target.offsetWidth;
      if (percent < 0) return;
      if (percent >= 0.98) {
        percent = 1;
      }
      this.props.hanldeVolumeChange(percent);
      evt.target.value = percent;
    }
  };
  render() {
    return (
      <progress
        value="0.5"
        min="0"
        max="1"
        onClick={e => this.volumeChange(e.nativeEvent)}
        onMouseMove={e => this.volumeChange(e.nativeEvent)}
        onMouseDown={() => this.setState({ isMousedownOnVolume: true })}
        onMouseUp={() => this.setState({ isMousedownOnVolume: false })}
      />
    );
  }
}

export default enhanceWithClickOutside(AudioVolume);
