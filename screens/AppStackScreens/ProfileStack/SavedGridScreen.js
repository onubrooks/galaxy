import React, { Component } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  Container,
  Header,
  Body,
  Left,
  Right,
  Icon,
  Text,
  Spinner
} from "native-base";

import styles from "../../../components/styles";

import ImageView from "../../../components/ImageView";

export class SavedGridScreen extends Component {
  render() {
    return <Container style={styles.container}>
      <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor="#006E8C">
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="md-arrow-back" />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{ fontWeight: "900" }}>Saved</Text>
          </Body>
        </Header>
        <ImageView navigation={this.props.navigation} />
      </Container>;
  }
}

export default SavedGridScreen;