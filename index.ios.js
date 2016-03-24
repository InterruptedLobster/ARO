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
import Signin from './app/containers/container_FBlogin';
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
    <ViewContainer />
  </Provider>
);

<<<<<<< 3089f3c9d00322163c71b884cc272b2199c7f085
=======
  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} navigator={navigator}/>;
    return (
      <Provider store={store}>

          <ViewContainer >
          </ViewContainer>

      </Provider>
    );
  }
}
>>>>>>> exploring if statement rendering

AppRegistry.registerComponent('findAR', () => findAR);
