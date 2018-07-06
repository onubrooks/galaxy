import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Body,
  Left,
  Right,
  //Icon,
  Text,
  Thumbnail,
  Form,
  Item,
  Input
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../components/styles";

export class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Header style={styles.header} iosBarStyle="dark-content" androidStatusBarColor="black">
          
        </Header>
        <ActivityIndicator style={{marginTop: 20}} />
      </View>
    );
  }
}
