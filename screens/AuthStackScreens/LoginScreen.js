import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  View,
  ScrollView,
  Platform,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import {
  Button,
  Form,
  Item,
  Input,
  Text,
  Icon,
  H1,
  Spinner
} from "native-base";

// redux
import { connect } from "react-redux";
import {
  login
} from "../../actions/actions";
var Dimensions = require('Dimensions')
var {width, height} = Dimensions.get('window');
import * as WebBrowser from 'expo-web-browser';
import styles from "../../components/styles";
import { ShowTosFooter } from "../../components/ShowTosFooter";
import Modal from "react-native-modal";
import { EulaModalContent } from "../../components/ModalContent";

const PUSH_ENDPOINT = "https://api.leedder.com/api/v1.0/auth/login";

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    console.log('height', height)
    console.log('width', width)
    this.state = {
      secure: true,
      username: '',
      password: '',
      loading: false,
      showEula: false,
      eulaAgreed: false
    }
  }

  async componentDidMount() {
    let eulaAgreed = await AsyncStorage.getItem("eulaAgreed");
    console.log("eula is ", eulaAgreed);
    // if eulaAgreed is true, dont showEula
    showEula = eulaAgreed ? false : true;
    this.setState({ showEula, eulaAgreed})
  }

  setModalVisible = async (visible) => {
    await AsyncStorage.setItem("eulaAgreed", "true");
    this.setState({ showEula: visible, eulaAgreed: true });
  }

  resetPassword = async () => {
    // for handling auth session, use:
    // WebBrowser.openAuthSessionAsync()
    let result = await WebBrowser.openBrowserAsync('https://leedder.com');
    //this.setState({ result });
  };
  
  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{
          flex: 1,
          flexDirection: "column",
          height: 500
        }}
      >
        <ImageBackground
          source={require("../../assets/icons/background.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={styles.pageContainer}>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.leedder}>leedder</Text>
            </View>
            <View>
              <Form>
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
              </Form>
            </View>

            <View style={{ width: 250, marginVertical: 6 }}>
              <Text style={styles.forgot} note>
                Forgot your password?{" "}
                <Text
                  style={styles.forgotLink}
                  onPress={this.resetPassword}
                >
                  Get help.
                </Text>
              </Text>
            </View>

            <View style={{ width: 300, marginTop: 20 }}>
              <Button
                block
                onPress={this._signInAsync}
                style={styles.submit}
                disabled={this.state.loading}
              >
                {this.state.loading ? (
                  <Spinner
                    color="grey"
                    size={Platform.OS === "ios" ? 1 : 20}
                  />
                ) : (
                  <Text>Login</Text>
                )}
              </Button>
            </View>

            <View style={{ width: 250, marginTop: 120 }}>
              <Text style={styles.forgot} note>
                Don't have an account?{" "}
                <Text style={styles.forgotLink} onPress={this._goToSignUp}>
                  Sign Up
                </Text>
              </Text>
            </View>

            {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 300
            }}
          >
            <Hr />
            <Text>OR</Text>
            <Hr />
          </View> */}
            {/* <View style={{ width: 300 }}>
            <Button
              iconLeft
              block
              onPress={this._goToSignUp}
              style={styles.buttonBlock}
            >
              <Icon name="home" />
              <Text>Join Leedder Today</Text>
            </Button>
          </View> */}
            <Modal
              isVisible={this.state.showEula}
              onBackdropPress={() => this.setState({ showEula: false })}
            >
              <EulaModalContent setModalVisible={this.setModalVisible} />
            </Modal>
          </View>
        </ImageBackground>
        {/* <ShowTosFooter /> */}
      </ScrollView>
    );
  }

  _goToSignUp = () => {
    if (!this.state.eulaAgreed) {
      this.setState({ showEula: true });
      return;
    }
    this.props.navigation.navigate("SignUp");
  }
  _signInAsync = () => {
    if(!this.state.eulaAgreed) {
      this.setState({showEula: true});
      return;
    }
    if(!this.state.username) {
      alert("please enter your username...");
      return;
    }
    if(!this.state.password) {
      alert('please enter your password...');
      return;
    }
    this.setState({loading: true});
    fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
    }).then((response) => response.json()).then( async (data) => { 
      console.log('data', data)
      if (data.token) {
        await AsyncStorage.setItem("userToken", "" + data.token);
        this.props.login(data.data.id);
        this.props.navigation.navigate("App");
      } else {
        alert('Login failed, please try again...');
        this.setState({loading: false});
      }
    }).catch((error) => { 
      console.log(error);
      alert('Login error, please try again...');
      this.setState({loading: false});
    });
    
  };
}
 const Hr = () => {
   return <View style={{ borderTopWidth:0.4, width:(width) / 3, marginVertical:30, marginHorizontal:10}}>
          <Text></Text>
        </View>
 }

 const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);