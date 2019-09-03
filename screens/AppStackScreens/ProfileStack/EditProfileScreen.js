import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions
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
  Right,
  Icon,
  Form,
  Item,
  Input,
  Label,
  Text,
  Textarea,
  Picker,
  Thumbnail
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../../../components/styles";
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

// redux related imports
import { connect } from "react-redux";
import { fetchMyProfile, removeMyPhoto, updateMyPhoto } from "../../../actions/actions";

import Modal from "react-native-modal";
import { ProfileScreenModalContent } from "../../../components/ModalContent";

const PUSH_ENDPOINT = "https://api.leedder.com/api/v1.0/users/profile/edit";
const PUSH_ENDPOINT2 = "https://api.leedder.com/api/v1.0/files/avatar/upload";


export class EditProfileScreen extends Component {
  static navigationOptions = { tabBarVisible: false };
  constructor(props) {
    super(props);
    let { user } = this.props;
    this.state = { isModalVisible: false, selected: "key1", removePhoto: false, newPhoto: null, fullname: user.fullname, email: user.email, username: user.userHandle, phone: "", bio: user.status, gender: user.gender };
  }
  onValueChange(value) {
    this.setState({ selected: value });
  }
  saveAndGoBack = async () => {
    this.setState({ loading: true });
    let userId = this.props.user.id;
    let data = new FormData();
    data.append('fullname', this.state.fullname);
    data.append('email', this.state.email);
    data.append('username', this.state.username);
    data.append('phone', this.state.phone);
    data.append('bio', this.state.bio);
    data.append('userId', userId);
    let endpoint = `${PUSH_ENDPOINT}`;// ?fullname=${this.state.fullname}&email=${this.state.email}&username=${this.state.username}&phone=${this.state.phone}&bio=${this.state.bio}&userId=${userId}`;
    
    Axios(endpoint, {
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then((res) => {
      let data = res.data;
      console.log('response ', data);
      if (data) {
        this.props.fetchMyProfile(this.props.user.id);
        this.props.navigation.goBack();
      } else {
        // alert('Profile edit unsuccessful, please try again...');
        // this.setState({ loading: false });
        this.props.navigation.goBack();
      }
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong, please try again...');
      this.setState({ loading: false });
    });
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
           const result = await Expo.ImagePicker.launchImageLibraryAsync(
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
           
           return <Container style={styles.container}>
               <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor={styles.primaryColor}>
                 <Left style={{ maxWidth: 50 }}>
                   <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                     <Ionicons name="md-close" size={33} color={styles.primaryColor} />
                   </TouchableOpacity>
                 </Left>
                 <Body>
                   <Text style={stl.heading}>Edit Profile</Text>
                 </Body>
                 <Right>
                   <Button onPress={this.saveAndGoBack} transparent>
                     <Icon name="md-checkmark" style={{ color: styles.primaryColor }} />
                   </Button>
                 </Right>
               </Header>
               <Content>
                 <View style={stl.grid}>
                   <TouchableOpacity activeOpacity={0.9} style={stl.changePhoto} onPress={() => this.setModalVisible(true)}>
                   <Thumbnail large style={stl.thumbnail} source={this.state.newPhoto ? { uri: this.state.newPhoto.uri } : this.state.removePhoto || !this.props.user.userAvatar ? require("../../../assets/avatar.png") : { uri: this.props.user.userAvatar}} />
                     <Text style={stl.changePhotoText}>
                       Change Photo
                     </Text>
                   </TouchableOpacity>
                   <Form style={{ alignSelf: "stretch" }}>
                     <Item floatingLabel>
                       <Label>Full Name</Label>
                     <Input onChangeText={(val) => this.setState({ fullname: val })} value={this.state.fullname} />
                     </Item>
                     <Item floatingLabel last>
                       <Label>Username</Label>
                     <Input onChangeText={(val) => this.setState({ username: val })} value={this.state.username}/>
                     </Item>
                     <Item floatingLabel>
                       <Label>Email</Label>
                     <Input onChangeText={(val) => this.setState({ email: val })} value={this.state.email}/>
                     </Item>
                     <Item floatingLabel last>
                       <Label>Phone Number</Label>
                     <Input keyboardType={"numeric"} onChangeText={(val) => this.setState({ phone: val })} value={this.state.phone} />
                     </Item>
                     <Item style={{ justifyContent: "space-between" }}>
                       <Label>Gender</Label>
                     <Picker note onChangeText={(val) => this.setState({ gender: val })} value={this.state.gender} mode="dropdown" style={{ width: 120 }} selectedValue={this.state.selected} onValueChange={this.onValueChange.bind(this)}>
                         <Picker.Item label="Male" value="male" />
                         <Picker.Item label="Female" value="female" />
                       </Picker>
                     </Item>
                     <Item floatingLabel last>
                       <Label>Bio</Label>
                     <Textarea rowSpan={4} bordered placeholder="Textarea" onChangeText={(val) => this.setState({ bio: val })} value={this.state.bio} />
                     </Item>
                   </Form>
                 </View>
                 <View style={{ height: 10 }} />
               </Content>
               <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState(
                     { isModalVisible: false }
                   )}>
                 <ProfileScreenModalContent setModalVisible={this.setModalVisible} />
               </Modal>
             </Container>;
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
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    // height: DEVICE_HEIGHT
  },
  heading: {
    fontWeight: '900',
    color: styles.primaryColor
  },
  changePhoto: { 
    alignItems: 'center', 
    justifyContent: 'space-between' ,
    height: DEVICE_HEIGHT / 5,
    width: DEVICE_WIDTH / 3
  },
  changePhotoText: {
    color: styles.primaryColor,
    fontSize: 18,
    fontWeight: '600'
  }
});
