import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Title,
  Body,
  Left,
  Right,
  Text
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import FeedItemWrapper from "../../../components/FeedItemWrapper";

import styles from "../../../components/styles";

export class FeedScreen extends Component {
  render() {
    return <Container style={styles.container}>
      <Header style={styles.header} >
          {/* <Left>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Playlist')}>
              <Ionicons name="ios-musical-notes" size={30} />
            </TouchableOpacity>
          </Left> */}
          <Body style={{ marginHorizontal: 110 }}>
            <Text style={styles.title}>leedder</Text>
          </Body>
          {/* <Right>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('DMList')}>
              <Ionicons style={styles.title} name="ios-send-outline" size={33} />
            </TouchableOpacity>
          </Right> */}
        </Header>
        <FeedItemWrapper navigation={this.props.navigation} />
      </Container>;
  }
}

export default FeedScreen;