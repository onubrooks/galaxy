import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Body,
  Left,
  Right,
  //Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Spinner
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import FeedItemWrapper from "../../../components/FeedItemWrapper";

import styles from "../../../components/styles";

export class FeedScreen extends Component {
  scroll;
  render() {
    return <Container style={styles.container}>
        <Header style={styles.header} iosBarStyle="dark-content" androidStatusBarColor="black">
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Add')}>
              <Ionicons style={styles.title} name="ios-camera-outline" size={33} />
            </TouchableOpacity>
          </Left>
          <Body style={{ marginHorizontal: 85 }}>
            <Title style={styles.title}>Leedder</Title>
          </Body>
          <Right>
            <TouchableOpacity>
              <Ionicons style={styles.title} name="ios-send-outline" size={33} />
            </TouchableOpacity>
          </Right>
        </Header>
        <FeedItemWrapper navigation={this.props.navigation} />
      </Container>;
  }
}

export default FeedScreen;