import React from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';

import { AppLoading, Asset, Font, Permissions, Notifications } from "expo";
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
     //loggerMiddleware // neat middleware that logs actions
   )
 );
let persistor = persistStore(store);
// const store = createStore(
//   rootReducer, 
//   applyMiddleware(
//     thunkMiddleware, // lets us dispatch() functions
//     //loggerMiddleware // neat middleware that logs actions
//   )
// );
console.reportErrorsAsExceptions = false;
//  console._errorOriginal = console.error.bind(console);
//  console.error = (error) => { 
//    if(error.match('Error measuring text field:')) console.log(error);
//    else console.warn(error);
//  };

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
      return <Provider store={store}>
          <Root style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="light-content" backgroundColor="#006E8C" />}
            {Platform.OS === "android" && <StatusBar barStyle="light-content" backgroundColor="#006E8C" translucent={true} />}
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
      }),
      //this._registerForPushNotificationsAsync()
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

  _registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    // return fetch(PUSH_ENDPOINT, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     token: {
    //       value: token,
    //     },
    //     user: {
    //       username: 'Brent',
    //     },
    //   }),
    // });
    //await AsyncStorage.setItem("expoPushToken", token);
    console.log('token saved: ', token);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
