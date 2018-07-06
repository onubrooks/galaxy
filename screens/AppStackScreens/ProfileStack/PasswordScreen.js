import React, { Component } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  AsyncStorage
} from "react-native";
import { WebBrowser } from "expo";
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
  Thumbnail
} from "native-base";

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

export class PasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isModalVisible: false,
      input1: '',
      input2: '',
      input3: ''
    };
  }
  saveAndGoBack = () => {
    // dispatch a redux action
    console.log('profile updated...');
    // then go back
    this.props.navigation.goBack();
  }

  resetPassword = async () => {
    let result = await WebBrowser.openBrowserAsync('http://leedder.com/web/login/');
    //this.setState({ result });
  };
  render() {
    return <Container style={styles.container}>
        <Header style={[styles.header, { backgroundColor: "white" }]}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="md-close" />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={stl.heading}>Settings</Text>
          </Body>
          <Right>
            {this.state.input1 && this.state.input2 && this.state.input3 ? <Button onPress={this.saveAndGoBack} transparent>
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
                <Input placeholder="Current Password" value={this.state.input1} onChangeText={text => this.setState(
                      { input1: text }
                    )} secureTextEntry={true} />
              </Item>
              <Item>
                <Input placeholder="New Password" value={this.state.input2} onChangeText={text => this.setState(
                      { input2: text }
                    )} secureTextEntry={true} />
              </Item>
              <Item>
                <Input placeholder="New Password, again" value={this.state.input3} onChangeText={text => this.setState(
                      { input3: text }
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

const primaryColor = "#006E8C";
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
    fontWeight: "900"
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
