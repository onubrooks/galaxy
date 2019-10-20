import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Body,
  Left,
  Right,
  Text,
  Icon
} from "native-base";
import FeedItemWrapper from "../../../components/FeedItemWrapper";

import styles from "../../../components/styles";

export class FeedScreen extends Component {
  render() {
    return <Container style={styles.container}>
      <Header style={styles.header} >
          
          <Body style={{ marginLeft: 120 }}>
            <Text style={styles.title}>leedder</Text>
          </Body>
          {/* <Right>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('DMList')}>
              <Icon style={styles.title} name="ios-send" size={33} />
            </TouchableOpacity>
          </Right> */}
        </Header>
        <FeedItemWrapper navigation={this.props.navigation} />
      </Container>;
  }
}

export default FeedScreen;