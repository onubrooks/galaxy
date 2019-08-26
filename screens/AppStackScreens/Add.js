import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image
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
  Form,
  Item,
  Input,
  Label,
  Text,
  Textarea,
  Toast,
  Thumbnail
} from "native-base";
import styles from "../../components/styles";

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
      desc: ''
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
    const result = await Expo.DocumentPicker.getDocumentAsync({
      type: 'audio/*' // audio/mpeg, audio/mp4, audio/vnd.wav
    });
    if (result.type == 'success') {
      this.setState({ audio: result });
    }
  }
  pickCoverArt = async () => {
    const result = await Expo.ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true
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
        {/* <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor={styles.primaryColor}>
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="md-close" style={{ color: styles.primaryColor }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={stl.heading}>Upload a Song</Text>
          </Body>
          <Right>
            <Button onPress={this.saveAndGoBack} transparent>
              <Icon name="md-checkmark" style={{ color: styles.primaryColor }} />
            </Button>
          </Right>
        </Header> */}
        <Content>
          <View style={stl.grid}>
            <View onPress={this.pickCoverArt} style={stl.col1}>
              <View style={stl.col1inner}>
                <TouchableOpacity onPress={this.pickCoverArt}>
                  <Image
                    source={
                      coverArtUri
                        ? { uri: coverArtUri }
                        : require("../../assets/icons/default.png")
                    }
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
                    value={this.state.title}
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
                  style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10, borderRadius: 6 }}
                  onPress={this.saveAndGoBack}
                >
                  <Text>Upload Song</Text>
                </Button>
              </Form>
            </View>
          </View>
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
    marginVertical: 30
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
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginLeft: 40,
    borderRadius: 7,
  }
});

