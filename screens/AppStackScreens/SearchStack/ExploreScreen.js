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
import Ionicons from "react-native-vector-icons/Ionicons";

import FeedItemWrapper from "../../../components/FeedItemWrapper";

export class ExploreScreen extends Component {
  render() {
    return <Container>
        <Header style={[styles.header]}>
          <Left>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}> 
              <Ionicons style={styles.title} name="md-arrow-back" size={33} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={styles.title}>Explore</Title>
          </Body>
        </Header>
        <FeedItemWrapper navigation={this.props.navigation} />
      </Container>;
  }
}

export default ExploreScreen;
