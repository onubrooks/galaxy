import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import { Thumbnail, Item, Button, Text } from "native-base";
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Comments extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let { user } = this.props;
      return <View style={{ flex: 0.9, alignItems: "center", justifyContent: "center", height:height * 80 / 100 }}>
               <Text style={{ fontSize: 30 }}>This is a comments screen!</Text>
              <Button onPress={() => this.props.navigation.goBack()} title="Dismiss" />
          </View>
  }
}