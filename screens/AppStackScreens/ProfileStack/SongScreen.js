import React, { Component } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  Container,
  Header,
  Title,
  Body,
  Left,
  Text
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../../../components/styles";

import FeedItemWrapper from "../../../components/FeedItemWrapper";

export class SongScreen extends Component {
  render() {
    return (
      <Container>
        <Header
          style={[styles.header, { backgroundColor: "white", height: 45 }]}
        >
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
            >
              <Ionicons name="ios-arrow-back" size={26} color={styles.headerColor} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{ fontWeight: "900", color: styles.headerColor }}>
              Song
            </Text>
          </Body>
        </Header>
        <FeedItemWrapper navigation={this.props.navigation} />
      </Container>
    );
  }
}

export default SongScreen;
