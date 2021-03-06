/**
 * this wrapper class/component for FeedItem componont was created because a recurring pattern of the 
 * functionality provided by all the methods in this class was noticed and had to be abstracted out
 * for code reuse, therefore avoiding repetition of the same functionality across different classes/components
 * example components that use this same functionality include: Feed.js, ExploreScreen.js and Profile.js 
 * the class/component does all the necessary filtering based on the route name in the _getItemsToDisplay() method 
 * and passes the filtered data to the FeedItem component for display
 */

import React, { Component } from "react";
import { TouchableOpacity, View, RefreshControl, AsyncStorage, Linking } from "react-native";
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
import { FeedScreenModalContent, ReportAbuseModalContent, CommentsModalContent } from "./ModalContent";

// redux related imports
import { connect } from "react-redux";
import {
  fetchFeed,
  fetchPlaylist,
  fetchMyProfile,
  fetchMusic,
  hitASong,
  unHitASong,
  removeSong,
  bookmarkASong,
  unBookmarkASong,
  hitMusic,
  unHitMusic,
  removeMusic,
  bookmarkMusic,
  unBookmarkMusic,
  getMusicSuccess,
  commentASong,
  commentMusicAsync,
  blockUser,
  unFollowUser,
  reportAbuse
} from "../actions/actions";

import styles from "./styles";
import sampleFeed from "./feedSample";

export class FeedItemWrapper extends Component {
  constructor(props) {
    super(props);
    super(props);
    let feedItems = shuffle(sampleFeed);
    let offset = 0;
    let listLength = 10;
    let displayItems = feedItems.slice(offset, listLength);
    this.state = {
      refreshing: props.navigation.state.routeName == "Feed" ? props.feed.loading : false,
      song: null,
      listLength,
      offset,
      feedItems,
      displayItems,
      isModalVisible: false,
      isReportModalVisible: false,
      isCommentsModalVisible: false,
      slice: 5
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.gotoComments = this.gotoComments.bind(this);
    this.addComment = this.addComment.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.toggleBookmark = this.toggleBookmark.bind(this);
  }

  componentDidMount() {
    let route = this.props.navigation.state.routeName;
    if (route == "Explore" || route == "Song") {
      let item = this.props.navigation.getParam("item", {});
      this.props.getMusicSuccess([item]);
    }
    if(this.props.navigation.state.routeName == "Feed") this._onRefresh();
  }
  _onRefresh = async () => {
    if (!this.props.user.email) {
      let user_id = await AsyncStorage.getItem("user_id");
      this.props.fetchMyProfile(user_id);
      this.props.fetchFeed(
        {id: user_id},
        this.state.offset,
      );
    } else {
      this.props.fetchFeed(
        this.props.user,
        this.state.offset
      );
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
    if(val && val == 'facebook') {
      let url = `https://leedder.com/song/${this.state.song.songId}`;
      let facebookhref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}&amp;src=sdkpreparse`;

      Linking.openURL(
        facebookhref
      );
    } 
    if(val && val == 'twitter') {
      let url = `https://leedder.com/song/${this.state.song.songId}`;
      let twitter = `https://twitter.com/intent/tweet?text=Checkout&url=${encodeURIComponent(
        url
      )}`;

      Linking.openURL(
        twitter
        // `https://twitter.com/home?status=Use%20my%20Thistle%20referral%20code%20${short_referrer_key}%20to%20get%20$20%20off%20healthy%20meals%20delivered%20https%3A//www.thistle.co/referral/${short_referrer_key}`
      );
    } 
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
    } else if(val && val == 'comments'){
      this.setState({ isCommentsModalVisible: visible });
    }
    else {
      this.setState({ isModalVisible: visible, song });
    }
  }
  addComment(songId, comment) {
    let user = this.props.user;
    if (this.props.navigation.state.routeName == "Feed"){
      this.props.commentASong(songId, comment, user);
    } else {
      this.props.commentMusicAsync(songId, comment, user);
    }
  }
  gotoComments(song) {
    this.setState({ isCommentsModalVisible: true, song });
    // this.props.navigation.navigate("AddComment", {
    //   song
    // });
  }
  toggleLike(songId, userId) {
    if (this.props.navigation.state.routeName == "Feed"){
      if (!this.props.feed.byId[songId].iHit) {
        // like/hit action dispatcher
        this.props.hitASong(songId, userId);
      } else {
        this.props.unHitASong(songId, userId);
      }
    } else {
      if (!this.props.music.byId[songId].iHit) {
        // like/hit action dispatcher
        this.props.hitMusic(songId, userId);
      } else {
        this.props.unHitMusic(songId, userId);
      }
    }
      
  }

  toggleBookmark(songId, userId) {
    // bookmark action dispatcher
    if (this.props.navigation.state.routeName == "Feed"){
      if (!this.props.feed.byId[songId].iFav) {
        this.props.bookmarkASong(songId, userId);
      } else {
        this.props.unBookmarkASong(songId, userId);
      }
    } else {
      if (!this.props.music.byId[songId].iFav) {
        this.props.bookmarkMusic(songId, userId);
      } else {
        this.props.unBookmarkMusic(songId, userId);
      }
    }
  }

  _getItemsToDisplay = () => {
    /**
     * this is a helper function that is called in the render method
     * it filters the feed to display based on the current route the app is in
     * this is necessary because the component is used by several routes in the app
     * therefore it has to filter what to display based on what page the app is currently in.
     */
    let route = this.props.navigation.state.routeName;
    let item = this.props.navigation.getParam("item", {});
    let { user } = this.props;
    if(route == "Feed") {
      let { feed } = this.props;
      let display = Object.keys(feed.byId).length
        ? Object.keys(feed.byId).map(key => feed.byId[key])
        : [];
      return display;
    } else if(route == "Profile") {
      let { music } = this.props;
      let display = Object.keys(music.byId).length
        ? Object.keys(music.byId).map(key => music.byId[key])
        : [];
        return display.filter(song => song.userId == user.id);
    }
       else {
      let { music } = this.props;
      let display = Object.keys(music.byId).length
        ? Object.keys(music.byId).map(key => music.byId[key])
        : [];
      return display.filter(song => song.songId == item.songId);
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
    let route = this.props.navigation.state.routeName;
    const idx = this.props.navigation.getParam("idx", 0);
    let { user, display = null } = this.props;
    let displayItems = display || this._getItemsToDisplay();
    displayItems = displayItems.filter((item) => item.songId !== 225)
    if(!displayItems.length && route !== "Feed") 
    return (
      <Text
        style={{
          fontFamily:
            "Segoe UI Bold Italic",
          color: "grey",
          fontSize: 20,
          marginVertical: 80,
          marginHorizontal: 80
        }}
      >
        No items to
        display
      </Text>
    );
    
    return (
      <Container style={styles.container}>
        <KeyboardAvoidingScrollView
          keyboardShouldPersistTaps="always"
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor={"#006E8C"}
              title="refreshing"
            />
          }
        >
          {displayItems.length ? (
            <Content>
              {displayItems.map(
                (song, idx) =>
                  song && (
                    <FeedItem
                      key={idx}
                      song={song}
                      user={user}
                      toggleLike={this.toggleLike}
                      toggleBookmark={this.toggleBookmark}
                      setModalVisible={this.setModalVisible}
                      gotoComments={this.gotoComments}
                      addComment={this.addComment}
                      navigation={this.props.navigation}
                    />
                  )
              )}
              {this.props.navigation.state.routeName == "Feed" &&
              this.props.feed.updated &&
              (this.state.listLength < 30 || offset < 20) ? (
                <LoadMore load={this._loadMore} loading={this.props.feed.loading} />
              ) : null}
              <View style={{ height: 150 }} />
            </Content>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Search")}
                style={{ marginVertical: 90 }}
              >
                <Text
                  style={{
                    fontFamily: "Segoe UI Bold Italic",
                    color: "grey",
                    fontSize: 20
                  }}
                >
                  Follow users to view their songs
                </Text>
              </TouchableOpacity>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("Search")}
              >
                <Icon
                  name="search"
                  style={{ fontSize: 50 }}
                  active={true}
                />
              </Button>
            </View>
          )}
        </KeyboardAvoidingScrollView>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
        >
          <FeedScreenModalContent setModalVisible={this.setModalVisible} />
        </Modal>
        <Modal
          isVisible={this.state.isReportModalVisible}
          onBackdropPress={() =>
            this.setState({ isReportModalVisible: false })
          }
        >
          <ReportAbuseModalContent setModalVisible={this.setModalVisible} />
        </Modal>
        <Modal
          isVisible={this.state.isCommentsModalVisible}
          onBackdropPress={() =>
            this.setState({ isCommentsModalVisible: false })
          }
          onBackButtonPress={() =>
            this.setState({ isCommentsModalVisible: false })
          }
        >
          <CommentsModalContent
            setModalVisible={this.setModalVisible}
            song={this.state.song}
            navigation={this.props.navigation}
          />
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    feed: state.feed,
    user: state.user,
    users: state.users,
    comments: state.comments,
    bookmarks: state.bookmarks,
    music: state.music
  };
};

const mapDispatchToProps = {
  fetchFeed,
  fetchPlaylist,
  fetchMyProfile,
  fetchMusic,
  hitASong,
  unHitASong,
  removeSong,
  bookmarkASong,
  unBookmarkASong,
  hitMusic,
  unHitMusic,
  removeMusic,
  bookmarkMusic,
  unBookmarkMusic,
  getMusicSuccess,
  commentASong,
  commentMusicAsync,
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
  return props.loading ? <Spinner color="grey" size={Platform.OS === 'ios' ? 1 : 20}  /> : <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 125}}>
    <Button light onPress={props.load}><Text>Load More</Text>
    {/* <Icon name="ios-refresh-circle" /> */}
    </Button>
    </View>;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
