import React, { Component } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  Container,
  Header,
  Body,
  Left,
  Text
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../../../components/styles";

import ImageView from "../../../components/ImageView";

export class SavedGridScreen extends Component {
  render() {
    return <Container style={styles.container}>
      <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor="#764BA2">
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={33} color={styles.headerColor} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{ fontWeight: "900", color: styles.headerColor }}>Saved</Text>
          </Body>
        </Header>
        <ImageView navigation={this.props.navigation} />
      </Container>;
  }
}

export default SavedGridScreen;
