/**
 *
 */

import React from "react";
import {
  Dimensions,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { Audio, Font, Video } from "expo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "native-base";

import IconAsset from "./IconAsset";
const ICON_TRACK_1 = new IconAsset(require('../assets/images/track_1.png'), 166, 5);
const ICON_THUMB_1 = new IconAsset(require('../assets/images/thumb_1.png'), 18, 19);
const ICON_THUMB_2 = new IconAsset(require('../assets/images/thumb_2.png'), 15, 19);


const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "#FFF8ED";
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 6.0 - FONT_SIZE * 2;

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.state = {
      playbackInstanceName: LOADING_STRING,
      loopingType: LOOPING_TYPE_ALL,
      muted: false,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
      poster: false,
      useNativeControls: true,
      fullscreen: false,
      show: true
    };
    // setInterval(() => this.setState({ show: !this.state.show }), 500);
  }
  componentDidMount() {
    (async () => {
      await Font.loadAsync({
        'cutive-mono-regular': require('../assets/fonts/CutiveMono-Regular.ttf'),
      });
      this.setState({ fontLoaded: true });
    })();
  }

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        showVideo: false,
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true,
      });
    } else {
      this.setState({
        playbackInstanceName: PLAYLIST[this.index].name,
        showVideo: PLAYLIST[this.index].isVideo,
        isLoading: false,
      });
    }
  }

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
        shouldCorrectPitch: status.shouldCorrectPitch,
      });
      if (status.didJustFinish && !status.isLooping) {
        this._advanceIndex(true);
        this._updatePlaybackInstanceForIndex(true);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _onReadyForDisplay = event => {
    const widestHeight = DEVICE_WIDTH * event.naturalSize.height / event.naturalSize.width;
    if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
      this.setState({
        videoWidth: VIDEO_CONTAINER_HEIGHT * event.naturalSize.width / event.naturalSize.height,
        videoHeight: VIDEO_CONTAINER_HEIGHT,
      });
    } else {
      this.setState({
        videoWidth: DEVICE_WIDTH,
        videoHeight: DEVICE_WIDTH * event.naturalSize.height / event.naturalSize.width,
      });
    }
  };

  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true);

    this.setState({
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
    });

    this._loadNewPlaybackInstance(playing);
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return '';
  }

  _getSeekSliderPosition() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return this.state.playbackInstancePosition / this.state.playbackInstanceDuration;
    }
    return 0;
  }

  render() {
    let { post_id } = this.props;
    return !this.state.fontLoaded ? <View style={styles.emptyContainer} /> : <View style={styles.container} >
      <View />
      <View style={styles.nameContainer}>
        <Text
          style={[styles.text, { fontFamily: "cutive-mono-regular" }]}
        >
          {this.state.playbackInstanceName}
        </Text>
      </View>
      <View style={styles.space} />
      <View style={styles.videoContainer}>
        <Video ref={this._mountVideo} style={[styles.video, { opacity: this.state.showVideo ? 1.0 : 0.0, width: this.state.videoWidth, height: this.state.videoHeight }]} resizeMode={Video.RESIZE_MODE_CONTAIN} onPlaybackStatusUpdate={this._onPlaybackStatusUpdate} onLoadStart={this._onLoadStart} onLoad={this._onLoad} onError={this._onError} onFullscreenUpdate={this._onFullscreenUpdate} onReadyForDisplay={this._onReadyForDisplay} useNativeControls={this.state.useNativeControls} />
      </View>
      {this.state.show ? <View style={[styles.playbackContainer, { opacity: this.state.isLoading ? DISABLED_OPACITY : 0.7 }]}>
        <Button transparent style={styles.wrapper} onPress={this._onPlayPausePressed} disabled={this.state.isLoading}>
          {this.state.isPlaying ? <Ionicons name="ios-pause-outline" size={30} /> : <Ionicons name="ios-play-outline" size={30} />}
        </Button>

        <Text
          style={[
            styles.text,
            styles.buffering,
            { fontFamily: "cutive-mono-regular" }
          ]}
        >
          {this.state.isBuffering ? BUFFERING_STRING : ""}
        </Text>
        <Text
          style={[
            styles.text,
            styles.timestamp,
            { fontFamily: "cutive-mono-regular" }
          ]}
        >
          {this._getTimestamp()}
        </Text>

        <Slider style={styles.playbackSlider} trackImage={ICON_TRACK_1.module} thumbImage={ICON_THUMB_1.module} value={this._getSeekSliderPosition()} onValueChange={this._onSeekSliderValueChange} onSlidingComplete={this._onSeekSliderSlidingComplete} disabled={this.state.isLoading} />
        <View style={styles.volumeContainer}>
          <Button transparent style={styles.wrapper} onPress={this._onMutePressed}>
            {this.state.muted ? <Ionicons name="ios-volume-off-outline" size={30} /> : <Ionicons name="ios-volume-up-outline" size={30} />}
          </Button>
        </View>
      </View> : null}

      <View />
    </View>;
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: "stretch",
    backgroundColor: BACKGROUND_COLOR
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: DEVICE_WIDTH
    //backgroundColor: BACKGROUND_COLOR
  },
  wrapper: {
    width: DEVICE_WIDTH / 10,
    marginLeft: 20,
    alignSelf: "center"
  },
  nameContainer: {
    height: FONT_SIZE
  },
  space: {
    height: FONT_SIZE
  },
  videoContainer: {
    height: VIDEO_CONTAINER_HEIGHT
  },
  video: {
    width: DEVICE_WIDTH
  },
  playbackContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //alignSelf: "stretch",
    minHeight: ICON_THUMB_1.height * 2.0,
    maxHeight: ICON_THUMB_1.height * 2.0,
    maxWidth: DEVICE_WIDTH,
    width: DEVICE_WIDTH,
    opacity: 0.8,
    backgroundColor: "#000000"
  },
  playbackSlider: {
    width: DEVICE_WIDTH / 3
  },
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE,
    color: "#fff"
  },
  buffering: {
    textAlign: "left",
    paddingLeft: 2
  },
  timestamp: {
    textAlign: "right",
    paddingRight: 2
  },
  volumeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
    paddingRight: -50
  }
});