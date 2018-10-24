import React, { Component } from 'react';
import styled from 'styled-components';
import { throttle } from 'throttle-debounce';
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
  handleSearchThrottled = throttle(500, e => this.handleClick(e));
  handleClick = value => {
    const result = this.search.search(value);
    console.log('caught ', value);
    console.log('caught ', result);
  };

  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.search = new JsSearch.Search('id');
    this.search.addIndex('trackName');
    this.search.addDocuments(nextProps.playlist);
  }

  render() {
    return (
      <SearchInput
        onChange={e => this.handleSearchThrottled(e.target.value)}
        placeholder="Search for actists or tracks"
      />
    );
  }
}
