import React, { Component } from "react";
import { Image, View, KeyboardAvoidingView } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Body,
  Left,
  Right,
  //Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Spinner
} from "native-base";
import Modal from "react-native-modal";
import Modal1Content from "../../components/Modal1Content";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/EvilIcons";
import FeedItem from "../../components/FeedItem";
import KeyboardAvoidingScrollView from "../../components/KeyboardAvoidingScrollView";

import { connect } from 'react-redux';

// get feed action to trigger fetching of feed
import { fetchFeed, bookmarkPost, unBookmarkPost, likePost, unLikePost, commentPost } from '../../actions/actions';

import styles from "../../components/styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export class Feed extends Component {
         scroll;
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
             user: this.props.user,
             post,
             users: this.props.users.byId,
             comments: this.props.comments.byId,
             addComment: this.addComment
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

         componentDidMount() {
           this.props.fetchFeed();
         }

         render() {
           const { feed = [], user = {}, bookmarks = [], bookmarkPost } = this.props;
           // console.log(feed);
           return <Container style={styles.container}>
               <Header style={styles.header} iosBarStyle="dark-content" androidStatusBarColor="black">
                 <Left>
                   <Ionicons style={styles.title} name="ios-camera-outline" size={33} />
                 </Left>
                 <Body style={{ marginHorizontal: 85 }}>
                   <Title style={styles.title}>Leedder</Title>
                 </Body>
                 <Right>
                   <Ionicons style={styles.title} name="ios-send-outline" size={33} />
                 </Right>
               </Header>
               <KeyboardAvoidingScrollView>
                 <Content>
                 {feed.loading ? <Spinner color="grey" size={20} /> : null}
                   {Object.keys(feed.byId).map((post, idx) => (
                     <FeedItem
                       key={idx}
                       post={feed.byId[post]}
                       user={user}
                       bookmarks={bookmarks}
                       toggleLike={this.toggleLike}
                       toggleBookmark={this.toggleBookmark}
                       setModalVisible={this.setModalVisible}
                       gotoComments={this.gotoComments}
                       addComment={this.addComment}
                       _scrollToInput={this._scrollToInput}
                     />
                   ))}
                 <Spinner onLayout={event => {
                   const layout = event.nativeEvent.layout;
                   console.log('height:', layout.height);
                   console.log('width:', layout.width);
                   console.log('x:', layout.x);
                   console.log('y:', layout.y);
                 }} color="grey" size={20} />
                 <View style={{ height: 150 }} />
                 </Content>
               </KeyboardAvoidingScrollView>
               <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState(
                     { isModalVisible: false }
                   )}>
                 <Modal1Content setModalVisible={this.setModalVisible} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Feed);