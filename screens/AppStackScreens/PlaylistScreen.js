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
    return <Container style={styles.container}>
        <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor={styles.primaryColor}>
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Feed")}>
              <Icon name="md-close" style={{ color: styles.primaryColor }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={stl.heading}>My Playlist</Text>
          </Body>
        </Header>
        <Content>
          {playlist.loading ? <View style={styles.loadingIndicator}>
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
