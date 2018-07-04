import React from "react";
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
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
var {width, height} = Dimensions.get('window');
import { WebBrowser } from "expo";
import styles from "../../components/styles";
import { ShowTocFooter } from "../../components/ShowTocFooter";

export class LoginScreen extends React.Component {
  resetPassword = async () => {
    // for handling auth session, use:
    // WebBrowser.openAuthSessionAsync()
    let result = await WebBrowser.openBrowserAsync('http://leedder.com/web/login/');
    //this.setState({ result });
  };
  
  render() {
    return <View style={{ flex:1,flexDirection:"column", justifyContent: "space-between", alignItems:"center", height:500, backgroundColor: '#fff'}}>
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
              <Input placeholder='Password' secureTextEntry={true} />
              </Item>
            </Form>
          </View>
          
          <View style={{width: 300}}>
          <Button block bordered onPress={this._signInAsync} style={styles.buttonBordered}><Text style={styles.primaryText}>Login</Text></Button>
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
        <ShowTocFooter />
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