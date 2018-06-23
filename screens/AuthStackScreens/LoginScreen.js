import React from "react";
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import {
  Button,
  Form,
  Item,
  Input,
  Label,
  Text,
  Icon,
  H1,
  Separator
} from "native-base";
var Dimensions = require('Dimensions')
var {width, height} = Dimensions.get('window')
import styles from "../../components/styles";

export class LoginScreen extends React.Component {
  render() {
    const status = "Not Implemented Yet!";
    return <View style={{ flex:1,flexDirection:"column", justifyContent: "space-between", alignItems:"center", height:500}}>
        <View style={{flex:1, justifyContent: "center", alignItems:"center", height:height - 90}}>
          <View style={{marginBottom:30, marginTop:0}}>
            <H1>Leedder</H1>
          </View>
          <View>
            <Form>
              <Item style={{marginVertical:6, width:300}} regular>
                <Input placeholder='Email or username' />
              </Item>
              <Item style={{marginVertical:6, width:300}} regular>
                <Input placeholder='Password' />
              </Item>
            </Form>
          </View>
          
          <View style={{width: 300}}>
            <Button block bordered onPress={this._signInAsync}><Text>Login</Text></Button>
          </View>
          <View style={{width:250, marginVertical:6}}>
            <Text style={{fontSize:15,textAlign:"center"}} note>Forgot your login details? <Text style={{fontWeight:"bold",fontSize:15}} onPress={()=>alert(status)}>Get help signing in.</Text></Text>
          </View>
          <View style={{ flexDirection:"row", alignItems:"center", width: 300}}>
            <Hr />
              <Text>OR</Text>
            <Hr />
          </View>
          <View style={{width: 300}}>
            <Button iconLeft block onPress={()=>this.props.navigation.navigate("LoginAs")}>
              <Icon name="home" />
              <Text>Login With Facebook</Text>
            </Button>
          </View>
        
        </View>
        <View style={{ left:0, right: 0, bottom: 0,height:90, width: width, borderTopWidth:0.4, marginBottom:-40}}>
          <Button transparent onPress={()=> this.props.navigation.navigate("SignUpAs")}>
            <Text style={{fontWeight:"bold", marginLeft:30}} note>Don't have an account? <Text style={{fontWeight:"bold"}}> Sign Up</Text></Text>
          </Button>
        </View>
      </View>
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("App");
  };
}
 const Hr = () => {
   return <View style={{ borderTopWidth:0.4, width:(width) / 3, marginVertical:30, marginHorizontal:10}}>
          <Text></Text>
        </View>
 }