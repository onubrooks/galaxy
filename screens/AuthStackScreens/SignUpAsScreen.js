import React from "react";
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import {
  Button,
  Text,
  Icon,
  H1,
  Separator
} from "native-base";
var Dimensions = require('Dimensions')
var {width, height} = Dimensions.get('window')
import styles from "../../components/styles";

export class SignUpAsScreen extends React.Component {

  render() {
    const status = "Not Implemented Yet, exercise some patience for once dude!";
    return <View style={{ flex:1,flexDirection:"column", justifyContent: "space-between", alignItems:"center", height:500}}>
        <View style={{flex:1, justifyContent: "center", alignItems:"center", height:height - 90}}>
          <View style={{marginBottom:30, marginTop:0}}>
            <Text style={{fontSize: 50}}>Leedder</Text>
          </View>
          
          <View style={{width: 300}}>
            <Button block onPress={()=>alert(status)}><Text>Continue as Onu Abah</Text></Button>
          </View>
          
          <View style={{ flexDirection:"row", alignItems:"center", width: 300}}>
            <Hr />
              <Text>OR</Text>
            <Hr />
          </View>
          <View style={{width: 300}}>
            <Button block transparent onPress={()=>alert(status)}>
              <Text>Sign up with email</Text>
            </Button>
          </View>
        
        </View>
        <View style={{ left:0, right: 0, bottom: 0,height:90, width: width, borderTopWidth:0.4, marginBottom:-40}}>
          <Button transparent onPress={()=> this.props.navigation.navigate("Login")}>
            <Text style={{fontWeight:"bold", marginLeft:30}} note>Already have an account? <Text style={{fontWeight:"bold"}}> Log in</Text></Text>
          </Button>
        </View>
      </View>
  }
}
 const Hr = () => {
   return <View style={{ borderTopWidth:0.4, width:(width) / 3, marginVertical:30, marginHorizontal:10}}>
          <Text></Text>
        </View>
 }