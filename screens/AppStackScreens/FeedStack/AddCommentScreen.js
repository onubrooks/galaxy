import React from "react";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
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
    this.state = { refreshing: props.comments.loading}
    this.addComment = this.addComment.bind(this);
  }

  _onRefresh = () => {
    let songId = this.props.navigation.state.params.song.songId
    this.props.fetchComments(songId);
  }
  componentDidMount() {
    this._onRefresh();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.comments.loading !== this.props.comments.loading) {
      //Perform some operation here
      this.setState({ refreshing: this.props.comments.loading });
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.comments.loading !== prevState.refreshing) {
      return { refreshing: nextProps.comments.loading };
    } else return null;
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
              <Icon name="md-arrow-back" style={{ color: "#006E8C" }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{ fontWeight: "900", color: "#006E8C" }}>
              Comments
            </Text>
          </Body>
        </Header>

        <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} tintColor={"#006E8C"} title="refreshing" />}>
          <Content style={{ height: height }}>
            {/* {comments.loading ? <View style={{alignItems: 'center', justifyContent: 'center', marginVertical:10}}><Text>Loading...</Text></View> : null} */}
            {!comments.loading ? <Comments user={user} song={song} comments={comments} /> : null}
          </Content>
        </ScrollView>
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