import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions
} from "react-native";
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
const onu = require("../../../assets/onu.jpg");
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

// redux related imports
import { connect } from "react-redux";
import {
  fetchFeed
} from "../../../actions/actions";

import Modal from "react-native-modal";
import { ProfileScreenModalContent } from "../../../components/ModalContent";

const PUSH_ENDPOINT = "http://api.leedder.com/api/edit/profile";


export class EditProfileScreen extends Component {
  static navigationOptions = { tabBarVisible: false };
  constructor(props) {
    super(props);
    this.state = { isModalVisible: false, selected: "key1", removePhoto: false, newPhoto: null, fullname: '', email: '', username: '', phone: '', bio: '' };
  }
  onValueChange(value) {
    this.setState({ selected: value });
  }
  saveAndGoBack = async () => {
    if (!this.state.oldPassword) {
      alert("please enter your old password");
      return;
    }
    if (!this.state.newPassword) {
      alert("please enter your new password");
      return;
    }
    if (this.state.newPassword != this.state.newPasswordConfirm) {
      alert("passwords do not match");
      return;
    }
    this.setState({ loading: true });
    let userId = this.props.user.id;
    fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...this.state, userId }),
    }).then((response) => response.json()).then(async (data) => {
      console.log(data);
      if (data) {
        this.props.navigation.goBack();
      } else {
        alert('Profile edit unsuccessful, please try again...');
        this.setState({ loading: false });
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
         };
         pickNewPhoto = async () => {
           const result = await Expo.ImagePicker.launchImageLibraryAsync(
             {
               allowsEditing: false,
               base64: true
             }
           );
           if (!result.cancelled) {
             this.setState({ newPhoto: result });
           }
         };
         render() {
           let { user } = this.props;
           return <Container style={styles.container}>
               <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor="#006E8C">
                 <Left style={{ maxWidth: 50 }}>
                   <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                     <Ionicons name="md-close" size={33} color="#006E8C" />
                   </TouchableOpacity>
                 </Left>
                 <Body>
                   <Text style={stl.heading}>Edit Profile</Text>
                 </Body>
                 <Right>
                   <Button onPress={this.saveAndGoBack} transparent>
                     <Icon name="md-checkmark" style={{ color: primaryColor }} />
                   </Button>
                 </Right>
               </Header>
               <Content>
                 <View style={stl.grid}>
                   <TouchableOpacity activeOpacity={0.9} style={stl.changePhoto} onPress={() => this.setModalVisible(true)}>
                     <Thumbnail large style={stl.thumbnail} source={this.state.newPhoto ? { uri: this.state.newPhoto.uri } : this.state.removePhoto ? require("../../../assets/avatar.png") : onu} />
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
                       <Picker note mode="dropdown" style={{ width: 120 }} selectedValue={this.state.selected} onValueChange={this.onValueChange.bind(this)}>
                         <Picker.Item label="Male" value="male" />
                         <Picker.Item label="Female" value="female" />
                       </Picker>
                     </Item>
                     <Item floatingLabel last>
                       <Label>Bio</Label>
                     <Textarea rowSpan={5} bordered placeholder="Textarea" onChangeText={(val) => this.setState({ bio: val })} value={this.state.bio}/>
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
  fetchFeed
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);

const primaryColor = "#006E8C";
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
    color: "#006E8C"
  },
  changePhoto: { 
    alignItems: 'center', 
    justifyContent: 'space-between' ,
    height: DEVICE_HEIGHT / 5,
    width: DEVICE_WIDTH / 3
  },
  changePhotoText: {
    color: primaryColor,
    fontSize: 18,
    fontWeight: '600'
  }
});
