import React from "react";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
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
import { commentASong, commentMusicAsync, fetchComments } from "../../../actions/actions";

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
    //let songId = this.props.navigation.state.params.song.songId
    this.props.fetchComments(this.props.song.songId);
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
    if (this.props.navigation.state.routeName == "AddComment")
      this.props.commentASong(songId, comment, user);
    else
      this.props.commentMusicAsync(songId, comment, user);
  }

  render() {
    // let { song } = this.props.navigation.state.params; // passed from the feed page
    let { song, user, comments = {} } = this.props;
    //let commentScreen = this.props.navigation.state.routeName == "AddComment" ? true : false;
    return <Container style={[{opacity: 0.8, backgroundColor: 'black', marginLeft: 0}]}>
        <Header style={[styles.header, { backgroundColor: "" }]} >
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.handlePress('comments')}>
              <Icon name="md-arrow-back" style={styles.whiteColor} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{ fontWeight: "900", color: 'white', marginLeft: 60, }}>
              Comments
            </Text>
          </Body>
        </Header>

      <ScrollView keyboardShouldPersistTaps="handled" refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} tintColor={styles.primaryColor} title="refreshing" />}>
          <Content style={{ height: height, backgroundColor: '' }}>
            {/* {comments.loading ? <View style={{alignItems: 'center', justifyContent: 'center', marginVertical:10}}><Text>Loading...</Text></View> : null} */}
          {!comments.loading ? <Comments user={user} song={song} comments={comments} navigation={this.props.navigation} /> : null}
          </Content>
        </ScrollView>
      <CommentInput user={user} song={song} addComment={this.addComment} commentScreen={true} multiline={false} />
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
  commentMusicAsync,
  fetchComments
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentScreen);