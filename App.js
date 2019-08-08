import React from 'react';
import { Platform, StatusBar, StyleSheet, NetInfo } from 'react-native';
import { Toast } from "native-base";

import { AppLoading } from "expo";
import { Asset } from 'expo-asset';
import * as Font from "expo-font";
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';

import { Root } from "native-base";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from "./reducers/reducers";

import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["feed", "user"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


const loggerMiddleware = createLogger();

const store = createStore(
  persistedReducer, 
   applyMiddleware(
     thunkMiddleware, // lets us dispatch() functions
     loggerMiddleware // neat middleware that logs actions
   )
 );
let persistor = persistStore(store);

console.reportErrorsAsExceptions = false;

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
          />
      );
    } else {
      return (
        <Provider store={store}>
          <Root style={styles.container}>
            {Platform.OS === "ios" && (
              <StatusBar
                barStyle="light-content"
                backgroundColor="#764BA2"
              />
            )}
            {Platform.OS === "android" && (
              <StatusBar
                barStyle="light-content"
                backgroundColor="#764BA2"
                translucent={true}
              />
            )}
            <RootNavigation />
          </Root>
        </Provider>
      );
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
        "Segoe Print": require("./assets/fonts/Segoe-Print.ttf"),
        segoeprb: require("./assets/fonts/segoeprb.ttf"),
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        // Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
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
    this._registerNetworkNotification();
    this.setState({ isLoadingComplete: true });
  };

  _registerNetworkNotification = () => {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    });

    NetInfo.addEventListener(
      'connectionChange',
      this._handleConnectivityChange
    );
  }

  _handleConnectivityChange = (connectionInfo) => {
    console.log('Network Connectivity Change, Type: ' + connectionInfo.type + ', EffectiveType: ' + connectionInfo.effectiveType);
    let msg = connectionInfo.type == "none" || connectionInfo.type == "unknown" ? 'You are now offline' : 'Internet connection restored';
    Toast.show({
      text: msg,
      position: "bottom",
      duration: 2000
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#764BA2"
  }
});
