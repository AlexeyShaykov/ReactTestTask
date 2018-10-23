import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadAudioList } from 'src/AC';
import { Flex, Box } from './atoms';

class AudioList extends Component {
  componentDidMount() {
    console.log('start App loading');
    this.props.fetchData();
  }

  render() {
    const { loading, playlist } = this.props;
    if (loading && playlist.length === 0) {
      return <p>Loading…</p>;
    }
    return (
      <div>
        {playlist.map(item => (
          <Flex key={item.id}>
            <Box width="50%" py={2} textAlign="left">
              {item.trackName}
            </Box>
            <Box width="50%" py={2} textAlign="right">
              {item.time}
            </Box>
          </Flex>
        ))}
      </div>
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
)(AudioList);
