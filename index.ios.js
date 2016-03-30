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
import FriendList from './app/components/FriendList';
import { Router, Scene, Actions} from 'react-native-router-flux';


//creates logger
const logger = createLogger();

// creates store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, promise, logger)
);

const findAR = () => (
  <Provider store={store}>
    <Router scenes={scenes} />
  </Provider>
);

const scenes = Actions.create(
  <Scene key="root" hideNavBar>
      <Scene initial key="login" component={Signin} />
      <Scene key="view" component={ViewContainer} type="replace" />
      <Scene key="friends" component={FriendList} />
  </Scene>
);

AppRegistry.registerComponent('findAR', () => findAR);
