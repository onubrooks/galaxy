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
    return <Container>
      <Header style={[styles.header, {backgroundColor: 'white'}]}>
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="md-arrow-back" size={33} color={styles.primaryColor} />
            </TouchableOpacity>
          </Left>
          <Body>
          <Text style={{ fontWeight: "900", color: styles.primaryColor }}>Song</Text>
          </Body>
        </Header>
        <FeedItemWrapper navigation={this.props.navigation} />
      </Container>;
  }
}

export default SongScreen;
