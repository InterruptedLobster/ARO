import React, { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './app/reducers/rootReducer.js';
import SmartMapView from './app/containers/container_MapView';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';


//creates logger
const logger = createLogger();
// creates store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, promise, logger)
);

const findAR = () => (
  <Provider store={store}>
    <SmartMapView />
  </Provider>
);

AppRegistry.registerComponent('findAR', () => findAR);
