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

import FeedItemWrapper from "../../../components/FeedItemWrapper";

export class PostScreen extends Component {
  render() {
    return <Container>
        <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor="#006E8C">
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="md-arrow-back" />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{ fontWeight: "900" }}>Post</Text>
          </Body>
        </Header>
        <FeedItemWrapper navigation={this.props.navigation} />
      </Container>;
  }
}

export default PostScreen;
