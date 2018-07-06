import React from "react";
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Container,
  Header,
  Title,
  Content,
  Body,
  Left
} from "native-base";
import styles from "../../../components/styles";

import Comments from "../../../components/Comments";
import { Dimensions } from 'react-native';
import CommentInput from "../../../components/CommentInput";

import { connect } from "react-redux";
import { commentPost } from "../../../actions/actions";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export class AddCommentScreen extends React.Component {
  static navigationOptions = { tabBarVisible: false };
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
  }

  _logout() {
    AsyncStorage.removeItem("userToken");
    this.props.navigation.navigate("AuthLoading");
  }

  addComment(post_id, comment) {
    let user_id = this.props.user.id;
    this.props.commentPost(post_id, comment, user_id);
  }

  render() {
    let { post, users } = this.props.navigation.state.params; // passed from the feed page
    let { user, comments } = this.props;
    return <Container style={[styles.container, {}]}>
        <Header style={styles.header} iosBarStyle="dark-content" androidStatusBarColor="black">
        <Left style={{ maxWidth: 50 }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons style={styles.title} name="md-arrow-back" size={33} />
          </TouchableOpacity>
          </Left>
          <Body>
            <Title style={styles.title}>Comments</Title>
          </Body>
        </Header>

        <Content>
          <ScrollView>
            <Comments user={user} post={post} users={users} comments={comments.byId} multiline={true} />
          </ScrollView>
        </Content>
      <CommentInput user={user} post={post} addComment={this.addComment} editable={true} autoFocus={false} />
      </Container>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    comments: state.comments
  };
};

const mapDispatchToProps = {
  commentPost
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentScreen);