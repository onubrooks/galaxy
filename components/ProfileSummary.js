import React, { Component } from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import { Button, Text } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

const defaultAvatar = require("../assets/avatar.png");
import styles from "./styles";

export default class ProfileSummary extends Component {
  constructor(props) {
    super(props);
    let iFollow = props.user.followers.data
      ? props.user.followers.data.some(item => item.userId == props.myId)
      : false;
    this.state = { iFollow };
  }
  toggleFollow = () => {
    let { user } = this.props;
    let status = this.state.iFollow ? "unfollowed" : "followed";
    this.props.unFollowUser(
      { userId: user.userId, userHandle: user.userHandle },
      { userId: this.props.myId },
      status
    );
    this.setState({ iFollow: !this.state.iFollow });
  };
  render() {
    let { user, self } = this.props;
    return (
      <ImageBackground
        source={user.userAvatar ? { uri: user.userAvatar } : defaultAvatar}
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
            {user.fullname}
          </Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("ViewFollows", {
                self: true,
                initialPage: 0,
                user
              })
            }
          >
            <Text style={{ fontFamily: "Segoe UI", color: "white" }}>
              <Text
                style={{
                  fontWeight: "800",
                  color: "white",
                  fontSize: 15
                }}
              >
                {user.noFollowing}
              </Text>{" "}
              Following |{" "}
              <Text
                style={{ fontWeight: "800", color: "white" }}
                
              >
                {user.noFollowers}
              </Text>{" "}
              Followers
            </Text>
          </TouchableOpacity>
          {self ? (
            <View
              style={{
                borderTopWidth: 0.5,
                width: "50%",
                marginTop: 15,
                marginBottom: 0,
                marginHorizontal: 15,
                borderTopColor: "white"
              }}
            >
              <Text />
            </View>
          ) : null}
          {self ? (
            <Text
              style={{
                fontFamily: "Segoe UI Italic",
                color: "white",
                marginTop: -10,
                marginHorizontal: 15,
                textAlign: "justify"
              }}
            >
              {user.status}
            </Text>
          ) : null}
        </View>
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          {self ? (
            <Button
              rounded
              small
              style={{
                marginRight: 5,
                backgroundColor: styles.primaryColor
              }}
              onPress={() => this.props.navigation.navigate("Playlist")}
            >
              <Ionicons
                name="ios-heart"
                size={20}
                color={"red"}
                style={{ marginLeft: 11 }}
              />
              <Text style={{ marginLeft: -10 }}>Playlist</Text>
            </Button>
          ) : (
            <Button
              rounded
              small
              style={{
                marginRight: 5,
                backgroundColor: styles.primaryColor
              }}
              onPress={this.toggleFollow}
            >
              <Ionicons
                name="ios-heart"
                size={20}
                color={"red"}
                style={{ marginLeft: 11 }}
              />
              <Text style={{ marginLeft: -10 }}>
                {this.state.iFollow ? "Unfollow" : "Follow"}
              </Text>
            </Button>
          )}
          {self ? (
            <Button
              rounded
              // bordered
              small
              style={{
                marginLeft: 5,
                backgroundColor: styles.primaryColor
              }}
              onPress={() => this.props.navigation.navigate("EditProfile")}
            >
              <Text style={{ color: "white" }}>Edit Profile</Text>
            </Button>
          ) : null}
        </View>
      </ImageBackground>
    );
  }
}
