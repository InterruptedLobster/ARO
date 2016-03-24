import React, { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './app/reducers/rootReducer';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import { Router, Scene, Actions as routerActions } from 'react-native-router-flux';
import ARView from './app/screens/ARViewContainer';
import MapView from './app/screens/MapViewContainer';
import PinListView from './app/screens/PinListViewContainer';

//creates logger
const logger = createLogger();
// creates store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, promise, logger)
);

const scenes = routerActions.create(
  <Scene key="root" hideNavBar>
    <Scene key="ar" component={ARView} />
    <Scene initial key="map" component={MapView} />
    <Scene key="list" component={PinListView} />
  </Scene>
);

const findAR = () => (
  <Provider store={store}>
    <Router scenes={scenes} />
  </Provider>
);

AppRegistry.registerComponent('findAR', () => findAR);
