import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import { Flex, Box } from './atoms';

const PlaylistContainer = styled(Box)`
  border: 1px solid #ccc;
  border-radius: 20px;
`;
const Song = styled(Box)`
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  :last-child {
    border-bottom: none;
  }
`;

const SongWrap = styled(Flex)`
  border-radius: 20px;
  padding: 1px 24px 1px 8px;
  ${props =>
    props.active &&
    css`
      background-color: #ccc;
    `};
  :hover {
    cursor: pointer;
    background-color: #ccc;
  }
`;

class AudioList extends Component {
  handleClick = id => this.props.toggleSong(id);
  render() {
    const { playlist, activeSong } = this.props;
    return (
      <PlaylistContainer px={0} py={0} mt={5}>
        {playlist.map((item, index) => (
          <Song key={index} py="2px" px={2} onClick={this.handleClick(item.id)}>
            <SongWrap active={item.id === activeSong}>
              <Box width="50%" textAlign="left">
                {item.artistName} - {item.trackName}
              </Box>
              <Box width="50%" textAlign="right">
                {item.time}
              </Box>
            </SongWrap>
          </Song>
        ))}
      </PlaylistContainer>
    );
  }
}

export default AudioList;
