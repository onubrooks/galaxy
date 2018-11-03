import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  View,
  ScrollView,
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
import { WebBrowser } from "expo";
import styles from "../../components/styles";
import { ShowTosFooter } from "../../components/ShowTosFooter";

const PUSH_ENDPOINT = "http://api.leedder.com/api/login";

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      loading: false
    }
  }
  resetPassword = async () => {
    // for handling auth session, use:
    // WebBrowser.openAuthSessionAsync()
    let result = await WebBrowser.openBrowserAsync('http://leedder.com/web/login/');
    //this.setState({ result });
  };
  
  render() {
    return <ScrollView keyboardShouldPersistTaps="always" style={{ flex:1,flexDirection:"column", height:500, backgroundColor: '#fff'}}>
      
        <View style={{flex:1, justifyContent: "center", alignItems:"center", height:height}}>
          <View style={{marginBottom:30, marginTop:0}}>
            <H1>Leedder</H1>
          </View>
          <View>
            <Form>
              <Item style={{marginVertical:6, width:300}} regular>
                <Input placeholder='Email or username' onChangeText={(val) => this.setState({username: val})} value={this.state.username} />
              </Item>
              <Item style={{marginVertical:6, width:300}} regular>
              <Input placeholder='Password' onChangeText={(val) => this.setState({ password: val })} value={this.state.password} secureTextEntry={true} />
              </Item>
            </Form>
          </View>
          
          <View style={{width: 300}}>
          <Button block bordered onPress={this._signInAsync} style={styles.buttonBordered} disabled={this.state.loading}>{this.state.loading ? <Spinner color="grey" size={20} /> : <Text style={styles.primaryText}>Login</Text>}</Button>
          </View>
          <View style={{width:250, marginVertical:6}}>  
            <Text style={{ fontSize: 15, textAlign: "center" }} note>Forgot your login details? <Text style={{ fontWeight: "bold", fontSize: 15 }} onPress={this.resetPassword}>Get help signing in.</Text></Text>
          </View>
          <View style={{ flexDirection:"row", alignItems:"center", width: 300}}>
            <Hr />
              <Text>OR</Text>
            <Hr />
          </View>
          <View style={{width: 300}}>
          <Button iconLeft block onPress={() => this.props.navigation.navigate("SignUp")} style={styles.buttonBlock}>
              <Icon name="home" />
              <Text>Join Leedder Today</Text>
            </Button>
          </View>
        
        </View>
        <ShowTosFooter />
      </ScrollView>
  }

  _signInAsync = () => {
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
      console.log(data);
      if (data.authId) {
        await AsyncStorage.setItem("userToken", "" + data.authId);
        this.props.login(data.authId);
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