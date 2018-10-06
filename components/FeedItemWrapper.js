/**
 * this wrapper class/component for FeedItem componont was created because a recurring pattern of the 
 * functionality provided by all the methods in this class was noticed and had to be abstracted out
 * for code reuse, therefore avoiding repetition of the same functionality across different classes/components
 * example components that use this same functionality include: Feed.js, ExploreScreen.js and Profile.js 
 * the class/component does all the necessary filtering based on the route name in the _getItemsToDisplay() method 
 * and passes the filtered data to the FeedItem component for display
 */

import React, { Component } from "react";
import { TouchableOpacity, View, RefreshControl } from "react-native";
import {
  Container,
  Content,
  Text,
  Spinner,
  Button,
  Icon
} from "native-base";

import FeedItem from "./FeedItem";
import KeyboardAvoidingScrollView from "./KeyboardAvoidingScrollView";
import Modal from "react-native-modal";
import { FeedScreenModalContent } from "./ModalContent";

// redux related imports
import { connect } from "react-redux";
import {
  fetchFeed,
  hitASong,
  unHitASong,
  bookmarkASong,
  unBookmarkASong,
  commentASong
} from "../actions/actions";

import styles from "./styles";

export class FeedItemWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalVisible: false, refreshing: props.feed.loading };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.gotoComments = this.gotoComments.bind(this);
    this.addComment = this.addComment.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.toggleBookmark = this.toggleBookmark.bind(this);
  }

  componentDidMount() {
    this._onRefresh();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.feed.loading !== prevState.refreshing) {
      return { refreshing: nextProps.feed.loading };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.feed.loading !== this.props.feed.loading) {
      //Perform some operation here
      this.setState({ refreshing: this.props.feed.loading });
    }
  }

  setModalVisible(visible) {
    this.setState({ isModalVisible: visible });
  }
  addComment(songId, comment) {
    let user_id = this.props.user.id;
    this.props.commentASong(songId, comment, user_id);
  }
  gotoComments(song) {
    this.props.navigation.navigate("AddComment", {
      song,
      users: this.props.users.byId
    });
  }
  toggleLike(songId) {
    // like/hit action dispatcher
    if (!this.props.feed.byId[songId].iHit) {
      this.props.hitASong(songId);
    } else {
      this.props.unHitASong(songId);
    }
  }

  toggleBookmark(songId) {
    // bookmark action dispatcher
    if (!this.props.feed.byId[songId].iFav) {
      this.props.bookmarkASong(songId);
    } else {
      this.props.unBookmarkASong(songId);
    }
  }

  _getItemsToDisplay = (songArray, idx, bookmarkedOnly) => {
    /**
     * this is a helper function that is called in the render method
     * it filters the feed to display based on the current route the app is in
     * this is necessary because the component is used by several routes in the app
     * therefore it has to filter what to display based on what page the app is currently in.
     */
    // from search screen
    if (this.props.navigation.state.routeName == 'Explore') {
      return songArray.filter((song, index) => index >= idx);
      // songs you've liked from settings screen
    } else if (this.props.navigation.state.routeName == 'Song') {
      return songArray
        .filter((song, index) => {
          return song.hits.some(id => id == user.id);
        })
        .filter((song, index) => index == idx);
    }
    // display a single song identified by song id
    else if (this.props.navigation.state.routeName == "song") {
      return songArray.filter((song, index) => {
        return song.handle == user.username;
      }).filter((song, index) => index == idx);
      // saved/bookmarked song from settings screen
    } else if (this.props.navigation.state.routeName == "SavedList" || bookmarkedOnly) {
      return songArray
        .filter((song, index) => {
          return bookmarks.some(id => id == song.id);
        })
        .filter((song, index) => index == idx);
    }
    // profile page, songs by the logged in user
    else if (this.props.navigation.state.routeName == "Profile") {
      return songArray.filter((song, index) => {
        return song.handle == user.username;
      });
    }
    // if none of the above hold, then we are probably in the feed screen
    else {
      return songArray;
    }
  }
  _onRefresh = () => {
    if (this.props.navigation.state.routeName == "Feed") {
      //this.setState({ refreshing: true });
      this.props.fetchFeed(this.props.user);
    }
  }

  render() {
    const idx = this.props.navigation.getParam("idx", 0);
    const { feed = {}, user = {}, bookmarks = [], bookmarkedOnly = false } = this.props;
    const songArray = Object.keys(feed.byId).map((songId, idx) => feed.byId[songId]);
    let all = this._getItemsToDisplay(songArray, idx, bookmarkedOnly);
    let display = all.slice(0, 3);

    return <Container style={styles.container}>
      <KeyboardAvoidingScrollView keyboardShouldPersistTaps="always" refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} tintColor={'grey'} title="refreshing" />}>
          <Content>
            {/* {feed.loading ? <Spinner color="grey" size={20} /> : null} */}
            {display.map((song, idx) => (
              <FeedItem
                key={idx}
                song={song}
                user={user}
                bookmarks={bookmarks}
                toggleLike={this.toggleLike}
                toggleBookmark={this.toggleBookmark}
                setModalVisible={this.setModalVisible}
                gotoComments={this.gotoComments}
                addComment={this.addComment}
                navigation={this.props.navigation}
              />
            ))}
            {this.props.navigation.state.routeName == "Feed" && feed.updated ? <LoadMore load={() => this.props.fetchFeed(this.props.user)} loading={feed.loading} /> : <Spinner color="grey" size={20} />}
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
  hitASong,
  unHitASong,
  bookmarkASong,
  unBookmarkASong,
  commentASong
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedItemWrapper);

const CouldntLoad = props => {
  return <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 50, marginVertical: 20 }}>
      <TouchableOpacity onPress={props.retry} style={{flexDirection:'column', alignItems:'center'}} light>
      <Text>Couldn't refresh your feed, Retry</Text><Icon name="ios-refresh-circle-outline" />
      </TouchableOpacity>
    </View>;
}

const LoadMore = props => {
  return props.loading ? <Spinner color="grey" size={20}  /> : <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 80}}>
    <Button light onPress={props.load}><Text>Load More</Text><Icon name="ios-refresh-circle-outline" /></Button>
    </View>;
}
