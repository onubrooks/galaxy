import React from "react";
import {
  AsyncStorage,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Form,
  Item,
  Input,
  Text,
  H1,
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

const PUSH_ENDPOINT = "http://api.leedder.com/api/signup";

export class SignUpScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      phone: '',
      password: '',
      password_confirm: '',
      loading: false
    }
  }
  render() {
    return <ScrollView style={{ flex: 1, flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: 500, backgroundColor: "#fff" }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: height - 90 }}>
          <View style={{ marginBottom: 20, marginTop: 0 }}>
            <H1>Leedder</H1>
          </View>
          <View>
            <Form>
              <Item style={{ marginVertical: 6, width: 300 }} regular>
              <Input placeholder="Enter your full name" onChangeText={(val) => this.setState({ fullname: val })} value={this.state.fullname} />
              </Item>
              <Item style={{ marginVertical: 6, width: 300 }} regular>
              <Input keyboardType='email-address' placeholder="Enter your email" onChangeText={(val) => this.setState({ email: val })} value={this.state.email} />
              </Item>
              <Item style={{ marginVertical: 6, width: 300 }} regular>
                <Input placeholder="Choose a username" onChangeText={(val) => this.setState({username: val})} value={this.state.username} />
              </Item>
              <Item style={{ marginVertical: 6, width: 300 }} regular>
                <Input keyboardType='numeric' placeholder="Enter your phone number" onChangeText={(val) => this.setState({phone: val})} value={this.state.phone} />
              </Item>
              <Item style={{ marginVertical: 6, width: 300 }} regular>
              <Input placeholder="Password" secureTextEntry={true} onChangeText={(val) => this.setState({ password: val })} value={this.state.password} />
              </Item>
              <Item style={{ marginVertical: 6, width: 300 }} regular>
              <Input placeholder="Confirm password" secureTextEntry={true} onChangeText={(val) => this.setState({ password_confirm: val })} value={this.state.password_confirm} />
              </Item>
            </Form>
          </View>

          <View style={{ width: 300 }}>
            <Button block bordered onPress={this._signUpAsync} style={styles.buttonBordered} disabled={this.state.loading}>
              {this.state.loading ? <Spinner color="grey" size={20} /> : <Text
                  style={styles.primaryText}
                >
                  Sign Up
                </Text>}
            </Button>
          </View>
          <View style={{ width: 250, marginVertical: 6 }}>
            <Text style={{ fontSize: 15, textAlign: "center" }} note>
              Already have an account? <Text style={{ fontWeight: "bold", fontSize: 15 }} onPress={() => this.props.navigation.navigate("Login")}>
                Login.
              </Text>
            </Text>
          </View>
        </View>
        <ShowTosFooter />
      </ScrollView>;
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
      if (res.data.authId) {
        await AsyncStorage.setItem("userToken", "" + data.authId);
        this.props.login(data.authId);
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
