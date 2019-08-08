import React from "react";
import {
  AsyncStorage,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import {
  Button,
  Form,
  Item,
  Input,
  Text,
  Icon,
  Spinner
} from "native-base";
import Axios from "axios";
var Dimensions = require('Dimensions')
var { width, height } = Dimensions.get('window');
import styles from "../../components/styles";
import { ShowTosFooter } from "../../components/ShowTosFooter";

// redux
import { connect } from "react-redux";
import {
  login
} from "../../actions/actions";

const PUSH_ENDPOINT = "https://api.leedder.com/api/v1.0/auth/signup";

export class SignUpScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      phone: '',
      password: '',
      password_confirm: '',
      loading: false,
      secure: true,
      conf_secure: true
    }
  }
  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{
          flex: 1,
          flexDirection: "column",
          height: 900
        }}
      >
        <ImageBackground
          source={require("../../assets/icons/background.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={styles.pageContainerSignup}>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.leedder}>join leedder</Text>
            </View>
            <View>
              <Form>
                <Item style={styles.item}>
                  <Input
                    style={styles.item}
                    placeholder="Full Name"
                    placeholderTextColor="white"
                    onChangeText={val => this.setState({ fullname: val })}
                    value={this.state.fullname}
                  />
                </Item>
                <Item style={styles.item}>
                  <Input
                    style={styles.item}
                    keyboardType="email-address"
                    placeholder="Email Address"
                    placeholderTextColor="white"
                    onChangeText={val => this.setState({ email: val })}
                    value={this.state.email}
                  />
                </Item>
                <Item style={styles.item}>
                  <Input
                    style={styles.item}
                    placeholder="Username"
                    placeholderTextColor="white"
                    onChangeText={val => this.setState({ username: val })}
                    value={this.state.username}
                  />
                </Item>
                <Item style={styles.item}>
                  <Input
                    style={styles.item}
                    keyboardType="numeric"
                    placeholder="Phone Number"
                    placeholderTextColor="white"
                    onChangeText={val => this.setState({ phone: val })}
                    value={this.state.phone}
                  />
                </Item>
                <Item style={styles.item}>
                  <Input
                    style={styles.item}
                    placeholder="Password"
                    placeholderTextColor="white"
                    onChangeText={val => this.setState({ password: val })}
                    value={this.state.password}
                    secureTextEntry={this.state.secure}
                  />
                  <TouchableOpacity
                    onPressIn={() => {
                      this.setState({ secure: false });
                    }}
                    onPressOut={() => {
                      this.setState({ secure: true });
                    }}
                  >
                    <Icon
                      name={this.state.secure ? "eye-off" : "eye"}
                      style={{ color: "white" }}
                    />
                  </TouchableOpacity>
                </Item>
                <Item style={styles.item}>
                  <Input
                    style={styles.item}
                    placeholder="Confirm Password"
                    placeholderTextColor="white"
                    onChangeText={val =>
                      this.setState({ password_confirm: val })
                    }
                    value={this.state.password_confirm}
                    secureTextEntry={this.state.conf_secure}
                  />
                  <TouchableOpacity
                    onPressIn={() => {
                      this.setState({
                        conf_secure: false
                      });
                    }}
                    onPressOut={() => {
                      this.setState({
                        conf_secure: true
                      });
                    }}
                  >
                    <Icon
                      name={this.state.secure ? "eye-off" : "eye"}
                      style={{ color: "white" }}
                    />
                  </TouchableOpacity>
                </Item>
              </Form>
            </View>

            <View style={{ width: 300, marginTop: 20 }}>
              <Button
                block
                onPress={this._signUpAsync}
                style={styles.submit}
                disabled={this.state.loading}
              >
                {this.state.loading ? (
                  <Spinner
                    color="grey"
                    size={Platform.OS === "ios" ? 1 : 20}
                  />
                ) : (
                  <Text>Sign Up</Text>
                )}
              </Button>
            </View>
            <View style={{ width: 250, marginTop: 60 }}>
              <Text style={styles.forgot} note>
                Already have an account?{" "}
                <Text
                  style={styles.forgotLink}
                  onPress={() => this.props.navigation.navigate("Login")}
                >
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </ImageBackground>
        {/* <ShowTosFooter /> */}
      </ScrollView>
    );
  }

  _signUpAsync = () => {
    if (!this.state.fullname) {
      alert("please enter your fullname...");
      return;
    }
    if (!this.state.email) {
      alert("please enter your email...");
      return;
    }
    if (!this.state.username) {
      alert("please enter your username...");
      return;
    }
    if (!this.state.password) {
      alert('please enter a password...');
      return;
    }
    if (this.state.password != this.state.password_confirm) {
      alert("passwords do not match...");
      return;
    }
    this.setState({ loading: true });
    Axios(PUSH_ENDPOINT, {
      method: "post",
      data: {
        fullname: this.state.fullname,
        email: this.state.email,
        username: this.state.username,
        phone: this.state.phone,
        password: this.state.password
      }
    })
    .then(async (res) => {
      console.log('response ', res.data);
      if (res.data.token) {
        await AsyncStorage.setItem("userToken", "" + res.data.token);
        this.props.login(res.data.data.id);
        this.props.navigation.navigate("App");
      } else {
        alert('Login failed, please try again...');
        this.setState({ loading: false });
      }
      }, (error) => {
        console.log(error);
        alert('Signup error, please try again...');
        this.setState({ loading: false });
      }).catch((error) => {
      console.log(error);
      alert('Sign Up error, please try again...');
      this.setState({ loading: false });
    });

  };
}
const Hr = () => {
  return <View style={{ borderTopWidth: 0.4, width: (width) / 3, marginVertical: 30, marginHorizontal: 10 }}>
    <Text></Text>
  </View>
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);
