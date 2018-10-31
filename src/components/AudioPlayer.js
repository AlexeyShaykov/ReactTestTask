import React, { Component } from 'react';
import styled from 'styled-components';

import { Flex, Box } from 'src/components/atoms';

import AudioControl from './AudioControl';
import AudioVolume from './AudioVolume';

const SongLoadingNotation = styled(Box)`
  position: absolute;
  margin: unset;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  opacity: ${props => (props.loading ? '1' : '0')};
  transition: opacity 300ms;
  pointer-events: none;
`;

const TimeBox = styled(Flex)`
  transition: opacity 300ms;
  min-width: 87px;
  opacity: ${props => (props.duration ? '1' : '0')};
`;

export default class AudioPlayer extends Component {
  state = {
    isSongLoading: false,
    isSongPlaying: false,
    songProgress: 0,
    currentTime: '',
    duration: '',
  };
  interval = null;
  playerRef = React.createRef();

  handleSongLoaded = () => {
    if (!this.state.isSongLoading) return;
    const duration = this.player.duration;
    this.setState({
      duration: this.calculateTimeValue(duration),
    });
    this.setState({ isSongLoading: false });
    this.handleControlClick('play');
  };
  handleControlClick = name => {
    if (name === 'play') {
      if (this.state.isSongLoading) return;
      if (!this.player.currentSrc) return;
      this.setState({
        isSongPlaying: true,
      });
      this.player.play();
      this.intervalId = setInterval(() => {
        const currentTime = this.player.currentTime;
        const duration = this.player.duration;
        const songProgress = currentTime / duration;
        if (currentTime === duration) {
          clearInterval(this.intervalId);
          this.setState({
            isSongPlaying: false,
            currentTime: '00:00',
            songProgress: 0,
          });
          return;
        }
        this.setState({
          songProgress,
          currentTime: this.calculateTimeValue(currentTime),
        });
      }, 1000);
    }
    if (name === 'pause') {
      this.setState({ isSongPlaying: false });
      this.player.pause();
      clearInterval(this.intervalId);
    }
  };
  seek = evt => {
    if (this.state.songProgress === 0) return;
    const songProgress = evt.offsetX / evt.target.offsetWidth;
    const time = songProgress * this.player.duration;
    this.setState({
      songProgress,
      currentTime: this.calculateTimeValue(time),
    });
    this.player.currentTime = time;
  };
  calculateTimeValue = time => {
    let min = Math.floor(time / 60);
    min = min >= 10 ? min : '0' + min;
    let sec = Math.floor(time - min * 60);
    sec = sec >= 10 ? sec : '0' + sec;
    return min + ':' + sec;
  };
  componentDidUpdate() {
    const { src, tooglePlayMode } = this.props;
    if (!src) return;
    if (this.state.isSongLoading) return;
    if (src.trackScr === this.player.currentSrc && !tooglePlayMode) return;
    if (src.trackScr === this.player.currentSrc && tooglePlayMode) {
      if (this.state.isSongPlaying) {
        this.handleControlClick('pause');
      } else {
        this.handleControlClick('play');
      }
      this.props.returnPlayMode();
      return;
    }
    if (this.intervalId) clearInterval(this.intervalId);
    this.player.pause();
    this.player.setAttribute('src', src.trackScr);
    this.setState({
      isSongLoading: true,
      isSongPlaying: false,
      currentTime: '00:00',
      songProgress: 0,
    });
  }
  componentDidMount() {
    this.player = this.playerRef.current;
    this.player.addEventListener('canplaythrough', this.handleSongLoaded);
    this.player.volume = 0.5;
  }
  componentWillUnmount() {
    this.player.removeEventListener('canplaythrough', this.handleSongLoaded);
    clearInterval(this.intervalId);
  }
  render() {
    const {
      isSongLoading,
      isSongPlaying,
      songProgress,
      currentTime,
      duration,
    } = this.state;
    const { toggleSong } = this.props;
    return (
      <Flex alignItems="center" mb={5} flexWrap={['wrap', 'nowrap']}>
        <Flex
          width={['100%', '10%']}
          order={[1, 0]}
          justifyContent="center"
          mt={[2, 0]}
        >
          <AudioControl icon="backward" onClick={toggleSong} />
          <AudioControl
            icon={isSongPlaying ? 'pause' : 'play'}
            mx={2}
            onClick={this.handleControlClick}
          />
          <AudioControl icon="forward" onClick={toggleSong} />
        </Flex>
        <Flex width="70%" alignItems="center">
          <TimeBox duration={duration} mx={2}>
            <Box>{currentTime}</Box>
            <Box>/{duration}</Box>
          </TimeBox>
          <Box width="100%">
            <progress
              value={songProgress}
              min="0"
              max="1"
              onClick={e => this.seek(e.nativeEvent)}
            />
            <SongLoadingNotation loading={isSongLoading}>
              Loading…
            </SongLoadingNotation>
            <audio controls="controls" ref={this.playerRef} />
          </Box>
        </Flex>
        <Box width="20%" ml={2}>
          <AudioVolume
            handleVolumeChange={value => (this.player.volume = value)}
          />
        </Box>
      </Flex>
    );
  }
}
