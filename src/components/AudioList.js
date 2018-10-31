import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

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
const AudioList = ({ playlist, activeSong, changeSong }) => {
  return (
    <PlaylistContainer px={0} py={0} mt={5}>
      {playlist.map((item, index) => (
        <Song key={index} py="2px" px={2} onClick={() => changeSong(item.id)}>
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
};

AudioList.propTypes = {
  playlist: PropTypes.array,
  activeSong: PropTypes.number,
  toggleSong: PropTypes.func
};

AudioList.defaultProps = {
  playlist: [],
  activeSong: -1
};

export default AudioList;
