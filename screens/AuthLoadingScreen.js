import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View
} from "react-native";
import {
  Header,
} from "native-base";
import styles from "../components/styles";
// redux
import { connect } from "react-redux";
import {
  login
} from "../actions/actions";

export class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    this.props.login(userToken);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
      <Header style={styles.header} iosBarStyle="dark-content" />
        {/* <Header style={styles.header} iosBarStyle="dark-content" androidStatusBarColor="#006E8C" /> */}
        <ActivityIndicator style={{ marginTop: 20 }} />
      </View>;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
