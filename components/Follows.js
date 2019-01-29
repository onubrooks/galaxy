import React, { Component } from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import {
  Button,
  Text,
  Thumbnail
} from "native-base";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

const sly = require("../assets/avatar.png");

export class Follows extends Component {
   constructor(props) {
    super(props);
    let iFollow = props.myFollows.data.some(item => item.userId == props.personData.userId);
    this.state = {iFollow}
  }

  toggleFollow = () => {
    let {personData} = this.props;
    let status = this.state.iFollow ? 'unfollowed' : 'followed';
    this.props.unFollowUser({ userId: personData.userId, userHandle: personData.userHandle }, {userId: this.props.myId}, status);
    this.setState({iFollow: !this.state.iFollow});
  }

  render() {
      let { personData } = this.props;
    return <View style={styles.grid}>
        <View style={styles.col1}>
          <Thumbnail style={styles.thumbnail} source={{uri: personData.userAvatar}} />
        </View>
        <View style={styles.col2}>
          <Text>
            <Text style={styles.col2handle}>{personData.userHandle} </Text>
            <Text style={styles.col2main}>{personData.fullname}. </Text>
            
          </Text>
        </View>
        <View style={styles.col3}>
          {this.state.iFollow ? <Button style={styles.followingBtn} small bordered onPress={this.toggleFollow}>
              <Text style={styles.followingBtnTxt}>unfollow</Text>
            </Button> : <Button primary small style={styles.followBtn} onPress={this.toggleFollow}>
            <Text style={styles.followBtnTxt}>follow</Text>
            </Button>}
        </View>
      </View>;
  }
}

const styles = StyleSheet.create({
  grid: {
    //flex: 1,
    flexDirection: "row",
    //justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    width: DEVICE_WIDTH,
    marginVertical: 20
    //marginHorizontal: 10
  },
  col1: {
    flex: 1,
    width: "25%",
    marginLeft: 6,
    marginRight: 5,
    flexShrink: 0
    //alignSelf: "stretch"
  },
  col2: {
    width: "50%",
    marginLeft: -20,
    flexShrink: 1
    //alignSelf: "stretch"
  },
  col3: {
    flex: 1,
    width: "15%",
    marginRight: 6,
    marginLeft: 6,
    alignSelf: "stretch",
    height: 10,
    flexShrink: 0
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

let jsUcfirst = (string) => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;