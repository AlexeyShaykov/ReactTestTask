import React, { Component } from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import * as JsSearch from 'js-search';

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
  startSearch = debounce(value => {
    const result = this.search.search(value);
    this.props.applayFilter(result);
  }, 300);

  handleClick = e => {
    const { value } = e.target;
    if (!value) {
      this.props.applayFilter([]);
      return;
    }
    this.startSearch(value);
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
