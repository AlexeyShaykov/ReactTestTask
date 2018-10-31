import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadAudioList } from 'src/actions';

import { Box } from 'src/components/atoms';

import Search from './Search';
import AudioList from './AudioList';
import AudioPlayer from './AudioPlayer';

class AudioContainer extends Component {
  static propTypes = {
    //from connect
    playlist: PropTypes.array,
    loading: PropTypes.bool
  };
  state = {
    activeSong: -1,
    filteredPlaylist: [],
    tooglePlayMode: false
  };

  changeActiveSong = value => {
    if (value === this.state.activeSong) {
      this.setState({ tooglePlayMode: true });
      return;
    }
    this.setState({ activeSong: value });
  };
  handleNextPrevAction = control => {
    let activeSong = this.state.activeSong;
    if (!activeSong) return;
    let newActiveSong = 0;
    const { length } = this.props.playlist;
    if (control === 'forward') {
      if (activeSong === length) {
        newActiveSong = 1;
      } else {
        newActiveSong = ++activeSong;
      }
    }
    if (control === 'backward') {
      if (activeSong === 1) {
        newActiveSong = length;
      } else {
        newActiveSong = ++activeSong;
      }
    }
    this.setState({ activeSong: newActiveSong });
  };

  handleSearchResult = value => this.setState({ filteredPlaylist: value });

  returnPlayMode = () => this.setState({ tooglePlayMode: false });

  componentDidMount() {
    if (this.props.playlist.length === 0) this.props.fetchData();
  }

  render() {
    const { loading, playlist } = this.props;
    const { filteredPlaylist, activeSong, tooglePlayMode } = this.state;
    if (loading || playlist.length === 0) {
      return <Box textAlign="center">Loading…</Box>;
    }
    const currentTrack = playlist.find(item => item.id === activeSong);
    const _playlist =
      filteredPlaylist.length === 0
        ? playlist
        : filteredPlaylist.map(filterItem =>
            playlist.find(item => item.id === filterItem.id)
          );
    return (
      <>
        <AudioPlayer
          src={currentTrack}
          changeSong={this.handleNextPrevAction}
          tooglePlayMode={tooglePlayMode}
          returnPlayMode={this.returnPlayMode}
        />
        <Search
          playlist={playlist}
          handleSearchResult={this.handleSearchResult}
        />
        {_playlist[0] ? (
          <AudioList
            playlist={_playlist}
            activeSong={activeSong}
            changeSong={this.changeActiveSong}
          />
        ) : (
          <Box mt={3} textAlign="center">
            No data
          </Box>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    playlist: state.playlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(loadAudioList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioContainer);
