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
  Thumbnail
} from "native-base";
import { Dropdown } from "react-native-material-dropdown";
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
  constructor(props) {
    super(props);
    this.state = { isModalVisible: false };
  }
  saveAndGoBack = () => {
    // dispatch a redux action
    console.log('profile updated...');
    // then go back
    this.props.navigation.goBack();
  }
  setModalVisible = (visible) => {
    this.setState({ isModalVisible: visible });
  }
  render() {
    let data = [{ value: "Male" }, { value: "Female" }];
    return <Container style={styles.container}>
        <Header style={[styles.header, { backgroundColor: "white" }]} searchBar rounded>
        <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="md-close" />
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
          <KeyboardAvoidingView behavior="position" enabled>
            <View style={stl.grid}>
              <TouchableOpacity activeOpacity={0.9} style={stl.changePhoto} onPress={() => this.setModalVisible(true)}>
                <Thumbnail large style={stl.thumbnail} source={onu} />
                <Text style={stl.changePhotoText}>Change Photo</Text>
              </TouchableOpacity>
              <Form style={{alignSelf:'stretch'}}>
                <Item floatingLabel>
                  <Label>Name</Label>
                  <Input value="Steve Rogers"/>
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
                  <Input />
                </Item>
                <Item floatingLabel last>
                  <Label>Gender</Label>
                  <Dropdown
                    label='Gender'
                    data={data} />
                </Item>
                <Item floatingLabel last>
                  <Label>Bio</Label>
                  <Textarea rowSpan={5} bordered placeholder="Textarea" />
                </Item>
              </Form>
            </View>
            <View style={{height:10}} />
          </KeyboardAvoidingView>
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
