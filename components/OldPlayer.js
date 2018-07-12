/**
 * 
 */

import React from 'react';
import {
  Dimensions,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Audio, Font, Video } from 'expo';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "native-base";

import IconAsset from "./IconAsset";

class PlaylistItem {
  constructor(name, uri, isVideo) {
    this.name = name;
    this.uri = uri;
    this.isVideo = isVideo;
  }
}

const PLAYLIST = [
  new PlaylistItem(
    "Track 1",
    require("../audio/1.mp3"),
    false
  )
];

const ICON_PLAY_BUTTON = new IconAsset(require('../assets/images/play_button.png'), 34, 51);
const ICON_PAUSE_BUTTON = new IconAsset(require('../assets/images/pause_button.png'), 34, 51);
const ICON_STOP_BUTTON = new IconAsset(require('../assets/images/stop_button.png'), 22, 22);
const ICON_FORWARD_BUTTON = new IconAsset(require('../assets/images/forward_button.png'), 33, 25);
const ICON_BACK_BUTTON = new IconAsset(require('../assets/images/back_button.png'), 33, 25);

const ICON_LOOP_ALL_BUTTON = new IconAsset(require('../assets/images/loop_all_button.png'), 77, 35);
const ICON_LOOP_ONE_BUTTON = new IconAsset(require('../assets/images/loop_one_button.png'), 77, 35);

const ICON_MUTED_BUTTON = new IconAsset(require('../assets/images/muted_button.png'), 67, 58);
const ICON_UNMUTED_BUTTON = new IconAsset(require('../assets/images/unmuted_button.png'), 67, 58);

const ICON_TRACK_1 = new IconAsset(require('../assets/images/track_1.png'), 166, 5);
const ICON_THUMB_1 = new IconAsset(require('../assets/images/thumb_1.png'), 18, 19);
const ICON_THUMB_2 = new IconAsset(require('../assets/images/thumb_2.png'), 15, 19);

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const LOOPING_TYPE_ICONS = { 0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON };

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF8ED';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = '... loading ...';
const BUFFERING_STRING = '...buffering...';
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = DEVICE_HEIGHT * 2.0 / 6.0 - FONT_SIZE * 2;

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.unmounted = false;
    this.index = 0;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.state = {
      showVideo: false,
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
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    (async () => {
      await Font.loadAsync({
        'cutive-mono-regular': require('../assets/fonts/CutiveMono-Regular.ttf'),
      });
      this.setState({ fontLoaded: true });
    })();
  }

  componentWillUnmount() {
    this.unmounted = true;
    if (this.playbackInstance != null) {
      this.playbackInstance.unloadAsync();
    }
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    const source = this.index == 0 ? PLAYLIST[this.index].uri : { uri: PLAYLIST[this.index].uri };
    const initialStatus = {
      shouldPlay: playing,
      rate: this.state.rate,
      shouldCorrectPitch: this.state.shouldCorrectPitch,
      volume: this.state.volume,
      isMuted: this.state.muted,
      isLooping: this.state.loopingType === LOOPING_TYPE_ONE,
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      androidImplementation: 'MediaPlayer',
    };

    if (PLAYLIST[this.index].isVideo) {
      this._video.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
      await this._video.loadAsync(source, initialStatus);
      this.playbackInstance = this._video;
      const status = await this._video.getStatusAsync();
    } else {
      const { sound, status } = await Audio.Sound.create(
        source,
        initialStatus,
        this._onPlaybackStatusUpdate
      );
      this.playbackInstance = sound;
    }

    this._updateScreenForLoading(false);
  }

  _mountVideo = component => {
    this._video = component;
    this._loadNewPlaybackInstance(false);
  };

  _updateScreenForLoading(isLoading) {
    if (this.unmounted) return;
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
    if(this.unmounted) return;
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

  _onLoadStart = () => {
    console.log(`ON LOAD START`);
  };

  _onLoad = status => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  _onError = error => {
    console.log(`ON ERROR : ${error}`);
  };

  _onReadyForDisplay = event => {
    if (this.unmounted) return;
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

  _onFullscreenUpdate = event => {
    console.log(`FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`);
  };

  _advanceIndex(forward) {
    this.index = (this.index + (forward ? 1 : PLAYLIST.length - 1)) % PLAYLIST.length;
  }

  async _updatePlaybackInstanceForIndex(playing) {
    if (this.unmounted) return;
    this._updateScreenForLoading(true);

    this.setState({
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
    });

    this._loadNewPlaybackInstance(playing);
  }

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  _onMutePressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsMutedAsync(!this.state.muted);
    }
  };

  _onPitchCorrectionPressed = async value => {
    this._trySetRate(this.state.rate, !this.state.shouldCorrectPitch);
  };

  _onSeekSliderValueChange = value => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.playbackInstance != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.playbackInstanceDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        this.playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

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

  _onPosterPressed = () => {
    if (this.unmounted) return;
    this.setState({ poster: !this.state.poster });
  };

  _onUseNativeControlsPressed = () => {
    if (this.unmounted) return;
    this.setState({ useNativeControls: !this.state.useNativeControls });
  };

  _onFullscreenPressed = () => {
    try {
      this._video.presentFullscreenPlayer();
    } catch (error) {
      console.log(error.toString());
    }
  };

  render() {
    return !this.state.fontLoaded ? <View style={styles.emptyContainer} /> : <View style={styles.container}>
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
        {this.state.showVideo ? <View>
            <View style={[styles.buttonsContainerBase, styles.buttonsContainerTextRow]}>
              <View />
              <TouchableHighlight underlayColor={BACKGROUND_COLOR} style={styles.wrapper} onPress={this._onPosterPressed}>
                <View style={styles.button}>
                  <Text
                    style={[
                      styles.text,
                      { fontFamily: "cutive-mono-regular" }
                    ]}
                  >
                    Poster: {this.state.poster ? "yes" : "no"}
                  </Text>
                </View>
              </TouchableHighlight>
              <View />
              <TouchableHighlight underlayColor={BACKGROUND_COLOR} style={styles.wrapper} onPress={this._onFullscreenPressed}>
                <View style={styles.button}>
                  <Text
                    style={[
                      styles.text,
                      { fontFamily: "cutive-mono-regular" }
                    ]}
                  >
                    Fullscreen
                  </Text>
                </View>
              </TouchableHighlight>
              <View />
            </View>
            <View style={styles.space} />
            <View style={[styles.buttonsContainerBase, styles.buttonsContainerTextRow]}>
              <View />
              <TouchableHighlight underlayColor={BACKGROUND_COLOR} style={styles.wrapper} onPress={this._onUseNativeControlsPressed}>
                <View style={styles.button}>
                  <Text
                    style={[
                      styles.text,
                      { fontFamily: "cutive-mono-regular" }
                    ]}
                  >
                    Native Controls:{" "}
                    {this.state.useNativeControls ? "yes" : "no"}
                  </Text>
                </View>
              </TouchableHighlight>
              <View />
            </View>
          </View> : null}
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
  timestampRow: {
    //flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    //alignSelf: 'stretch',
    minHeight: FONT_SIZE,
    maxWidth: DEVICE_WIDTH / 6
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
  button: {
    backgroundColor: BACKGROUND_COLOR
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttonsContainerTopRow: {
    maxHeight: ICON_PLAY_BUTTON.height,
    minWidth: DEVICE_WIDTH / 2.0,
    width: "100%",
    alignSelf: "stretch",
    marginLeft: 20
  },
  buttonsContainerMiddleRow: {
    maxHeight: ICON_MUTED_BUTTON.height,
    //alignSelf: 'stretch',
    paddingRight: 20
  },
  volumeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
    paddingRight: -50
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width
  },
  buttonsContainerBottomRow: {
    maxHeight: ICON_THUMB_1.height,
    //alignSelf: 'stretch',
    paddingRight: 20,
    paddingLeft: 20
  },
  rateSlider: {
    width: DEVICE_WIDTH / 2.0
  },
  buttonsContainerTextRow: {
    maxHeight: FONT_SIZE,
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    minWidth: DEVICE_WIDTH,
    maxWidth: DEVICE_WIDTH
  }
});