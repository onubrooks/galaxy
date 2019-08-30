import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import {
  Container,
  Header,
  Content,
  Body,
  Left,
  Icon,
  Text,
  Spinner
} from "native-base";

// redux related imports
import { connect } from "react-redux";
import { fetchPlaylist, unBookmarkASong } from "../../actions/actions";

import styles from "../../components/styles";
import PlaylistPlayer from "../../components/PlaylistPlayer";

export class PlaylistScreen extends Component {
  componentWillMount() {
    this.props.fetchPlaylist(this.props.user);
  }

  render() {
    let { playlist } = this.props;
    const songArray = Object.keys(playlist.byId).map((songId, idx) => playlist.byId[songId]);
    return <Container style={[styles.container]}>
        <Content>
          {playlist.loading ? <View style={[styles.loadingIndicator, {marginTop: 60,}]}>
          <Spinner color={styles.primaryColor} size={Platform.OS === 'ios' ? 1 : 20}/>
            </View> : <PlaylistPlayer playlist={songArray} unBookmarkASong={this.props.unBookmarkASong} userId={this.props.user.id} />}
        </Content>
      </Container>;
  }
}

const mapStateToProps = (state) => {
  return {
    feed: state.feed,
    user: state.user,
    playlist: state.playlist
  };
};

const mapDispatchToProps = {
  fetchPlaylist,
  unBookmarkASong
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistScreen);

const stl = StyleSheet.create({
  grid: {
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 30
    // height: DEVICE_HEIGHT
  },
  albumCover: {}
});
