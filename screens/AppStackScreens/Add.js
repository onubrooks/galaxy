import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Form,
  Item,
  Input,
  Label,
  Text,
  Textarea,
  Toast,
  Spinner
} from "native-base";
import styles from "../../components/styles";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import { connect } from "react-redux";
import { uploadSongAsync } from "../../actions/actions";

export class Add extends Component {
  cont;
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      coverArt: null,
      title: '',
      desc: '',
      uploading: false
    };
  }
  
  uploadSongAsync = async () => {
    if (this.state.title === "") {
      alert("please set a title for the song...");
      return;
    }
    if (this.state.audio === null) {
      alert("please choose a song...");
      return;
    }
    if (this.state.coverArt === null) {
      alert("please choose a cover art...");
      return;
    }
    let { user } = this.props;
    let song = this.state;
    let data = new FormData();
    data.append("title", song.title);
    data.append("desc", song.desc);
    data.append("userId", user.id);
    data.append("song", {
      type: `audio/mpeg`,
      uri: song.audio.uri,
      name: "song"
    });
    data.append("coverart", {
      type: `image/${song.coverArt.uri.slice(-3)}`,
      uri: song.coverArt.uri,
      name: "coverArt"
    });
  // axios isnt working so I use xhr for this one
  this.setState({uploading: true})
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.leedder.com/api/v1.0/files/song/upload");
    xhr.setRequestHeader("content-type", "multipart/form-data");
    xhr.setRequestHeader("Accept", "application/json");
    const token = await AsyncStorage.getItem("userToken");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.send(data);
    let that = this;
    xhr.onreadystatechange = function() {
      try{
        let res = JSON.parse(this.responseText);
        console.log('result', res);
      } catch(e) {
        console.log(e)
      }
      if (this.readyState === 4 && this.status === 200) {
        if(!res.error){
          Toast.show({
            text: "song upload successful...",
            position: "bottom",
            duration: 3000
          });
          that.setState({
            audio: null,
            coverArt: null,
            title: "",
            desc: ""
          });
        } else {
          Toast.show({
            text: "Opertion failed, please try again...",
            position: "bottom",
            duration: 3000
          });
        }
      } else {
        Toast.show({
          text: 'Network error, please check your connection...',
          position: "bottom",
          duration: 3000
        });
      }
      that.setState({ uploading: false });
    };
}
  saveAndGoBack = () => {
    if(this.state.title === '') {
      alert('please set a title for the song...')
      return
    }
    if(this.state.audio === null) {
      alert('please choose a song...')
      return
    }
    
    let { user } = this.props;
    this.props.uploadSongAsync(this.state, user.id)
    Toast.show({
      text: 'posting song...',
      position: "bottom",
      duration: 2000
    });
    // dispatch a redux action
    this.setState({ audio: null, coverArt: null, title: '', desc: ''});
    // then go back
    this.props.navigation.goBack();
  };
  pickAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*' // audio/mpeg, audio/mp4, audio/vnd.wav
    });
    if (result.type == 'success') {
      this.setState({ audio: result });
    }
  }
  pickCoverArt = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      // base64: true
    });
    if (!result.cancelled) {
      this.setState({ coverArt: result });
    }
  };

  render() {
    let audioLabel = this.state.audio ? this.state.audio.name : "Choose File";
    let coverArtUri = this.state.coverArt ? this.state.coverArt.uri : null;
    return (
      <Container style={styles.container}>
        <Content>
          <ScrollView style={stl.grid}>
            {this.state.uploading ? (
              <Spinner style={{ marginTop: 5 }} />
            ) : null}
            <View onPress={this.pickCoverArt} style={stl.col1}>
              <View style={stl.col1inner}>
                <TouchableOpacity onPress={this.pickCoverArt}>
                  <Image
                    source={
                      coverArtUri
                        ? { uri: coverArtUri }
                        : require("../../assets/icons/default.png")
                    }
                    style={{width: 140, height: 140}}
                  />
                  <Text>Cover Art (Optional)</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={stl.col2}>
              <Form>
                <Item style={stl.item} last>
                  <Input
                    placeholder="Song Title"
                    placeholderTextColor="#888888"
                    onChangeText={title => this.setState({ title })}
                    value={this.state.title}
                  />
                </Item>
                <Item style={stl.item} last>
                  <Input
                    placeholder="Song Description"
                    placeholderTextColor="#888888"
                    onChangeText={desc => this.setState({ desc })}
                    value={this.state.desc}
                  />
                </Item>
                <Item style={[stl.item, { height: 48 }]} last>
                  <Input
                    placeholder={audioLabel}
                    placeholderTextColor="#888888"
                    disabled
                  />
                  <Button onPress={this.pickAudio} transparent>
                    <Text>Browse</Text>
                  </Button>
                </Item>
                <Button
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 10,
                    borderRadius: 8,
                    backgroundColor: styles.primaryColor
                  }}
                  onPress={this.uploadSongAsync}
                  disabled={this.state.uploading}
                >
                  <Text>Upload Song</Text>
                </Button>
              </Form>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  uploadSongAsync
};
export default connect(mapStateToProps, mapDispatchToProps)(Add);

const stl = StyleSheet.create({
  grid: {
    backgroundColor: "#fff",
    // marginTop: 15
    // height: DEVICE_HEIGHT
  },
  heading: {
    fontWeight: "900",
    color: styles.primaryColor
  },
  col1: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 260,
    marginTop: 0,
    backgroundColor: "#EFEFEF"
    //marginLeft: 20
  },
  col1inner: {
    backgroundColor: "white",
    width: "65%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20
  },
  col2: {
    //width: 500,
    //alignItems: 'stretch',
  },
  item: {
    backgroundColor: "#EFEFEF",
    width: "79%",
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginLeft: 40,
    borderRadius: 7,
  }
});

