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
const onu = require("../../../assets/onu.jpg");
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

export class LikesScreen extends Component {
  render() {
    return <Container>
        <Header style={[styles.header, { backgroundColor: "white" }]} searchBar rounded>
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="md-arrow-back" />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text>Likes</Text>
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
