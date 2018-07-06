import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import { Text } from "native-base";

import { WebBrowser } from "expo";

var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

export class ShowTosFooter extends React.Component {
  showTos = async () => {
    let result = await WebBrowser.openBrowserAsync('http://leedder.com/leedder/tos');
    //this.setState({ result });
  };

  render() {
    return <View style={styles.container}>
      <TouchableOpacity onPress={this.showTos} transparent style={styles.touchable}>
        <Text style={styles.note} note>Leedder Inc. ©2018. All rights reserved</Text>
        <Text style={styles.tos} > Terms of Service</Text>
      </TouchableOpacity>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 90,
    width: width,
    borderTopWidth: 0.4,
    marginBottom: -40
  },
  touchable: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  note: { fontWeight: "bold", marginLeft: 30 },
  tos: { fontWeight: "bold", fontSize: 15 }
});