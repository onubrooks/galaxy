import React, { Component } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
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
  Text,
  Spinner
} from "native-base";

import styles from "../../../components/styles";

import FeedItemWrapper from "../../../components/FeedItemWrapper";

export class SavedListScreen extends Component {
  render() {
    return <Container>
      <Header style={[styles.header, { backgroundColor: "white" }]}>
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="md-arrow-back" />
            </TouchableOpacity>
          </Left>
          <Body>
          <Text style={{ fontWeight: '900' }}>Saved</Text>
          </Body>
        </Header>
        <FeedItemWrapper navigation={this.props.navigation} bookmarkedOnly={true} />
      </Container>;
  }
}

export default SavedListScreen;
