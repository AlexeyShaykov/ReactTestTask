import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadAudioList } from 'src/AC';

import Search from './Search';
import AudioList from './AudioList';

class AudioContainer extends Component {
  static propTypes = {
    //from connect
    playlist: PropTypes.array,
    loading: PropTypes.bool,
  };
  state = {
    activeSong: -1,
    fPlaylist: [],
  };

  componentDidMount() {
    this.props.fetchData();
  }
  changeActiveSong = activeSong => ev => this.setState({ activeSong });

  render() {
    const { loading, playlist, activeSong } = this.props;
    const { fPlaylist } = this.state;
    if (loading && playlist.length === 0) {
      return <p>Loading…</p>;
    }
    return (
      <>
        <Search playlist={playlist} />
        <AudioList
          playlist={
            fPlaylist.length === 0
              ? playlist
              : fPlaylist.map(id => playlist.filter(item => item.id === id))
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
    playlist: state.playlist,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(loadAudioList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AudioContainer);
