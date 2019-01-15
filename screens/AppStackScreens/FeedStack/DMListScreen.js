import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions
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
  Text,
  Thumbnail
} from "native-base";

import { connect } from "react-redux";
import { commentPost } from "../../../actions/actions";

import styles from "../../../components/styles";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

const sly = require("../../../assets/avatar.png");
export class DMListScreen extends React.Component {
  //static navigationOptions = { tabBarVisible: false };
  go = () => {
    this.props.navigation.navigate("DMChat"); 
  }
  render() {
    return <Container style={styles.container}>
      <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor="#006E8C">
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="md-arrow-back" style={{ color: "#006E8C" }}/>
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{ fontWeight: "500", color:"#006E8C" }}>Direct</Text>
          </Body>
        </Header>
        <Content>
        <TouchableOpacity activeOpacity={0.9} onPress={ this.go }>
          <DMItem handle="28thsly"  />
          </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} onPress={ this.go }>
          <DMItem handle="max_payne" />
          </TouchableOpacity>
        </Content>
      </Container>;
  }
  
}

const mapStateToProps = state => {
  return {
    user: state.user,
    comments: state.comments
  };
};

const mapDispatchToProps = {
  commentPost
};

export default connect(mapStateToProps, mapDispatchToProps)(DMListScreen);

const stl = StyleSheet.create({
  grid: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 50,
    width: DEVICE_WIDTH,
    marginVertical: 20,
    marginHorizontal: 15
  },
  col1: {
    flex: 1,
    width: "25%",
    marginLeft: 6,
    marginRight: 5,
    flexShrink: 0,
    //flexBasis: 20
    //alignSelf: "stretch"
  },
  col2: {
    width: "40%",
    marginLeft: -20,
    flexShrink: 1,
    //alignSelf: "stretch"
    //flexBasis: 30
  },
  col3: {
    //flexBasis: 50
    width: "35%"
  },
  thumbnail: {
    width: DEVICE_WIDTH / 7,
    marginLeft: 5
  },

  col2handle: {
    fontWeight: "900",
    fontSize: 16
  },
  col2main: {
    fontWeight: "100",
    fontSize: 15
  },
  followingBtn: { borderColor: "grey" },
  followBtn: { backgroundColor: "#006E8C" },
  followingBtnTxt: { fontSize: 10, color: "grey", left: 0 },
  followBtnTxt: { fontSize: 10, color: "#fff", left: 0 }
});

class DMItem extends React.Component {
  render() {
    return <View style={stl.grid}>
      <View style={stl.col1}>
        <Thumbnail style={stl.thumbnail} source={sly} />
      </View>
      <View style={stl.col2}>
        <Text style={stl.col2handle}>{ this.props.handle } </Text>
        <Text note>Tap to chat</Text>
      </View>
      <View style={stl.col3}>
        <View />
      </View>
    </View>;
  }
}