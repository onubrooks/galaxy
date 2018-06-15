import React from "react";
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  KeyboardAvoidingView
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import KeyboardAvoidingScrollView from "../../components/KeyboardAvoidingScrollView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Body,
  Left,
  Right,
  //Icon,
  Text,
  Thumbnail,
  Form,
  Item,
  Input
} from "native-base";
import styles from "../../components/styles";

import Comments from "../../components/Comments";
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export class AddCommentScreen extends React.Component {
  constructor(props) {
    super(props);
    
  }
  
  _logout(){
   AsyncStorage.removeItem("userToken");
   this.props.navigation.navigate("AuthLoading");
  }

  addComment(post_id, comment) {
    this.props.navigation.state.params.addComment(post_id, comment);
  }
  render() {
    let { user, post, comments, users} = this.props.navigation.state.params; // passed from the feed page
    return <Container style={styles.container}>
        <Header style={styles.header} iosBarStyle="dark-content" androidStatusBarColor="black">
          <Left>
            <Ionicons style={styles.title} name="ios-arrow-back" onPress={() => this.props.navigation.goBack()} size={33} />
          </Left>
          <Body style={{ marginHorizontal: 85 }}>
            <Title style={styles.title}>Comments</Title>
          </Body>
        </Header>

        <Content>
        <Comments user={user} post={post} users={users} comments={comments} />
        </Content>
      </Container>;
  }
}