import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadAudioList } from 'src/AC';

import Search from './Search';
import AudioList from './AudioList';
import AudioPleer from './AudioPleer';

class AudioContainer extends Component {
  static propTypes = {
    //from connect
    playlist: PropTypes.array,
    loading: PropTypes.bool,
  };
  state = {
    activeSong: -1,
    filteredPlaylist: [],
  };

  componentDidMount() {
    this.props.fetchData();
  }
  changeActiveSong = activeSong => ev => this.setState({ activeSong });
  applayFilter = value => this.setState({ filteredPlaylist: value });

  render() {
    const { loading, playlist } = this.props;
    const { filteredPlaylist, activeSong } = this.state;
    if (loading || playlist.length === 0) {
      return <p>Loading…</p>;
    }
    return (
      <>
        <AudioPleer src={playlist.filter(item => item.id === activeSong)[0]} />
        <Search playlist={playlist} applayFilter={this.applayFilter} />
        <AudioList
          playlist={
            filteredPlaylist.length === 0
              ? playlist
              : filteredPlaylist.map(
                  filterItem =>
                    playlist.filter(item => item.id === filterItem.id)[0],
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
