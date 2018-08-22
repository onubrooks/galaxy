import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Asset, Audio, Font, Video } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import { Icon as IconBase, Button } from "native-base";
import * as Animatable from "react-native-animatable";

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

class PlaylistItem {
  constructor(name, uri, isVideo) {
    this.name = name;
    this.uri = uri;
    this.isVideo = isVideo;
  }
}

const PLAYLIST = [
  new PlaylistItem(
    "Comfort Fit - “Sorry”",
    //"https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
    require("../audio/1.mp3"),
    false
  ),
  new PlaylistItem(
    "Mildred Bailey – “All Of Me”",
    "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
    //require("../audio/1.mp3"),
    false
  ),
  new PlaylistItem(
    "Podington Bear - “Rubber Robot”",
    "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
    //require("../audio/1.mp3"),
    false
  )
];

const ICON_PLAY_BUTTON = new Icon(require('../assets/images/play_button.png'), 34, 51);

const ICON_LOOP_ALL_BUTTON = new Icon(require('../assets/images/loop_all_button.png'), 77, 35);
const ICON_LOOP_ONE_BUTTON = new Icon(require('../assets/images/loop_one_button.png'), 77, 35);

const ICON_MUTED_BUTTON = new Icon(require('../assets/images/muted_button.png'), 67, 58);

const ICON_TRACK_1 = new Icon(require('../assets/images/track_1.png'), 166, 5);
const ICON_THUMB_1 = new Icon(require('../assets/images/thumb_1.png'), 18, 19);
const ICON_THUMB_2 = new Icon(require('../assets/images/thumb_2.png'), 15, 19);

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const LOOPING_TYPE_ICONS = { 0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON };

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF';//'#FFF8ED';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = '... loading ...';
const BUFFERING_STRING = '...buffering...';
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = DEVICE_HEIGHT * 2.0 / 5.0 - FONT_SIZE * 2;

export default class PlaylistPlayer extends React.Component {
  constructor(props) {
    super(props);
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
      useNativeControls: false,
      fullscreen: false,
      throughEarpiece: false,
    };
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
    (async () => {
      await Font.loadAsync({
        ...MaterialIcons.font,
        'cutive-mono-regular': require('../assets/fonts/CutiveMono-Regular.ttf'),
      });
      this.setState({ fontLoaded: true });
    })();
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    const source = this.index == 0 ? PLAYLIST[this.index].uri : { uri: PLAYLIST[this.index].uri };//{ uri: PLAYLIST[this.index].uri };
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

  _onStopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
  };

  _onForwardPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(true);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onBackPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(false);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onMutePressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsMutedAsync(!this.state.muted);
    }
  };

  _onLoopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsLoopingAsync(this.state.loopingType !== LOOPING_TYPE_ONE);
    }
  };

  _onShufflePressed = () => {
    // todo: shuffle the playlist array
  };

  _onVolumeSliderValueChange = value => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setVolumeAsync(value);
    }
  };

  _trySetRate = async (rate, shouldCorrectPitch) => {
    if (this.playbackInstance != null) {
      try {
        await this.playbackInstance.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  _onRateSliderSlidingComplete = async value => {
    this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
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

  _getTimestampDiff() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return this._getMMSSFromMillis(this.state.playbackInstanceDuration - this.state.playbackInstancePosition);
    }
    return '';
  }

  _onPosterPressed = () => {
    this.setState({ poster: !this.state.poster });
  };

  _onUseNativeControlsPressed = () => {
    this.setState({ useNativeControls: !this.state.useNativeControls });
  };

  _onFullscreenPressed = () => {
    try {
      this._video.presentFullscreenPlayer();
    } catch (error) {
      console.log(error.toString());
    }
  };

  _onSpeakerPressed = () => {
    this.setState(
      state => {
        return { throughEarpiece: !state.throughEarpiece };
      },
      ({ throughEarpiece }) =>
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: throughEarpiece,
        })
    );
  };

  render() {
    return !this.state.fontLoaded ? <View style={stl.emptyContainer} /> : <View style={stl.container}>
        <View style={stl.grid}>
          <View style={stl.albumCover}>
            <ImageBackground style={{ width: 200, height: 200 }} resizeMode="contain" source={require("../assets/default.jpg")} />
          </View>
          <View style={stl.playbackProgress}>
            <Slider trackImage={ICON_TRACK_1.module} thumbImage={ICON_THUMB_1.module} value={this._getSeekSliderPosition()} onValueChange={this._onSeekSliderValueChange} onSlidingComplete={this._onSeekSliderSlidingComplete} disabled={this.state.isLoading} />
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  stl.text,
                  stl.buffering,
                  { fontFamily: "cutive-mono-regular" }
                ]}
              >
                {this.state.isBuffering ? BUFFERING_STRING : ""}
              </Text>
              <Text
                style={[
                  stl.text,
                  stl.timestamp,
                  { fontFamily: "cutive-mono-regular" }
                ]}
              >
                {this._getTimestamp().split("/")[0]}
              </Text>
              <Text
                style={[
                  stl.text,
                  stl.timestamp,
                  { fontFamily: "cutive-mono-regular", marginLeft: "auto" }
                ]}
              >
                {"-" +
                  this._getTimestampDiff() /* {this._getTimestamp().split('/')[1] - this._getTimestamp().split('/')[0]} */}
              </Text>
            </View>
          </View>
          <View style={stl.songTitle}>
            <Text style={[stl.text, { fontWeight: "700", fontSize: 20 }]}>
              {this.state.playbackInstanceName}
            </Text>
            <View style={{ flexDirection: "row", width: "100%", height: 20, flexWrap: "nowrap" }}>
              <Animatable.Text animation="bounceOutRight" duration={9000} easing="ease-out" iterationCount="infinite" style={[stl.text, { fontWeight: "300", fontSize: 15, color: "red", width: "70%" }]}>
                {this.state.playbackInstanceName + " - Single "}
              </Animatable.Text>
              <Animatable.Text animation="bounceInLeft" duration={9000} easing="ease-in" iterationCount="infinite" style={[stl.text, { fontWeight: "300", fontSize: 15, color: "red", width: "70%" }]}>
                {this.state.playbackInstanceName + " - Single "}
              </Animatable.Text>
            </View>
          </View>
          <View style={[stl.buttonsContainerBase, stl.buttonsContainerTopRow, { opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0 }]}>
            <TouchableHighlight underlayColor={BACKGROUND_COLOR} style={stl.wrapper} onPress={this._onBackPressed} disabled={this.state.isLoading}>
              <IconBase style={stl.button} name="md-rewind" style={{ fontSize: 50 }} />
            </TouchableHighlight>
            <TouchableHighlight underlayColor={BACKGROUND_COLOR} style={stl.wrapper} onPress={this._onPlayPausePressed} disabled={this.state.isLoading}>
              <IconBase style={stl.button} name={this.state.isPlaying ? "md-pause" : "md-play"} style={{ fontSize: 40 }} />
            </TouchableHighlight>
            {/* <TouchableHighlight underlayColor={BACKGROUND_COLOR} style={stl.wrapper} onPress={this._onStopPressed} disabled={this.state.isLoading}>
            <IconBase style={stl.button} name="ios-square" style={{ fontSize: 30 }} />
            </TouchableHighlight> */}
            <TouchableHighlight underlayColor={BACKGROUND_COLOR} style={stl.wrapper} onPress={this._onForwardPressed} disabled={this.state.isLoading}>
              <IconBase style={stl.button} name="md-fastforward" style={{ fontSize: 50 }} />
            </TouchableHighlight>
          </View>
          <View style={stl.volumeContainer}>
            <TouchableHighlight underlayColor={BACKGROUND_COLOR} style={stl.wrapper} onPress={this._onMutePressed}>
              <IconBase style={stl.button} name="ios-volume-mute" style={{ fontSize: 30 }} />
            </TouchableHighlight>
            <Slider style={stl.volumeSlider} trackImage={ICON_TRACK_1.module} thumbImage={ICON_THUMB_2.module} value={1} onValueChange={this._onVolumeSliderValueChange} />
            <TouchableHighlight underlayColor={BACKGROUND_COLOR} style={stl.wrapper} onPress={this._onMutePressed}>
              <IconBase style={stl.button} name={this.state.muted ? "ios-volume-off" : "ios-volume-up"} style={{ fontSize: 30 }} />
            </TouchableHighlight>
          </View>
          <View style={stl.redIcons}>
            <IconBase name="ios-cloud-download-outline" style={{ fontSize: 30, color: "red" }} />
            <IconBase name="ios-radio-outline" style={{ fontSize: 30, color: "red" }} />
            <IconBase name="ios-more" style={{ fontSize: 30, color: "red" }} />
          </View>
          <Hr />
          <View style={stl.shuffleRepeatControls}>
          <Button iconLeft light style={{ width: 110 }} onPress={this._shufflePressed}>
              <IconBase name="ios-shuffle" style={{ fontSize: 26, color: "red" }} />
            <Text style={{ fontSize: 17, color: "red" }}>Shuffle</Text>
            </Button>
          <Button iconLeft light style={{ width: 100 }} onPress={this._onLoopPressed}>
            <IconBase name="ios-repeat" style={{ fontSize: 26, color: "red" }} />
            <Text style={{ fontSize: 17, color: "red" }}>{ this.state.loopingType == 0 ? "All" : "1" }</Text>
            </Button>
          </View>
          <Hr />
          <View style={stl.upNextList}>
            <Text>upNextList</Text>
          </View>
        </View>
        <View />
        
        <View style={stl.videoContainer}>
          <Video ref={this._mountVideo} style={[stl.video, { opacity: this.state.showVideo ? 1.0 : 0.0, width: this.state.videoWidth, height: this.state.videoHeight }]} resizeMode={Video.RESIZE_MODE_CONTAIN} onPlaybackStatusUpdate={this._onPlaybackStatusUpdate} onLoadStart={this._onLoadStart} onLoad={this._onLoad} onError={this._onError} onFullscreenUpdate={this._onFullscreenUpdate} onReadyForDisplay={this._onReadyForDisplay} useNativeControls={this.state.useNativeControls} />
        </View>   
      </View>;
  }
}

const stl = StyleSheet.create({
  emptyContainer: {
    alignSelf: "stretch",
    backgroundColor: BACKGROUND_COLOR
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: BACKGROUND_COLOR
  },
  grid: {
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 30,
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH - 10
  },
  albumCover: {},
  playbackProgress: {
    //alignSelf: 'stretch',
    width: "90%",
    marginTop: 20,
    justifyContent: "flex-start"
  },
  songTitle: {
    maxWidth: "90%",
    alignItems: "center"
  },
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE
  },
  buffering: {
    textAlign: "left",
    paddingLeft: 20
  },
  timestamp: {
    textAlign: "right",
    paddingRight: 20
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
    maxWidth: DEVICE_WIDTH / 2.0
  },
  volumeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: DEVICE_WIDTH / 2.0,
    width: "90%"
  },
  volumeSlider: {
    width: "90%"
  },
  redIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%"
  },
  shuffleRepeatControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%"
  },
  videoContainer: {
    height: 0//VIDEO_CONTAINER_HEIGHT
  },
  video: {
    maxWidth: DEVICE_WIDTH
  },
  button: {},
  wrapper: {}
});

const Hr = () => {
  return <View style={{ borderTopWidth: 0.4, width: '90%', marginVertical: 30, marginHorizontal: 10 }}>
    <Text></Text>
  </View>
}