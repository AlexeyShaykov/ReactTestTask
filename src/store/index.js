import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';

import * as reducers from '../reducers';

const reducer = combineReducers(reducers);

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
