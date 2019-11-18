import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  AsyncStorage,
  ScrollView,
  Image
} from "react-native";
import Axios from "axios";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Body,
  Left,
  Icon,
  Form,
  Item,
  Input,
  Text,
  Picker,
  Toast,
  Spinner
} from "native-base";
import styles from "../../../components/styles";
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const defaultAvatar = require("../../../assets/avatar.png");

// redux related imports
import { connect } from "react-redux";
import { fetchMyProfile, removeMyPhoto, updateMyPhoto } from "../../../actions/actions";

import Modal from "react-native-modal";
import { ProfileScreenModalContent } from "../../../components/ModalContent";
import * as ImagePicker from "expo-image-picker";
const PUSH_ENDPOINT = "https://api.leedder.com/api/v1.0/users/profile/edit";
const PUSH_ENDPOINT2 = "https://api.leedder.com/api/v1.0/files/avatar/upload";

Axios.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem("userToken");
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export class EditProfileScreen extends Component {
  static navigationOptions = { tabBarVisible: false };
  constructor(props) {
    super(props);
    let { user } = this.props;
    this.state = { isModalVisible: false, selected: "key1", removePhoto: false, newPhoto: null, fullname: user.fullname, email: user.email, username: user.userHandle, phone: "", bio: user.status, sex: user.gender, loading: false };
  }
  onValueChange(value) {
    this.setState({ selected: value });
  }
  updateAsync = async () => {
    this.setState({ loading: true });
    let userId = this.props.user.id;
    let data = new FormData();
    data.append('fullname', this.state.fullname);
    data.append('email', this.state.email);
    data.append('username', this.state.username);
    data.append('phone', this.state.phone);
    data.append('bio', this.state.bio);
    data.append('sex', this.state.sex);
    data.append('userId', userId);
    let endpoint = `${PUSH_ENDPOINT}`;
    
    Axios(endpoint, {
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then((res) => {
      let data = res.data;
      console.log('response ', data.status);
      if (!data.error) {
        Toast.show({
          text: "profile update successful...",
          position: "bottom",
          duration: 3000
        });
        this.props.fetchMyProfile(this.props.user.id);
      } else {
        Toast.show({
          text: "profile update failed...",
          position: "bottom",
          duration: 3000
        });
      }
    }).catch((error) => {
      console.log(error);
      Toast.show({
        text: "operation failed, please check network...",
        position: "bottom",
        duration: 3000
      });
      
    }).finally(() => this.setState({ loading: false }));
    // then go back

  };
  setModalVisible = (visible, options = null) => {
    this.setState({ isModalVisible: visible });
    if (options && options.newPhoto) {
      this.pickNewPhoto();
    }
    if (options && options.removePhoto) {
      this.removePhoto();
    }
  };
  removePhoto = () => {
    this.setState({
      removePhoto: !this.state.removePhoto,
      newPhoto: null
    });
    this.props.removeMyPhoto();
  };
  pickNewPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(
      {
        allowsEditing: true,
        base64: true
      }
    );
  if (!result.cancelled) {
    this.setState({ newPhoto: result });
    this.setState({ loading: true });
      // post the new photo to endpoint
      let data = new FormData();
      data.append('userId', this.props.user.userId);
      data.append('avatar', {
        uri:result.uri,
        name:'userAvatar',
        type:`image/${result.uri.slice(-3)}`
      });
      Axios(PUSH_ENDPOINT2, {
      method: 'post',
      data,
      headers: {
          'Content-Type': 'multipart/form-data',
        }
    })
    .then((res) => {
      this.setState({ loading: false });
      let data = res.data;
      console.log('response ', data);
      this.props.updateMyPhoto(data.avatarUrl);
    }).catch((error) => {
      console.log(error);
      this.setState({ loading: false });
    });
    }
  };
  render() {
    let { user } = this.props;
    return (
      <Container style={styles.container}>
        <Header
          style={[styles.header, { backgroundColor: "white", height: 45 }]}
        >
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon
                name="ios-arrow-back"
                style={{
                  color: styles.headerColor,
                  fontFamily: "Segoe UI Bold",
                  fontSize: 20
                }}
              />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title
              style={{
                color: styles.headerColor,
                fontFamily: "Segoe UI Bold",
                fontSize: 15,
                marginLeft: -10
              }}
            >
              Edit Profile
            </Title>
          </Body>
        </Header>
        <Content>
          <ImageBackground
            source={
              user.userAvatar ? { uri: user.userAvatar } : defaultAvatar
            }
            style={{
              width: "100%",
              height: 250,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={
                user.userAvatar ? { uri: user.userAvatar } : defaultAvatar
              }
              style={{
                width: "50%",
                height: "80%"
              }}
            />
            <Button
              rounded
              bordered
              style={{ marginLeft: 5, position: 'absolute' }}
              onPress={() => this.setModalVisible(true)}
            >
              <Text style={{ color: "white", fontFamily: "Segoe UI Bold" }}>
                Change Picture
              </Text>
            </Button>
            {/* <ImageBackground
              source={
                user.userAvatar ? { uri: user.userAvatar } : defaultAvatar
              }
              style={{
                width: "50%",
                height: "80%",
                backgroundColor: "black",
                opacity: 0.7,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                rounded
                bordered
                style={{ marginLeft: 5 }}
                onPress={() => this.setModalVisible(true)}
              >
                <Text style={{ color: "white", fontFamily:'Segoe UI Bold' }}>Change Picture</Text>
              </Button>
            </ImageBackground> */}
          </ImageBackground>

          <View style={stl.grid}>
            <Form>
              <ScrollView style={{ height: 200, width: DEVICE_WIDTH }}>
                <Item style={stl.item} last>
                  <Input
                    placeholder="Full Name"
                    placeholderTextColor="#888888"
                    onChangeText={val => this.setState({ fullname: val })}
                    value={this.state.fullname}
                  />
                </Item>
                <Item style={stl.item} last>
                  <Input
                    placeholder="Username"
                    placeholderTextColor="#888888"
                    onChangeText={val => this.setState({ username: val })}
                    value={this.state.username}
                  />
                </Item>
                <Item style={[stl.item, { height: 48 }]} last>
                  <Input
                    placeholder="Phone No(Optional)"
                    placeholderTextColor="#888888"
                    onChangeText={val => this.setState({ phone: val })}
                    value={this.state.phone}
                  />
                </Item>
                <Item style={[stl.item, { height: 48 }]}>
                  <Picker
                    note
                    onChangeText={val => this.setState({ sex: val })}
                    value={this.state.sex}
                    mode="dropdown"
                    style={{ width: 120 }}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                  </Picker>
                </Item>
                <Item style={[stl.item, { height: 48 }]} last>
                  <Input
                    placeholder="About Me"
                    placeholderTextColor="#888888"
                    onChangeText={val => this.setState({ bio: val })}
                    value={this.state.bio}
                  />
                </Item>
              </ScrollView>
              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 10,
                  borderRadius: 10,
                  backgroundColor:styles.primaryColor
                }}
                onPress={this.updateAsync}
                disabled={this.state.uploading}
              >
                <Text>Update Profile</Text>
                {this.state.loading ? <Spinner /> : null}
              </Button>
            </Form>
          </View>
          <View style={{ height: 10 }} />
        </Content>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
        >
          <ProfileScreenModalContent
            setModalVisible={this.setModalVisible}
          />
        </Modal>
      </Container>
    );
         }
       }
const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  fetchMyProfile,
  removeMyPhoto,
  updateMyPhoto
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);

const stl = StyleSheet.create({
  grid: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
    //height: DEVICE_HEIGHT / 3 + 40,
    
  },
  heading: {
    fontWeight: "900",
    color: styles.primaryColor,
    fontFamily: "Segoe UI"
  },
  changePhoto: {
    alignItems: "center",
    justifyContent: "space-between",
    height: DEVICE_HEIGHT / 5,
    width: DEVICE_WIDTH / 3
  },
  changePhotoText: {
    color: styles.primaryColor,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Segoe UI"
  },
  item: {
    backgroundColor: "#EFEFEF",
    width: "85%",
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginLeft: 30,
    borderRadius: 7
  }
});
