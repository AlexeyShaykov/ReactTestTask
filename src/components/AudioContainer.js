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
    filteredPlaylist: []
  };

  changeActiveSong = value => {
    if (Number.isInteger(value)) {
      this.setState({ activeSong: value });
      return;
    }
    let activeSong = this.state.activeSong;
    if (!activeSong) return;
    if (value === 'forward') {
      if (activeSong === this.props.playlist.length) return;
      this.setState({ activeSong: ++activeSong });
    }
    if (value === 'backward') {
      if (activeSong === 1) return;
      this.setState({ activeSong: --activeSong });
    }
  };
  applyFilter = value => this.setState({ filteredPlaylist: value });

  componentDidMount() {
    if (this.props.playlist.length === 0) this.props.fetchData();
  }

  render() {
    const { loading, playlist } = this.props;
    const { filteredPlaylist, activeSong } = this.state;
    if (loading || playlist.length === 0) {
      return <Box textAlign="center">Loading…</Box>;
    }
    return (
      <>
        <AudioPlayer
          src={playlist.filter(item => item.id === activeSong)[0]}
          toggleSong={this.changeActiveSong}
        />
        <Search playlist={playlist} applyFilter={this.applyFilter} />
        <AudioList
          playlist={
            filteredPlaylist.length === 0
              ? playlist
              : filteredPlaylist.map(
                  filterItem =>
                    playlist.filter(item => item.id === filterItem.id)[0]
                )
          }
          activeSong={activeSong}
          toggleSong={this.changeActiveSong}
        />
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
