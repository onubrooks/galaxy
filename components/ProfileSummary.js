import React, { Component } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Button, Text, Thumbnail } from "native-base";
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const defaultAvatar = require('../assets/avatar.png');

export default class ProfileSummary extends Component {
  constructor(props) {
    super(props);
    let iFollow = props.user.followers.data ? props.user.followers.data.some(item => item.userId == props.myId) : false;
    this.state = {iFollow}
  }
  toggleFollow = () => {
    let {user} = this.props;
    let status = this.state.iFollow ? 'unfollowed' : 'followed';
    this.props.unFollowUser({ userId: user.userId, userHandle: user.userHandle }, {userId: this.props.myId}, status);
    this.setState({iFollow: !this.state.iFollow});
  }
  render() {
    let { user, self } = this.props;
    return <View style={stl.grid}>
  <View style={stl.thumb}>
    <Thumbnail large source={user.userAvatar ? { uri: user.userAvatar } : defaultAvatar } />
  </View>
  <View style={stl.sub_grid}>
        <View style={stl.stats}>
      <View>
        <TouchableOpacity>
        <View>
              <Text style={stl.statNum}>{ user.noSongs }</Text>
        </View>
        <View>
              <Text style={stl.statTxt}>songs</Text>
        </View>
        </TouchableOpacity>
      </View>
      <View>
            <TouchableOpacity onPress={() => !self ? this.props.navigation.navigate('ViewFollows', { self: false, initialPage: 1 }) : null}>
        <View>
              <Text style={stl.statNum}>{user.noFollowers}</Text>
        </View>
        <View>
              <Text style={stl.statTxt}>followers</Text>
        </View>
        </TouchableOpacity>
      </View>
      <View>
            <TouchableOpacity onPress={() => !self ? this.props.navigation.navigate('ViewFollows', { self: false, initialPage: 0 }) : null}>
        <View>
              <Text style={stl.statNum}>{user.noFollowing}</Text>
        </View>
        <View>
              <Text style={stl.statTxt}>following</Text>
        </View>
        </TouchableOpacity>
      </View>
    </View>
        <View style={stl.button}>
          {self ? 
          <Button style={stl.btn} light small onPress={() => this.props.navigation.navigate('EditProfile')}>
            <Text style={stl.btnTxt}>Edit profile</Text>
      </Button>
      :
            <Button style={stl.btn} light small onPress={this.toggleFollow}>
              <Text style={stl.btnTxt}>{this.state.iFollow ? 'Unfollow' : 'Follow'}</Text>
            </Button>}
    </View>
        
  </View>
</View>;
  }
}

const stl = StyleSheet.create({
  grid: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-around",
    alignItems: "flex-start"
  },
  thumb: {
    //flex: 1
    marginLeft: 15
  },
  sub_grid: {
    flexDirection: "column",
    flex: 1
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20
  },
  button: {
    height: 15,
    paddingLeft: 25
  },
  btn: {
    backgroundColor: "#fff",
    width: DEVICE_WIDTH / 2 + 5,
    marginTop: 9
  },
  btnTxt: {
    paddingLeft: 44
  },
  statNum: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  statTxt: {
    // fontWeight: "100"
    fontSize: 15,
    color: 'grey'
  }
});