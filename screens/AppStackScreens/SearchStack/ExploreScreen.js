import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Container,
  Header,
  Text,
  Body,
  Left,
  Icon
} from "native-base";

import styles from "../../../components/styles";

import FeedItemWrapper from "../../../components/FeedItemWrapper";

export class ExploreScreen extends Component {
  render() {
    return <Container>
        <Header style={[styles.header, { backgroundColor: "white" }]}>
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="ios-arrow-back" style={{ color: "#006E8C" }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{ fontWeight: "900", color: "#006E8C" }}>Explore</Text>
          </Body>
        </Header>
        <FeedItemWrapper navigation={this.props.navigation} />
      </Container>;
  }
}

export default ExploreScreen;
