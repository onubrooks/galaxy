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
import { FeedScreenModalContent, ReportAbuseModalContent } from "./ModalContent";

// redux related imports
import { connect } from "react-redux";
import {
  fetchFeed,
  fetchPlaylist,
  fetchMyProfile,
  hitASong,
  unHitASong,
  removeSong,
  bookmarkASong,
  unBookmarkASong,
  commentASong,
  blockUser,
  unFollowUser,
  reportAbuse
} from "../actions/actions";

import styles from "./styles";

export class FeedItemWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalVisible: false, isReportModalVisible: false, refreshing: props.feed.loading, song: null, listLength: 10, slice: 5, offset: 0 };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.gotoComments = this.gotoComments.bind(this);
    this.addComment = this.addComment.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.toggleBookmark = this.toggleBookmark.bind(this);
  }

  componentDidMount() {
    this._onRefresh();
  }
  _onRefresh = () => {
    if (this.props.navigation.state.routeName == "Feed") {
      //this.setState({ refreshing: true });
      this.props.fetchFeed(this.props.user, this.state.offset);
      //this.props.fetchPlaylist(this.props.user);
      //this.props.fetchMyProfile(this.props.user.id);
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.feed.loading !== prevState.refreshing) {
      return { refreshing: nextProps.feed.loading };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.feed.loading !== this.props.feed.loading) {
      //Perform some operation here
      this.setState({
        refreshing: this.props.feed.loading,
      });
    }
  }

  setModalVisible(visible, song, val) {
    if(val && val == 'remove') {
      this.props.removeSong(this.state.song.songId);
      this.setState({ isModalVisible: visible, song:null });
    } 
    else if (val && val == 'report') {
      this.setState({ isModalVisible: visible });
      this.setState({ isReportModalVisible: true });
    } 
    else if (val && val == 'block') {
      this.props.blockUser(this.state.song, this.props.user);
      this.props.removeSong(this.state.song.songId);
      this.setState({ isModalVisible: visible, song: null });
    } 
    else if (val && val == 'unfollow') {
      this.props.unFollowUser(this.state.song, this.props.user);
      this.setState({ isModalVisible: visible, song: null });
    } 
    else if (val && (val == "inappropriate" || val == "spam")) {
      this.props.reportAbuse(this.state.song, this.props.user, val);
      this.props.removeSong(this.state.song.songId);
      this.setState({ isReportModalVisible: visible, song: null });
    } 
    else {
      this.setState({ isModalVisible: visible, song });
    }
  }
  addComment(songId, comment) {
    let user = this.props.user;
    this.props.commentASong(songId, comment, user);
  }
  gotoComments(song) {
    this.props.navigation.navigate("AddComment", {
      song
    });
  }
  toggleLike(songId, userId) {
    // like/hit action dispatcher
    if (!this.props.feed.byId[songId].iHit) {
      this.props.hitASong(songId, userId);
    } else {
      this.props.unHitASong(songId, userId);
    }
  }

  toggleBookmark(songId, userId) {
    // bookmark action dispatcher
    if (!this.props.feed.byId[songId].iFav) {
      this.props.bookmarkASong(songId, userId);
    } else {
      this.props.unBookmarkASong(songId, userId);
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

  _loadMore = () => {
    let len = Object.keys(this.props.feed.byId).length;
    let offset = this.state.offset;
    if(len >= 30 && offset >= 20) return;
    this.setState({ refreshing: true });
    let slc = this.state.slice;
    let newSlc = slc + 5;
    if (newSlc > len) {
      let newOffset = offset + 10;
      this.props.fetchFeed(this.props.user, newOffset);
      this.setState({offset: newOffset});
    } else {
      this.setState({ slice: newSlc, refreshing: false });
    }
    
  }

  render() {
    const idx = this.props.navigation.getParam("idx", 0);
    const { feed = {}, user = {}, bookmarks = [], bookmarkedOnly = false } = this.props;
    const songArray = Object.keys(feed.byId).map((songId, idx) => feed.byId[songId]);
    let slc = this.state.slice;
    let offset = this.state.offset;
    let all = this._getItemsToDisplay(songArray, idx, bookmarkedOnly);
    let listLength = all.length;
    let display = all.slice(0, slc);
    return <Container style={styles.container}>
        <KeyboardAvoidingScrollView keyboardShouldPersistTaps="always" refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} tintColor={"#006E8C"} title="refreshing" />}>
          <Content>
            {display.map((song, idx) => song && <FeedItem key={idx} song={song} user={user} bookmarks={bookmarks} toggleLike={this.toggleLike} toggleBookmark={this.toggleBookmark} setModalVisible={this.setModalVisible} gotoComments={this.gotoComments} addComment={this.addComment} navigation={this.props.navigation} />)}
            {this.props.navigation.state.routeName == "Feed" && feed.updated && (listLength < 30 || offset < 20) ? <LoadMore load={this._loadMore} loading={feed.loading} /> : null}
            <View style={{ height: 150 }} />
          </Content>
        </KeyboardAvoidingScrollView>
        <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState(
              { isModalVisible: false }
            )}>
          <FeedScreenModalContent setModalVisible={this.setModalVisible} />
        </Modal>
        <Modal isVisible={this.state.isReportModalVisible} onBackdropPress={() => this.setState(
              { isReportModalVisible: false }
            )}>
          <ReportAbuseModalContent setModalVisible={this.setModalVisible} />
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
  fetchPlaylist,
  fetchMyProfile,
  hitASong,
  unHitASong,
  removeSong,
  bookmarkASong,
  unBookmarkASong,
  commentASong,
  blockUser,
  unFollowUser,
  reportAbuse
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedItemWrapper);

const CouldntLoad = props => {
  return <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 50, marginVertical: 20 }}>
      <TouchableOpacity onPress={props.retry} style={{flexDirection:'column', alignItems:'center'}} light>
      <Text>Couldn't refresh your feed, Retry</Text><Icon name="ios-refresh-circle" />
      </TouchableOpacity>
    </View>;
}

const LoadMore = props => {
  return props.loading ? <Spinner color="grey" size={Platform.OS === 'ios' ? 1 : 20}  /> : <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 80}}>
    <Button light onPress={props.load}><Text>Load More</Text><Icon name="ios-refresh-circle" /></Button>
    </View>;
}
