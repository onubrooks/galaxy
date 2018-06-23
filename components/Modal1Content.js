import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";

export default class Modal1Content extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.setModalVisible(false);
  }
  render() {
      return <View style={{ flex: 1, marginHorizontal: 20, backgroundColor:"white", maxHeight: 200, width:"90%", borderRadius:6 }}>
            <View style={{marginLeft: 20}}>
                  <Text onPress={ this.handlePress } style={{marginVertical: 13, fontSize: 17}}>Option One</Text>
                  <Text onPress={this.handlePress} style={{ marginVertical: 13, fontSize: 17 }}>Option Two</Text>
                  <Text onPress={this.handlePress} style={{ marginVertical: 13, fontSize: 17 }}>Option Three</Text>
                  <Text onPress={this.handlePress} style={{ marginVertical: 13, fontSize: 17 }}>Option Four</Text>
            </View>
      </View>
  }
}