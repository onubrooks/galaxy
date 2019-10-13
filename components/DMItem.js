import React from "react";
import {
  StyleSheet,
  View,
  Dimensions
} from "react-native";
import {
  Text,
  Thumbnail
} from "native-base";
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const avatar = require("../assets/avatar.png");

export class DMItem extends React.Component {
  render() {
    return (
      <View style={stl.grid}>
        <View style={stl.col1}>
          <Thumbnail
            style={stl.thumbnail}
            source={this.props.avatar ? { uri: this.props.avatar } : avatar}
          />
        </View>
        <View style={stl.col2}>
          <Text style={stl.col2handle}>{this.props.handle} </Text>
          <Text note>
            {this.props.caption ? this.props.caption : "Tap to chat"}
          </Text>
        </View>
        <View style={stl.col3}>
          <View />
        </View>
      </View>
    );
  }
}

const stl = StyleSheet.create({
  grid: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 50,
    width: DEVICE_WIDTH,
    marginVertical: 20,
    marginHorizontal: 15
  },
  col1: {
    flex: 1,
    width: "25%",
    marginLeft: 6,
    marginRight: 5,
    flexShrink: 0
  },
  col2: {
    width: "40%",
    marginLeft: -20,
    flexShrink: 1
  },
  col3: {
    width: "35%"
  },
  thumbnail: {
    width: DEVICE_WIDTH / 7,
    marginLeft: 5
  },

  col2handle: {
    fontWeight: "900",
    fontSize: 16
  },
  col2main: {
    fontWeight: "100",
    fontSize: 15
  }
});
