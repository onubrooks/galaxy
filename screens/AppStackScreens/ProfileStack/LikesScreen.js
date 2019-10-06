import React, { Component } from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Body,
  Left,
  Right,
  Icon,
  Item,
  Input,
  Text
} from "native-base";

import ImageView from "../../../components/ImageView";
import styles from "../../../components/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

export class LikesScreen extends Component {
  render() {
    return <Container style={styles.container}>
      <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor="#006E8C">
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={33} color="#006E8C" />
            </TouchableOpacity>
          </Left>
          <Body>
          <Text style={{ fontWeight:"900", color: "#006E8C"}}>Likes</Text>
          </Body>
        </Header>
        <Content>
          <ScrollView>
            <ImageView navigation={this.props.navigation} />
          </ScrollView>
        </Content>
      </Container>;
  }
}

export default LikesScreen;
