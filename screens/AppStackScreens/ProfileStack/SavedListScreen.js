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

import FeedItemWrapper from "../../../components/FeedItemWrapper";

export class SavedListScreen extends Component {
  render() {
    return <Container>
        <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor="#006E8C">
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="md-arrow-back" size={33} color="#006E8C" />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{ fontWeight: "900", color:"#006E8C" }}>Saved</Text>
          </Body>
        </Header>
        <FeedItemWrapper navigation={this.props.navigation} bookmarkedOnly={true} />
      </Container>;
  }
}

export default SavedListScreen;
