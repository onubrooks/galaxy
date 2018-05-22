import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { Thumbnail, Form, Item, Input } from "native-base";

export default class AddCommentMini extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.setModalVisible(false);
  }
  render() {
      return <View style={{ flexDirection:"row" }}>
            <Thumbnail source={this.props.src} />
            <Form>
              <Item regular>
                <Input placeholder='Add a comment...' />
              </Item>
            </Form>
      </View>
}
}