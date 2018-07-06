/**
 * this wrapper class for FeedItem componont was created because a recurring pattern of the 
 * functionality provided by all the methods in this class was noticed and had to be abstracted out
 * for code reuse, therefore avoiding repetition of the same functionality across different classes/components
 * example components that use this same functionality include: Feed.js, ExploreScreen.js and Profile.js 
 */

import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import {
  Container,
  Content,
  Text,
  Spinner
} from "native-base";

import FeedItem from "./FeedItem";
import KeyboardAvoidingScrollView from "./KeyboardAvoidingScrollView";
import Modal from "react-native-modal";
import { FeedScreenModalContent } from "./ModalContent";

// redux related imports
import { connect } from "react-redux";
import {
  fetchFeed,
  bookmarkPost,
  unBookmarkPost,
  likePost,
  unLikePost,
  commentPost
} from "../actions/actions";

export class FeedItemWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalVisible: false };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.gotoComments = this.gotoComments.bind(this);
    this.addComment = this.addComment.bind(this);
    //this._scrollToInput = this._scrollToInput.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.toggleBookmark = this.toggleBookmark.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ isModalVisible: visible });
  }
  addComment(post_id, comment) {
    let user_id = this.props.user.id;
    this.props.commentPost(post_id, comment, user_id);
  }
  gotoComments(post) {
    this.props.navigation.navigate("AddComment", {
      post,
      users: this.props.users.byId
    });
  }
  toggleLike(post_id) {
    // bookmark action dispatcher
    let user_id = this.props.user.id;
    if (this.props.feed.byId[post_id].hits.indexOf(user_id) < 0) {
      this.props.likePost(post_id, user_id);
    } else {
      this.props.unLikePost(post_id, user_id);
    }
  }

  toggleBookmark(post_id) {
    // bookmark action dispatcher
    if (this.props.bookmarks.indexOf(post_id) < 0) {
      this.props.bookmarkPost(post_id);
    } else {
      this.props.unBookmarkPost(post_id);
    }
  }

  componentWillMount() {
    if (this.props.navigation.state.routeName == "Feed") {
      this.props.fetchFeed();
    }
  }

  render() {
    let display;
    const { feed = {}, user = {}, bookmarks = [], bookmarkPost, bookmarkedOnly = false } = this.props;
    const postArray = Object.keys(feed.byId).map((post_id, idx) => this.props.feed.byId[post_id]);
    if (this.props.navigation.state.routeName == 'Explore') {
      const idx = this.props.navigation.getParam("idx", 0);
      display = postArray.filter((post, index) => index >= idx);
    } else if (this.props.navigation.state.routeName == "Post") {
      const post_id = this.props.navigation.getParam("post_id", 0);
      display = postArray.filter((post, index) => post.id == post_id);
    } else if(bookmarkedOnly) {
      display = postArray.filter((post, index) => {
        return bookmarks.some((id) => id == post.id )
      });
    }
    else {
      display = postArray;
    }

    return <Container>
      <KeyboardAvoidingScrollView keyboardShouldPersistTaps="always">
        <Content>
          {feed.loading ? <Spinner color="grey" size={20} /> : null}
          {display.map((post, idx) => (
            <FeedItem
              key={idx}
              post={post}
              user={user}
              bookmarks={bookmarks}
              toggleLike={this.toggleLike}
              toggleBookmark={this.toggleBookmark}
              setModalVisible={this.setModalVisible}
              gotoComments={this.gotoComments}
              addComment={this.addComment}
            />
          ))}
          <Spinner color="grey" size={20} />
          <View style={{ height: 150 }} />
        </Content>
      </KeyboardAvoidingScrollView>
      <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState(
        { isModalVisible: false }
      )}>
        <FeedScreenModalContent setModalVisible={this.setModalVisible} />
      </Modal>
    </Container>;
  }
}

const mapStateToProps = (state) => {
  return {
    feed: state.feed,
    user: state.user,
    users: state.users,
    comments: state.comments,
    bookmarks: state.bookmarks
  };
};

const mapDispatchToProps = {
  fetchFeed,
  bookmarkPost,
  unBookmarkPost,
  likePost,
  unLikePost,
  commentPost
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedItemWrapper);
