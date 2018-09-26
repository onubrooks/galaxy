import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Keyboard
} from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Item,
  Input,
  Label,
  Text,
  Textarea
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../../components/styles";
import PlaylistPlayer from "../../components/PlaylistPlayer";
const onu = require("../../assets/onu.jpg");
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

export class PlaylistScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header
          style={[styles.header, { backgroundColor: "white" }]}
          androidStatusBarColor="#006E8C"
        >
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Feed")}
            >
              <Icon name="md-close" style={{ color: primaryColor }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={stl.heading}>My Playlist</Text>
          </Body>
        </Header>
        <Content>
          <PlaylistPlayer />
        </Content>
      </Container>
    );
  }
}

export default PlaylistScreen;

const primaryColor = "#006E8C";
const stl = StyleSheet.create({
  grid: {
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 30
    // height: DEVICE_HEIGHT
  },
  albumCover: {}
});
