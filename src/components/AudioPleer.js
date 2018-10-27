import React, { Component } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

import { Flex, Box } from 'src/components/atoms';
import AudioControl from './AudioControl';

const SongLoading = styled.p`
  position: absolute;
  margin: unset;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  opacity: ${props => (props.loading ? '1' : '0')};
  transition: opacity 300ms;
`;

const TimeBox = styled(Flex)`
  transition: opacity 300ms;
  min-width: 87px;
  opacity: ${props => (props.duration ? '1' : '0')};
`;

export default class AudioPleer extends Component {
  state = {
    songLoading: false,
    songPlaying: false,
    songProgress: 0,
    currentTime: '',
    duration: '',
    isMousedownOnVolume: false,
    intervalId: 0,
  };
  interval = null;
  handleSongLoaded = event => {
    if (!this.state.songLoading) return;
    const duration = this.refs.player.duration;
    this.setState({
      duration: this.calculateTimeValue(duration),
      currentTime: '00:00',
    });
    this.setState({ songLoading: false });
  };
  handleControlClick = name => {
    if (name === 'play') {
      if (this.state.songLoading) return;
      if (!this.refs.player.currentSrc) return;
      this.setState({ songPlaying: true });
      this.refs.player.play();
      let intervalId = setInterval(() => {
        const value = this.refs.player.currentTime / this.refs.player.duration;
        if (this.refs.player.currentTime === this.refs.player.duration) {
          clearInterval(this.state.intervalId);
          return;
        }
        this.setState({
          songProgress: value,
          currentTime: this.calculateTimeValue(this.refs.player.currentTime),
        });
      }, 1000);
      this.setState({ intervalId: intervalId });
    }
    if (name === 'pause') {
      this.setState({ songPlaying: false });
      this.refs.player.pause();
      clearInterval(this.state.intervalId);
    }
  };
  seek = evt => {
    if (this.state.songProgress === 0) return;
    const percent = evt.offsetX / evt.target.offsetWidth;
    const time = percent * this.refs.player.duration;
    this.setState({
      songProgress: percent,
      currentTime: this.calculateTimeValue(time),
    });
    this.refs.player.currentTime = time;
  };
  volumeChange = evt => {
    if (this.state.isMousedownOnVolume || evt.type === 'click') {
      const percent = evt.offsetX / evt.target.offsetWidth;
      const volume = Math.floor(percent * 10) / 10;
      this.refs.player.volume = volume;
      evt.target.value = volume;
    }
  };
  calculateTimeValue = time => {
    let min = Math.floor(time / 60);
    min = min >= 10 ? min : '0' + min;
    let sec = Math.floor(time - min * 60);
    sec = sec >= 10 ? sec : '0' + sec;
    return min + ':' + sec;
  };
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.player).addEventListener(
      'canplaythrough',
      this.handleSongLoaded,
    );
    ReactDOM.findDOMNode(this.refs.progress).addEventListener(
      'click',
      this.seek,
    );
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
    this.refs.player.volume = 0.5;
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.src) return;
    if (nextProps.src.trackScr === this.refs.player.currentSrc) return;
    this.refs.player.pause();
    this.refs.player.setAttribute('src', nextProps.src.trackScr);
    this.setState({
      songLoading: true,
      songPlaying: false,
      currentTime: '00:00',
      songProgress: 0,
    });
    if (this.state.intervalId) clearInterval(this.state.intervalId);
  }
  render() {
    const {
      songLoading,
      songPlaying,
      songProgress,
      currentTime,
      duration,
    } = this.state;
    return (
      <Flex alignItems="center" mb={5}>
        <Flex width="10%">
          <AudioControl
            name="backward"
            hanldeControlClick={this.handleControlClick}
          />
          <AudioControl
            name="play"
            isPlaying={songPlaying}
            replaceIcon="pause"
            mx={2}
            hanldeControlClick={this.handleControlClick}
          />
          <AudioControl
            name="forward"
            hanldeControlClick={this.handleControlClick}
          />
        </Flex>
        <Flex width="70%" alignItems="center">
          <TimeBox duration={duration} mx={2}>
            <Box>{currentTime}</Box>
            <Box>/{duration}</Box>
          </TimeBox>
          <Box width="100%">
            <progress value={songProgress} min="0" max="1" ref="progress" />
            <SongLoading loading={songLoading}>Loading…</SongLoading>
            <audio controls="controls" ref="player" />
          </Box>
        </Flex>
        <Box width="20%" ml={2}>
          <progress ref="volume" value="0.5" min="0" max="1" />
        </Box>
      </Flex>
    );
  }
}
