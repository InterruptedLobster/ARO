import React, { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './app/reducers/rootReducer.js';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import { Router, Scene, Actions as routerActions } from 'react-native-router-flux';
import ARView from './app/containers/container_ARView';
import MapView from './app/containers/container_MapView';
import PinListView from './app/containers/container_PinView';

//creates logger
const logger = createLogger();
// creates store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, promise, logger)
);

const findAR = () => (
  <Provider store={store}>
    <MapView />
  </Provider>
);

AppRegistry.registerComponent('findAR', () => findAR);
