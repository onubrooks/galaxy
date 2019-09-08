import React, { Component } from "react";
import {
  AsyncStorage,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions
} from "react-native";
import Axios from "axios";
import * as WebBrowser from 'expo-web-browser';
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
  Text
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "../../../components/styles";
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

// redux related imports
import { connect } from "react-redux";
import {
  fetchFeed
} from "../../../actions/actions";

import Modal from "react-native-modal";
import { ProfileScreenModalContent } from "../../../components/ModalContent";

const PUSH_ENDPOINT = "https://api.leedder.com/api/v1.0/auth/reset/password";

export class PasswordScreen extends Component {
         static navigationOptions = { tabBarVisible: false };
         constructor(props) {
           super(props);
           this.state = { isModalVisible: false, oldPassword: "", newPassword: "", newPasswordConfirm: "", loading: false };
         }
         saveAndGoBack = async () => {
           if(!this.state.oldPassword) {
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
           let userId = await AsyncStorage.getItem("userToken");
           Axios(PUSH_ENDPOINT, {
             method: 'post',
             data: {email: this.props.user.email, password: this.state.newPassword }
             // data: { ...this.state, userId }
           })
             .then(res => {
               console.log("response ", res.data);
               if (res.data) {
                 this.props.navigation.goBack();
               } else {
                 alert("Password reset unsuccessful, please try again...");
                 this.setState({ loading: false });
               }
             })
             .catch(error => {
               console.log(error);
               alert("Something went wrong, please try again...");
               this.setState({ loading: false });
             });
           // then go back
           
         };

         resetPassword = async () => {
           let result = await WebBrowser.openBrowserAsync("https://leedder.com/");
           //this.setState({ result });
         };
         render() {
           return <Container style={styles.container}>
               <Header style={[styles.header, { backgroundColor: "white" }]} >
                 <Left style={{ maxWidth: 50 }}>
                   <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                   <Ionicons name="md-close" size={33} color={styles.primaryColor} />
                   </TouchableOpacity>
                 </Left>
                 <Body>
                   <Text style={stl.heading}>Change Password</Text>
                 </Body>
                 <Right>
                   {this.state.oldPassword && this.state.newPassword && this.state.newPasswordConfirm ? <Button onPress={this.saveAndGoBack} transparent>
                       <Icon style={{ color: primaryColor }} name="md-checkmark" />
                     </Button> : <Button disabled transparent>
                       <Icon name="md-checkmark" />
                     </Button>}
                 </Right>
               </Header>
               <Content>
                 <View style={stl.grid}>
                   <Form style={{ alignSelf: "stretch" }}>
                     <Item>
                       <Input placeholder="Current Password" value={this.state.oldPassword} onChangeText={text => this.setState(
                             { oldPassword: text }
                           )} secureTextEntry={true} />
                     </Item>
                     <Item>
                       <Input placeholder="New Password" value={this.state.newPassword} onChangeText={text => this.setState(
                             { newPassword: text }
                           )} secureTextEntry={true} />
                     </Item>
                     <Item>
                       <Input placeholder="New Password, again" value={this.state.newPasswordConfirm} onChangeText={text => this.setState(
                             { newPasswordConfirm: text }
                           )} secureTextEntry={true} />
                     </Item>
                     <Text note style={stl.note}>
                       If you forgot your password, you can <Text style={stl.reset} onPress={this.resetPassword}>
                         reset it online.
                       </Text>
                     </Text>
                   </Form>
                 </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordScreen);

const primaryColor = styles.primaryColor;
const stl = StyleSheet.create({
  grid: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 10,
    marginLeft: 4
  },
  heading: {
    fontWeight: "900",
    color: primaryColor
  },
  reset: {
    color: primaryColor,
  },
  note: {
    marginLeft: 10
  }
});

const Hr = () => {
  return <View style={{ borderTopWidth: 0.4, width: DEVICE_WIDTH, marginHorizontal: 1 }}>
    <Text />
  </View>;
}
