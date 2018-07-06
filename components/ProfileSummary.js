import React, { Component } from "react";
import { Image, ScrollView, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Button, Text, Thumbnail } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from "./styles";
const sly = require("../assets/sly.jpg");
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

export default class ProfileSummary extends Component {
  render() {
    return <View style={stl.grid}>
  <View style={stl.thumb}>
    <Thumbnail large source={sly} />
  </View>
  <View style={stl.sub_grid}>
        <View style={stl.stats}>
      <View>
        <View>
              <Text style={stl.statNum}>1</Text>
        </View>
        <View>
              <Text style={stl.statTxt}>posts</Text>
        </View>
      </View>
      <View>
        <View>
              <Text style={stl.statNum}>1</Text>
        </View>
        <View>
              <Text style={stl.statTxt}>followers</Text>
        </View>
      </View>
      <View>
        <View>
              <Text style={stl.statNum}>1</Text>
        </View>
        <View>
              <Text style={stl.statTxt}>following</Text>
        </View>
      </View>
    </View>
        <View style={stl.button}>
          <Button style={stl.btn} light small onPress={() => this.props.navigation.navigate('EditProfile')}>
            <Text style={stl.btnTxt}>Edit profile</Text>
      </Button>
    </View>
        
  </View>
</View>;
  }
}

const stl = StyleSheet.create({
  grid: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-around",
    alignItems: "flex-start"
  },
  thumb: {
    //flex: 1
    marginLeft: 15
  },
  sub_grid: {
    flexDirection: "column",
    flex: 1
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20
  },
  button: {
    height: 15,
    paddingLeft: 25
  },
  btn: {
    backgroundColor: "#fff",
    width: DEVICE_WIDTH / 2 + 10,
    marginTop: 9
  },
  btnTxt: {
    paddingLeft: 44
  },
  statNum: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  statTxt: {
    // fontWeight: "100"
    fontSize: 15,
    color: 'grey'
  }
});