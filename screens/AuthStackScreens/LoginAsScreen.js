import React from "react";
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image
} from "react-native";
import {
  Button,
  Text,
  Icon,
  H1,
} from "native-base";
var Dimensions = require('Dimensions')
var {width, height} = Dimensions.get('window')
import styles from "../../components/styles";
const onu = require("../../assets/onu.jpg");

export class LoginAsScreen extends React.Component {

  render() {
    const status = "Not Implemented Yet, exercise some patience for once dude!";
    return <View style={{ flexDirection:"column", justifyContent: "space-between", alignItems:"center", height:500}}>
        <View style={{marginVertical:50}}>
          <Text style={{fontSize: 50}}>Leedder</Text>
        </View>
        <View>
          <Image
            style={{
              height: 100,
              width: 100,
              borderWidth: 1,
              borderRadius: 75
            }}
            source={onu}
            resizeMode="cover"
          />
        </View>
        <View>
          <Text>onubrooks</Text>
        </View>
        <View style={{width: 300}}>
          <Button block onPress={this._signInAsync}><Text>Login</Text></Button>
        </View>
        <View style={{flex:0.2,width: 300, marginBottom: 150}}>
          <Button transparent block><Text>Remove</Text></Button>
        </View>
        <View style={{flexDirection: "row", left:0, right: 0, bottom:0, marginBottom:-90}}>
          <Button style={{width:width / 2}} bordered onPress={()=> alert(status)}><Text>Switch Accounts</Text></Button>
          <Button style={{width:width / 2}} bordered><Text style={{textAlign:"center", marginLeft:40}} onPress={()=> this.props.navigation.navigate("SignUpAs")}>Sign Up</Text></Button>
        </View>
      </View>
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("App");
  };
}