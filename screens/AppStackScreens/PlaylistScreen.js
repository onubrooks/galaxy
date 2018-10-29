import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Body,
  Left,
  Right,
  Icon,
  Text
} from "native-base";

// redux related imports
import { connect } from "react-redux";
import { fetchPlaylist } from "../../../actions/actions";

import styles from "../../components/styles";
import PlaylistPlayer from "../../components/PlaylistPlayer";
const onu = require("../../assets/onu.jpg");
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

export class PlaylistScreen extends Component {
  componentWillMount() {
    this.props.fetchPlaylist()
  }
  render() {
    let { feed, playlist } = this.props;
    let avail = playlist ? playlist : feed;
    const songArray = Object.keys(avail.byId).map((songId, idx) => feed.byId[songId]);
    let playlist = songArray.slice(0, 4);
    return (
      <Container style={styles.container}>
        <Header
          style={[styles.header, { backgroundColor: "white" }]}
          androidStatusBarColor="#006E8C"
        >
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Feed")}
            >
              <Icon name="md-close" style={{ color: primaryColor }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={stl.heading}>My Playlist</Text>
          </Body>
        </Header>
        <Content>
          <PlaylistPlayer playlist={playlist} />
        </Content>
      </Container>
    );
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
  fetchPlaylist
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistScreen);

const primaryColor = "#006E8C";
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
