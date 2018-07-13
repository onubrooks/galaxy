import React, { Component } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView
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

export class EditProfileScreen extends Component {
         static navigationOptions = { tabBarVisible: false };
         constructor(props) {
           super(props);
           this.state = { isModalVisible: false, selected: "key1", removePhoto: false, newPhoto: null };
         }
         onValueChange(value) {
           this.setState({ selected: value });
         }
         saveAndGoBack = () => {
           // dispatch a redux action
           console.log("profile updated...");
           // then go back
           this.props.navigation.goBack();
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
                       <Label>Name</Label>
                       <Input value="Steve Rogers" />
                     </Item>
                     <Item floatingLabel last>
                       <Label>Username</Label>
                       <Input />
                     </Item>
                     <Item floatingLabel>
                       <Label>Email</Label>
                       <Input />
                     </Item>
                     <Item floatingLabel last>
                       <Label>Phone Number</Label>
                       <Input keyboardType={"numeric"} />
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
                       <Textarea rowSpan={5} bordered placeholder="Textarea" />
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
