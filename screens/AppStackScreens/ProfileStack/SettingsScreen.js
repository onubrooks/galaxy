import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  AsyncStorage
} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import {
  Container,
  Header,
  Content,
  Body,
  Left,
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

export class SettingsScreen extends Component {
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
  _signOutAsync = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  }
  showTos = async () => {
    let result = await WebBrowser.openBrowserAsync('http://leedder.com/leedder/tos');
    //this.setState({ result });
  };
  render() {
    return <Container style={styles.container}>
      <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor={styles.primaryColor}>
        <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="md-arrow-back" size={33} color={styles.primaryColor} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{fontWeight: '500', color:styles.primaryColor}}>Settings</Text>
          </Body>
        </Header>
        <Content>
          <View style={stl.grid}>
            <Text style={stl.group}>Account</Text>
            <Text style={stl.item} onPress={() => this.props.navigation.navigate('Password')}>Password</Text>
          {/* <Text style={stl.item} onPress={() => this.props.navigation.navigate('SavedGrid')}>Saved</Text>
          <Text style={stl.item} onPress={() => this.props.navigation.navigate('Likes')}>Songs You've Liked</Text> */}
            <Hr />
            <Text style={stl.group}>About</Text>
            <Text style={stl.item} onPress={this.showTos}>Terms of Service</Text>
            <Hr />
            <Text style={stl.group}>Logins</Text>
            <Text style={[stl.item, stl.itemLast]} onPress={this._signOutAsync}>Log Out</Text>
          </View>
          <View style={{ height: 15 }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

const stl = StyleSheet.create({
  grid: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 25,
    marginLeft: 20
  },
  heading: {
    fontWeight: "900"
  },
  group: {
    fontWeight: '800',
    marginVertical: 15,
    fontSize: 19,
  },
  item: {
    fontWeight: '400',
    marginVertical: 15,
    fontSize: 17
  },
  itemLast: {
    color: styles.primaryColor,
  }
});

const Hr = () => {
  return <View style={{ borderTopWidth: 0.4, width: DEVICE_WIDTH, marginHorizontal: 1 }}>
    <Text />
  </View>;
}
