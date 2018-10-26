import React, { Component } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

const SongLoading = styled.p`
  position: absolute;
  margin: unset;
  left: 20%;
  top: 2%;
  opacity: ${props => (props.loading ? '1' : '0')};
  transition: opacity 300ms;
`;
export default class AudioPleer extends Component {
  state = {
    songLoading: false,
  };
  handleNVFocus = event => {
    this.setState({ songLoading: false });
    this.refs.player.play();
  };
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.player).addEventListener(
      'canplaythrough',
      this.handleNVFocus,
    );
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.src) return;
    this.refs.player.setAttribute('src', nextProps.src.trackScr);
    this.setState({ songLoading: true });
  }
  render() {
    const { src } = this.props;
    const { songLoading } = this.state;
    return (
      <>
        <SongLoading loading={songLoading}>Loading…</SongLoading>
        <audio controls="controls" id="player" ref="player">
          <source src="" />
          <p> Your browser doesn't support the audio tag </p>
        </audio>
      </>
    );
  }
}
