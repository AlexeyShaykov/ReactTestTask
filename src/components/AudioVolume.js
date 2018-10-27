import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const enhanceWithClickOutside = require('react-click-outside');

class AudioVolume extends Component {
  state = {
    isMousedownOnVolume: false,
  };
  static propTypes = {
    hanldeVolumeChange: PropTypes.func,
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
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.volume).addEventListener('mousedown', () =>
      this.setState({ isMousedownOnVolume: true }),
    );
    ReactDOM.findDOMNode(this.refs.volume).addEventListener('mouseup', () =>
      this.setState({ isMousedownOnVolume: false }),
    );
    ReactDOM.findDOMNode(this.refs.volume).addEventListener(
      'mousemove',
      this.volumeChange,
    );
    ReactDOM.findDOMNode(this.refs.volume).addEventListener(
      'click',
      this.volumeChange,
    );
  }
  render() {
    return <progress ref="volume" value="0.5" min="0" max="1" />;
  }
}

export default enhanceWithClickOutside(AudioVolume);
