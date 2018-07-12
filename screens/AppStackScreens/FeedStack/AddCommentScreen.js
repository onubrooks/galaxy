import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Text,
  Content,
  Body,
  Left,
  Icon
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

  addComment(post_id, comment) {
    let user_id = this.props.user.username;
    this.props.commentPost(post_id, comment, user_id);
  }

  render() {
    let { post, users } = this.props.navigation.state.params; // passed from the feed page
    let { user, comments } = this.props;
    let commentScreen = this.props.navigation.state.routeName == "AddComment" ? true : false;
    return <Container style={[styles.container, {}]}>
        <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor="#006E8C">
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="md-arrow-back" />
            </TouchableOpacity>
          </Left>
          <Body>
          <Text style={{fontWeight: '900',}}>Comments</Text>
          </Body>
        </Header>

        <Content>
          <ScrollView>
            <Comments user={user} post={post} users={users} comments={comments.byId} />
          </ScrollView>
        </Content>
      <CommentInput user={user} post={post} addComment={this.addComment} editable={true} commentScreen={commentScreen} multiline={false} />
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