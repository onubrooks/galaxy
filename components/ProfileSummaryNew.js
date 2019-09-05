import React, { Component } from "react";
import { View, ImageBackground } from "react-native";
import { Button, Text } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

const defaultAvatar = require("../assets/avatar.png");

export default class ProfileSummaryNew extends Component {
  constructor(props) {
    super(props);
    this.state = {iFollow: false}
  }

  
  componentWillMount () {
    let iFollow = this.props.iFollow;
    this.setState({ iFollow });
  }
  
  toggleFollow = () => {
    this.props.unFollowUser();
    //this.setState({ iFollow: !this.state.iFollow });
  };
  render() {
    let { profile, self } = this.props;
    return (
      <ImageBackground
        source={profile.userAvatar ? { uri: profile.userAvatar } : defaultAvatar}
        style={{
          width: "100%",
          height: 260,
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: "67%",
            height: "55%",
            marginTop: 40,
            backgroundColor: "black",
            opacity: 0.7,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontFamily: "Segoe UI",
              color: "white",
              fontSize: 20,
              fontWeight: "500"
            }}
          >
            {profile.fullname}
          </Text>
          <Text style={{ fontFamily: "Segoe UI", color: "white" }}>
            <Text
              onPress={() =>
                !self
                  ? this.props.navigation.navigate("ViewFollows", {
                      self: false,
                      initialPage: 0
                    })
                  : null
              }
              style={{
                fontWeight: "800",
                color: "white",
                fontSize: 15
              }}
            >
              {profile.noFollowing}
            </Text>{" "}
            Following |{" "}
            <Text
              style={{ fontWeight: "800", color: "white" }}
              onPress={() =>
                !self
                  ? this.props.navigation.navigate("ViewFollows", {
                      self: false,
                      initialPage: 1
                    })
                  : null
              }
            >
              {profile.noFollowers}
            </Text>{" "}
            Followers
          </Text>
        </View>
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Button
            rounded
            small 
            bordered={this.state.iFollow ? false : true}
            style={{ marginRight: 5 }}
            onPress={this.toggleFollow}
          >
            <Ionicons
              name={this.state.iFollow ? "ios-heart" : "ios-heart-empty"}
              size={20}
              color={"red"}
              style={{ marginLeft: 11 }}
            />
            <Text style={{ marginLeft: -10 }}>
              {this.state.iFollow ? "Unfollow" : "Follow"}
            </Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}