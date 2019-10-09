import React, { Component } from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import { Button, Text } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

const defaultAvatar = require("../assets/avatar.png");
import styles from "./styles";

export default class ProfileSummaryNew extends Component {
  constructor(props) {
    super(props);
    this.state = {iFollow: props.iFollow}
  }
  
  toggleFollow = () => {
    let user = this.props.profile;
    let status = this.state.iFollow ? "unfollowed" : "followed";
    this.props.unFollowUser(
      { userId: user.userId, userHandle: user.userHandle },
      { userId: this.props.myId },
      status
    );
    this.setState({ iFollow: !this.state.iFollow });
  };
  render() {
    let { profile, self } = this.props;
    return (
      <ImageBackground
        source={
          profile.userAvatar ? { uri: profile.userAvatar } : defaultAvatar
        }
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
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("ViewFollows", {
                self: false,
                initialPage: 0,
                profile
              })
            }
          >
            <Text style={{ fontFamily: "Segoe UI", color: "white" }}>
              <Text
                onPress={() =>
                  this.props.navigation.navigate("ViewFollows", {
                    self: false,
                    initialPage: 0,
                    profile
                  })
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
                  this.props.navigation.navigate("ViewFollows", {
                    self: false,
                    initialPage: 1,
                    profile
                  })
                }
              >
                {profile.noFollowers}
              </Text>{" "}
              Followers
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Button
            rounded
            small
            bordered={this.state.iFollow ? false : true}
            style={{ marginRight: 5, backgroundColor: styles.primaryColor }}
            onPress={this.toggleFollow}
          >
            <Ionicons
              name={this.state.iFollow ? "ios-heart" : "ios-heart-empty"}
              size={20}
              color={"red"}
              style={{ marginLeft: 11 }}
            />
            <Text style={{ marginLeft: -10, color: "white" }}>
              {this.state.iFollow ? "Unfollow" : "Follow"}
            </Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}