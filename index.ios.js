/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './app/reducers/rootReducer.js';
import ViewContainer from './app/containers/container_viewContainer';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import Signin from './app/containers/container_FBLogin';


//creates logger
const logger = createLogger();
// creates store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, promise, logger)
);

const findAR = () => (
  <Provider store={store}>
    <Signin/>
  </Provider>
);

AppRegistry.registerComponent('findAR', () => findAR);
