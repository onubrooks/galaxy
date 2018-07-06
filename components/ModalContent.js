import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

export class FeedScreenModalContent extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.setModalVisible(false);
  }
  render() {
      return <View style={{ marginHorizontal: 20, backgroundColor:"white", width:"90%", borderRadius:6 }}>
            <View style={{marginLeft: 20}}>
                  <Text onPress={ this.handlePress } style={{marginVertical: 13, fontSize: 17}}>Share on Facebook</Text>
                  <Text onPress={this.handlePress} style={{ marginVertical: 13, fontSize: 17 }}>Share on Twitter</Text>
            </View>
      </View>
  }
}

export class ProfileScreenModalContent extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.setModalVisible(false);
  }
  render() {
    return <View style={{ marginHorizontal: 20, backgroundColor: "white", width: "90%", borderRadius: 6 }}>
        <View style={{ marginLeft: 20 }}>
        <Text style={{ marginVertical: 13, fontSize: 17, fontWeight: '900' }}>
            Set a Profile Photo
          </Text>
          <Hr />
        <Text onPress={this.handlePress} style={{ marginVertical: 13, fontSize: 17, fontWeight: '300' }}>
            New Profile Photo
          </Text>
        <Text onPress={this.handlePress} style={{ marginVertical: 13, fontSize: 17, fontWeight: '300' }}>
            Remove Profile Photo
          </Text> 
        </View>
      </View>;
  }
}

const Hr = () => {
  return <View style={{ borderTopWidth: 0.4, width: DEVICE_WIDTH, marginHorizontal: 1 }}>
      <Text />
    </View>;
}