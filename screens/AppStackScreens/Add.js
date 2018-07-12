import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Keyboard
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
  Textarea
} from "native-base";
import styles from "../../components/styles";
const onu = require("../../assets/onu.jpg");
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");


export class Add extends Component {
  cont;
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      coverArt: null
    };
  }
  
  saveAndGoBack = () => {
    // dispatch a redux action
    this.setState({ audio: null, coverArt: null });
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
    let audioLabel = this.state.audio ? this.state.audio.name : "Choose Song(.mp3, .wav)";
    let coverArtUri = this.state.coverArt ? this.state.coverArt.uri : null;
    return <Container style={styles.container}>
      <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor="#006E8C">
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="md-close" />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={stl.heading}>Upload a Song</Text>
          </Body>
          <Right>
            <Button onPress={this.saveAndGoBack} transparent>
              <Icon name="md-checkmark" style={{ color: primaryColor }} />
            </Button>
          </Right>
        </Header>
        <Content>
        <View style={stl.grid}>
            <View style={stl.col1}>
            <ImageBackground style={{ flex: 1 }} resizeMode="contain" source={coverArtUri ? { uri: coverArtUri } : require("../../assets/default.jpg")} />
              <TouchableOpacity onPress={this.pickCoverArt}>
                <Text>Cover Art (Optional)</Text>  
              </TouchableOpacity>
            </View>
            <View style={stl.col2}>
              <Form style={{ alignSelf: "stretch" }}>
                <Item floatingLabel>
                  <Label>Title</Label>
                  <Input />
                </Item>
                <Item style={{ marginTop: 30 }}>
                  <TouchableOpacity onPress={this.pickAudio}>
                    <Label>{audioLabel}</Label>
                  </TouchableOpacity>
                </Item>
                <Item floatingLabel last>
                  <Label>Description</Label>
                  <Textarea rowSpan={5} bordered placeholder="About the song" />
                </Item>
              </Form>
            </View>
          </View>
        </Content>
      </Container>;
  }
}

export default Add;

const primaryColor = "#006E8C";
const stl = StyleSheet.create({
  grid: {
    backgroundColor: '#fff',
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    // alignItems: 'center',
    marginVertical: 30,
    // height: DEVICE_HEIGHT
  },
  heading: {
    fontWeight: '900',
  },
  col1: {
    width: 150,
    height: 150,
    //backgroundColor: 'yellow',
    marginLeft: 20
  },
  col2: {
    //width: 500,
    //alignItems: 'stretch', 
  }
});

