import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import theme from '../constants/theme';
import store from '../store';
import './App.css';

import { Container, Flex, Box } from './atoms';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Container>
              <Flex>
                <Box width="50%">the first</Box>
                <Box width="50%">the second</Box>
              </Flex>
            </Container>
          </div>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
