import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Audio, Video } from 'expo-av';
import { Asset } from 'expo-asset';
import * as Font from "expo-font";
import { MaterialIcons } from '@expo/vector-icons';
import { Icon as IconBase, Button, Toast } from "native-base";
import * as Animatable from "react-native-animatable";

let defaultPlaylist = [
  {
    songPath:
      "https://freemusicdownloads.world/wp-content/uploads/2017/05/A-Boogie-Wit-Da-Hoodie-Drowning-WATER-ft-Kodak-Black-Official-Audio.mp3",
    songTitle: "Drowning",
    songId: "default1"
  },
  {
    songPath:
      "https://archive.org/download/Mp3Playlist_555/AaronNeville-CrazyLove.mp3",
    songTitle: "Aaron Neville – “Crazy Love”",
    songId: "default2"
  },
  {
    songPath:
      "https://archive.org/download/Mp3Playlist_555/Daughtry-Homeacoustic.mp3",
    songTitle: "Daughtry - “Home ”",
    songId: "default3"
  },
  {
    songPath:
      "https://archive.org/download/Mp3Playlist_555/JohnPagano-changeInMyLife.mp3",
    songTitle: "Change In My Life",
    songId: "default4"
  }
];

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF';//'#FFF8ED';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = '... loading ...';
const BUFFERING_STRING = '';
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = DEVICE_HEIGHT * 2.0 / 5.0 - FONT_SIZE * 2;

/**let playerService = new PlayerSingleton;
 ** a bit of a hack here: the above line wasnt producing the singleton behaviour 
 ** expected so making player service in OldPlayer.js an export and importing and 
 ** using it here seems to produce the expected behaviour!
**/
import { playerService } from "./OldPlayer";

export default class PlaylistPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.unmounted = false;
    this.index = 0;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.state = {
      defaultPlaylist:
        props.playlist.length && props.playlist ? false : true,
      playlist:
        (props.playlist.length && props.playlist) || defaultPlaylist,
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
      show: true,
      throughEarpiece: false
    };
  }

  componentDidMount() {
    if (this.unmounted) return;
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true
    });
    (async () => {
      await Font.loadAsync({
        'cutive-mono-regular': require('../assets/fonts/CutiveMono-Regular.ttf'),
      });
      this.setState({ fontLoaded: true });
      this._updatePlaybackInstanceForIndex(true);
    })();
  }

  componentWillUnmount() {
    this.unmounted = true;
    if (this.playbackInstance != null) {
      this.playbackInstance.unloadAsync();
    }
  }

  removeFromPlaylist = (songId, idx) => {
    this.setState({playlist: this.state.playlist.filter((item, index) => index !== idx)});
    if(!this.state.defaultPlaylist) {
      this.props.unBookmarkASong(songId, this.props.userId);
    }
    console.log("length", this.state.playlist.length)
    if(this.state.playlist.length - 1 === 0) {
      Toast.show({
        text: "Your playlist is empty, default playlist loaded...",
        position: "bottom",
        duration: 5000
      });
      this.setState({ playlist: defaultPlaylist })
    }
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.unmounted) return;
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }
    const source = { uri: (this.state.playlist.length && this.state.playlist[this.index].songPath) };
    const initialStatus = {
      shouldPlay: playing,
      rate: this.state.rate,
      shouldCorrectPitch: this.state.shouldCorrectPitch,
      volume: this.state.volume,
      isMuted: this.state.muted,
      isLooping: this.state.loopingType === LOOPING_TYPE_ONE,
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      // androidImplementation: 'MediaPlayer',
    };

    const { sound, status } = await Audio.Sound.createAsync(source, initialStatus, this._onPlaybackStatusUpdate);
    this.playbackInstance = sound;
    playerService.addPlayer(this.playbackInstance);

    this._updateScreenForLoading(false);
  }

  _mountVideo = component => {
    if (this.unmounted) return;
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
        playbackInstanceName: this.state.playlist[this.index].songTitle,
        showVideo: this.state.playlist.length && this.state.playlist[this.index].isVideo,
        isLoading: false
      });
    }
  }

  _onPlaybackStatusUpdate = status => {
    if (this.unmounted) return;
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
    if (this.unmounted) return;
    console.log(`ON LOAD START`);
  };

  _onLoad = status => {
    if (this.unmounted) return;
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  _onError = error => {
    if (this.unmounted) return;
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
    if (this.unmounted) return;
    this.index = (this.index + (forward ? 1 : this.state.playlist.length - 1)) % this.state.playlist.length;
  }

  _setIndex(index) {
    if (this.unmounted) return;
    // set index to the index passed to the function and then play
    // this function should be called when a particular track in the 
    // upNext list is pressed
      this.index = index;
      this._updatePlaybackInstanceForIndex(true);
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
    playerService.stopAll();
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
    // todo: shuffle the this.state.playlist array
    this.setState({playlist: shuffle(this.state.playlist)});
    //PLAYLIST = shuffle(PLAYLIST);
    this._setIndex(0);
  };

  _onVolumeSliderValueChange = value => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setVolumeAsync(value);
    }
  };

  _trySetRate = async (rate, shouldCorrectPitch) => {
    if (this.unmounted) return;
    if (this.playbackInstance != null) {
      try {
        await this.playbackInstance.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  _onRateSliderSlidingComplete = async value => {
    if (this.unmounted) return;
    this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
  };

  _onPitchCorrectionPressed = async value => {
    this._trySetRate(this.state.rate, !this.state.shouldCorrectPitch);
  };

  _onSeekSliderValueChange = value => {
    if (this.unmounted) return;
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.unmounted) return;
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
    if (this.unmounted) return;
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
    if (this.unmounted) return;
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
    if (this.unmounted) return;
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
    if (this.unmounted) return;
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
    if (this.unmounted) return;
    this.setState({ poster: !this.state.poster });
  };

  _onUseNativeControlsPressed = () => {
    if (this.unmounted) return;
    this.setState({ useNativeControls: !this.state.useNativeControls });
  };

  _onFullscreenPressed = () => {
    if (this.unmounted) return;
    try {
      this._video.presentFullscreenPlayer();
    } catch (error) {
      console.log(error.toString());
    }
  };

  _onSpeakerPressed = () => {
    if (this.unmounted) return;
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
    // this._setIndex(0);
    return !this.state.fontLoaded ? <View style={stl.emptyContainer} /> : <View style={stl.container}>
        <View style={stl.grid}>
          <Text style={{color: '#555555', fontFamily: 'Segoe UI Bold', marginVertical: 20}}>Now Playing</Text>
          <View style={stl.albumCover}>
            <ImageBackground style={{ width: 220, height: 220 }} resizeMode="contain" source={(this.state.playlist.length && this.state.playlist[this.index].coverPath && { uri: this.state.playlist[this.index].coverPath }) || require("../assets/default.jpg")} />
          </View>
          <View style={stl.playbackProgress}>
            <Slider value={this._getSeekSliderPosition()} onValueChange={this._onSeekSliderValueChange} onSlidingComplete={this._onSeekSliderSlidingComplete} disabled={this.state.isLoading} />
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
          <View style={[stl.buttonsContainerBase, stl.buttonsContainerTopRow, { opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0 }]}>
            <TouchableHighlight underlayColor={BACKGROUND_COLOR} style={[{backgroundColor: this.state.loopingType == 0 ? "#efefef" : "#fff"}, stl.wrapper]} onPress={this._onLoopPressed} disabled={this.state.isLoading}>
              <IconBase name="ios-refresh" style={stl.playbackIcons} />
            </TouchableHighlight>
            <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "space-between", width: '30%'}}>
                <TouchableHighlight underlayColor={BACKGROUND_COLOR} style={stl.wrapper} onPress={this._onBackPressed} disabled={this.state.isLoading}>
                <IconBase name="ios-skip-backward" style={stl.playbackIcons} />
              </TouchableHighlight>
              <TouchableHighlight underlayColor={BACKGROUND_COLOR} style={stl.wrapper} onPress={this._onPlayPausePressed} disabled={this.state.isLoading}>
                <IconBase name={this.state.isPlaying ? "ios-pause" : "ios-play"} style={stl.playbackIcons} />
              </TouchableHighlight>
              <TouchableHighlight underlayColor={BACKGROUND_COLOR} style={stl.wrapper} onPress={this._onForwardPressed} disabled={this.state.isLoading}>
                <IconBase name="ios-skip-forward" style={stl.playbackIcons} />
              </TouchableHighlight>
            </View>
            <TouchableHighlight underlayColor={BACKGROUND_COLOR} style={stl.wrapper} onPress={this._onShufflePressed} disabled={this.state.isLoading}>
              <IconBase name="ios-shuffle" style={stl.playbackIcons} />
            </TouchableHighlight>
          </View>
          {/* <Text style={{ fontSize: 10, color: "red", alignSelf: 'flex-start', marginTop: -30, marginLeft: 20 }}>
                {this.state.loopingType == 0 ? "" : "1"}
              </Text> */}
          <View style={stl.songTitle}>
            <Text style={[stl.text, { fontWeight: "700", fontSize: 20, color: '#555555' }]}>
              {this.state.playbackInstanceName}
            </Text>
          </View>
          
          
        </View>
        <View style={stl.upNextList}>
            {this.state.playlist.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => this._setIndex(idx)}
              >
                <this.UpNext idx={idx} item={item} />
              </TouchableOpacity>
            ))}
          </View>

        {/* <View style={stl.videoContainer}>
          <Video ref={this._mountVideo} style={[stl.video, { opacity: this.state.showVideo ? 1.0 : 0.0, width: this.state.videoWidth, height: this.state.videoHeight }]} resizeMode={Video.RESIZE_MODE_CONTAIN} onPlaybackStatusUpdate={this._onPlaybackStatusUpdate} onLoadStart={this._onLoadStart} onLoad={this._onLoad} onError={this._onError} onFullscreenUpdate={this._onFullscreenUpdate} onReadyForDisplay={this._onReadyForDisplay} useNativeControls={this.state.useNativeControls} />
        </View> */}
      </View>;
  }
  UpNext = (props) => {
    return <View style={{ flexDirection: "row", marginVertical: 2, marginLeft: 30, justifyContent: "space-between", width: "100%", backgroundColor: '#efefef' }}>
      <View style={{ width: "20%", marginTop: 4 }}>
        <Image source={{uri: props.item.coverPath}} style={{ width: 60, height: 60, borderRadius: 5 }} />
      </View>
      <View style={{ width: "60%", justifyContent: "center" }}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 15, fontWeight: "900", fontFamily:'Segoe UI' }}>
          {props.item.songTitle}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 15, fontWeight: "300", fontFamily:'Segoe UI', color: "#BABEC0" }}>
          {props.item.songDescription ? props.item.songDescription : 'Artist'}
        </Text>
      </View>
      <View style={{ width: "20%", marginLeft: "auto", justifyContent: "center" }}>
        <Button transparent onPress={() => this.removeFromPlaylist(props.item.songId, props.idx)}>
          <IconBase name="md-trash" style={{ fontSize: 26, color: "#7A7E80" }} />
        </Button>
      </View>
    </View>;
  };
}

const stl = StyleSheet.create({
  emptyContainer: {
    alignSelf: "stretch",
    backgroundColor: BACKGROUND_COLOR,
    marginTop: 30
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
    backgroundColor: "#efefef",
    justifyContent: "space-around",
    alignItems: "center",
    // marginTop: 30,
    width: DEVICE_WIDTH - 10
  },
  albumCover: {
    marginBottom: 10,
    backgroundColor: 'white'
  },
  playbackProgress: {
    width: "80%",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "flex-start"
  },
  playbackIcons: {
    fontSize: 25,
    color: '#555555',
    fontWeight: 'bold'
  },
  songTitle: {
    maxWidth: "90%",
    alignItems: "center",
    marginBottom: 20
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonsContainerTopRow: {
    maxHeight: 80,
    minWidth: DEVICE_WIDTH / 2.0,
    // maxWidth: DEVICE_WIDTH / 2.0,
    width: '90%'
  },
  volumeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: DEVICE_WIDTH / 2.0,
    marginBottom: 30,
    width: "90%"
  },
  upNextList: {
    backgroundColor: "#fff",
    marginTop: 2,
    marginBottom: 50,
    width: "100%",
    minWidth: DEVICE_WIDTH,
    alignItems: "center",
    height: "auto"
  },
  videoContainer: {
    height: 0 //VIDEO_CONTAINER_HEIGHT
  },
  video: {
    maxWidth: DEVICE_WIDTH
  },
  wrapper: {
    padding: 10
  }
});

const Hr = () => {
  return <View style={{ borderTopWidth: 0.4, width: '90%', marginTop: 20, marginBottom: 10, marginHorizontal: 10 }}>
    <Text></Text>
  </View>
}

function shuffle(o) {
  for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};
//yourArray.sort(function() { return 0.5 - Math.random() });