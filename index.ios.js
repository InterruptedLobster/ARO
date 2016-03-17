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
import ViewContainer from './app/components/ViewContainer.js';
import Menu from './app/components/Menu.js';
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

const Firebase = require('firebase');

class findAR extends Component {
  onMenuItemSelected () {
    return '';
  }
  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} navigator={navigator}/>;
    return (
      <Provider store={store}>
        <SideMenu menu={menu}>
          <ViewContainer>
          </ViewContainer>
        </SideMenu>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('findAR', () => findAR);

