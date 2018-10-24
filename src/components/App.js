import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import theme from 'src/constants/theme';
import store from 'src/store';
import './App.css';
import AudioContainer from './AudioContainer';

import { Container } from './atoms';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Container>
              <AudioContainer />
            </Container>
          </div>
        </ThemeProvider>
      </Provider>
    );
  }
}
export default App;
