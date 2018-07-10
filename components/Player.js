class PlaylistItem {
  constructor(name, uri, isVideo) {
    this.name = name;
    this.uri = uri;
    this.isVideo = isVideo;
  }
}

const PLAYLIST = [
  new PlaylistItem("Track 1", require("../audio/1.mp3"), false)
];
 export class Player {
   constructor() {
     Audio.setAudioModeAsync({
       allowsRecordingIOS: false,
       interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
       playsInSilentModeIOS: true,
       shouldDuckAndroid: true,
       interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
     });
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

   _onLoadStart = () => {
     console.log(`ON LOAD START`);
   };

   _onLoad = status => {
     console.log(`ON LOAD : ${JSON.stringify(status)}`);
   };

   _onError = error => {
     console.log(`ON ERROR : ${error}`);
   };

   _advanceIndex(forward) {
     this.index = (this.index + (forward ? 1 : PLAYLIST.length - 1)) % PLAYLIST.length;
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
 }