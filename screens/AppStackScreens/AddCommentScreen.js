import React from "react";
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  View
} from "react-native";

export class AddCommentScreen extends React.Component {
  _logout(){
   AsyncStorage.removeItem("userToken");
   this.props.navigation.navigate("AuthLoading");
  }
  render() {
    return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30 }}>This is a comments screen!</Text>
        <Button onPress={() => this.props.navigation.goBack()} title="Dismiss" />
      </View>;
  }
}