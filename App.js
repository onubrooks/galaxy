import React from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import { Root } from "native-base";

import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { fetchFeed } from './actions/actions'

import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

import rootReducer from "./reducers/reducers";
import { initialFeed } from "./reducers/dummyData";
 

const client = axios.create({
  baseURL: 'https://api.github.com',
  responseType: 'json'
});
const loggerMiddleware = createLogger();

const initialState = {
      posts: [],
      feed: initialFeed,
      comments: [],
      likes: [],
      bookmarks: [],
      selected_tab: {
            tab: 1,
            modal:false
      },
      user: null,
      getProfile: null
}
const store = createStore(
  rootReducer, 
  applyMiddleware(
    axiosMiddleware(client),
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);
console.reportErrorsAsExceptions = false;
console._errorOriginal = console.error.bind(console);
console.error = () => { };

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <Provider store={store}>
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
          />
        </Provider>
      );
    } else {
      return <Provider store={store}>
          <Root style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="light-content" backgroundColor="#006E8C" />}
            {Platform.OS === "android" && <StatusBar barStyle="light-content" backgroundColor="#006E8C" />}
            <RootNavigation />
          </Root>
        </Provider>;
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        //"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
