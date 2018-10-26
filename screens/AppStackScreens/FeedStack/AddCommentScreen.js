import React from "react";
import {
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
  Icon,
  View
} from "native-base";
import styles from "../../../components/styles";

import Comments from "../../../components/Comments";
import { Dimensions } from 'react-native';
import CommentInput from "../../../components/CommentInput";

import { connect } from "react-redux";
import { commentASong, fetchComments } from "../../../actions/actions";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export class AddCommentScreen extends React.Component {
  static navigationOptions = { tabBarVisible: false };
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
  }

  componentDidMount() {
    let songId = this.props.navigation.state.params.song.songId
    this.props.fetchComments(songId);
  }
  addComment(songId, comment) {
    let user = this.props.user;
    this.props.commentASong(songId, comment, user);
  }

  render() {
    let { song } = this.props.navigation.state.params; // passed from the feed page
    let { user, comments = {} } = this.props;
    let commentScreen = this.props.navigation.state.routeName == "AddComment" ? true : false;
    return <Container style={[styles.container, {}]}>
        <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor="#006E8C">
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="md-arrow-back" style={{ color: "#006E8C" }}/>
            </TouchableOpacity>
          </Left>
          <Body>
          <Text style={{ fontWeight: '900', color:"#006E8C"}}>Comments</Text>
          </Body>
        </Header>

        <Content>
          <ScrollView>
            {comments.loading ? <View style={{alignItems: 'center', justifyContent: 'center'}}><Text>Loading...</Text></View> : null}
            <Comments user={user} song={song} comments={comments} />
          </ScrollView>
        </Content>
      <CommentInput user={user} song={song} addComment={this.addComment} commentScreen={commentScreen} multiline={false} />
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
  commentASong,
  fetchComments
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentScreen);