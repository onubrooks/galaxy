import React, { Component } from "react";
import { Image, ScrollView, View } from "react-native";
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Title,
  List,
  ListItem,
  Content,
  Button,
  Body,
  Left,
  Right,
  Icon,
  ScrollableTab,
  Text,
  Thumbnail,
  Spinner
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Col, Row, Grid } from "react-native-easy-grid";
import ImageView from "../../components/ImageView";
import FeedItem from "../../components/FeedItem";
import KeyboardAvoidingScrollView from "../../components/KeyboardAvoidingScrollView";
import Modal from "react-native-modal";
import Modal1Content from "../../components/Modal1Content";

// redux related imports
import { connect } from "react-redux";
import {
  fetchFeed,
  bookmarkPost,
  unBookmarkPost,
  likePost,
  unLikePost,
  commentPost
} from "../../actions/actions";

import styles from "../../components/styles";
const sly = require("../../assets/sly.jpg");

export class Profile extends Component {
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
    //console.log(this.props);
  }
         render() {
           const { feed = {}, user = {}, bookmarks = [], bookmarkPost } = this.props;
           return <Container style={{ backgroundColor: "white" }}>
               <Header style={{ marginTop: 30 }} backgroundColor="white">
                 <Left>
                   <Title style={{ color: "black" }}>
                     Onubrooks
                   </Title>
                 </Left>

                 <Right>
                   <Button transparent>
                     <Ionicons name="md-more" size={33} />
                   </Button>
                 </Right>
               </Header>
               <ScrollView>
                  <Grid style={styles.pc}>
                    <Col size={1} style={styles.pc_col1}>
                      <Thumbnail large source={sly} />
                    </Col>
                    <Col size={3} style={styles.pc_col2}>
                      <Row>
                        <Col>
                          <Row>
                            <Text style={styles.pff_num}>1</Text>
                          </Row>
                          <Row>
                            <Text>Posts</Text>
                          </Row>
                        </Col>
                        <Col>
                          <Row>
                            <Text style={styles.pff_num}>1</Text>
                          </Row>
                          <Row>
                            <Text>Followers</Text>
                          </Row>
                        </Col>
                        <Col>
                          <Row>
                            <Text style={styles.pff_num}>1</Text>
                          </Row>
                          <Row>
                            <Text>Following</Text>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Button light>
                          <Text>Edit profile</Text>
                        </Button>
                      </Row>
                    </Col>
                  </Grid>
                  <Tabs style={{ marginTop: 24, backgroundColor: "white" }} transparent renderTabBar={() => <ScrollableTab />}>
                    <Tab heading={<TabHeading style={{ backgroundColor: "white" }}>
                          <Ionicons name="md-apps" size={30} />
                        </TabHeading>}>
                      <ScrollView>
                        <ImageView />
                      </ScrollView>
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: "white" }}>
                          <Ionicons name="ios-list-outline" size={30} />
                        </TabHeading>}>
                      <ScrollView>
                      <KeyboardAvoidingScrollView keyboardShouldPersistTaps="always">
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
                         <Spinner color="grey" size={20} />
                         <View style={{ height: 150 }} />
                       </Content>
                     </KeyboardAvoidingScrollView>
                     <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState(
                       { isModalVisible: false }
                     )}>
                       <Modal1Content setModalVisible={this.setModalVisible} />
                     </Modal> 
                      </ScrollView>
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: "white" }}>
                          <Ionicons name="md-photos" size={30} />
                        </TabHeading>}>
                      <Text />
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: "white" }}>
                          <Ionicons name="ios-bookmark-outline" size={30} />
                        </TabHeading>}>
                    </Tab>
                  </Tabs>
               </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
