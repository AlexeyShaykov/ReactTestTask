import React, { Component } from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import * as JsSearch from 'js-search';
import PropTypes from 'prop-types';

const SearchInput = styled.input`
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  margin: 0 auto;
  border: solid 1px #ccc;
  border-radius: 10px;
  -webkit-appearance: none;
  outline: none;
`;

export default class Search extends Component {
  search = null;
  value = '';

  static propTypes = {
    handleSearchResult: PropTypes.func
  };

  startSearch = debounce(() => {
    if (!this.value) {
      this.props.handleSearchResult([]);
      return;
    }
    const result = this.search.search(this.value);
    if (result.length === 0) {
      this.props.handleSearchResult([{ id: -1 }]);
      return;
    }
    this.props.handleSearchResult(result);
  }, 100);

  handleClick = e => {
    this.value = e.target.value;
    if (!this.value) {
      this.props.handleSearchResult([]);
      return;
    }
    this.startSearch();
  };

  componentDidMount() {
    this.search = new JsSearch.Search('id');
    this.search.addIndex('trackName');
    this.search.addIndex('artistName');
    this.search.addDocuments(this.props.playlist);
  }

  render() {
    return (
      <SearchInput
        onChange={this.handleClick}
        placeholder="Search for actists or tracks"
      />
    );
  }
}
