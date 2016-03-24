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
import Menu from './app/components/Menu.js';
import Signin from './app/containers/container_FBLogin';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
const SideMenu = require('react-native-side-menu');



//creates logger
const logger = createLogger();
// creates store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, promise, logger)
);

class findAR extends Component {

  constructor() {
    super();
  }

  onMenuItemSelected () {
    return '';
  }

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

AppRegistry.registerComponent('findAR', () => findAR);

