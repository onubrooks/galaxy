import React, { Component } from "react";
import { Image, ScrollView, View, TouchableOpacity, Platform } from "react-native";
import {
    Container,
    Header,
    Content,
    Tab,
    Tabs,
    TabHeading,
    Title,
    Button,
    Body,
    Left,
    Right,
    ScrollableTab,
    Text,
    Spinner,
    Icon
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

import ProfileSummaryNew from "../../../components/ProfileSummaryNew";
import ImageView from "../../../components/ImageView";
import FeedItemWrapper from "../../../components/FeedItemWrapper";
import styles from "../../../components/styles";

import { connect } from "react-redux";
import {
  fetchProfile,
  fetchMyProfile,
  fetchMusic,
  fetchFollowers,
  fetchFollowing,
  fetchMyFollowers,
  fetchMyFollowing,
  unFollowUser
} from "../../../actions/actions";
export class ViewProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { other: props.navigation.getParam("other", false) };
    }
    componentDidMount() {
        let userId, userHandle;
        if (this.props.navigation.getParam('other', false)) {
            userId = this.props.navigation.getParam("userId", null);
            userHandle = this.props.navigation.getParam("userHandle", null);
            this.props.fetchProfile(userHandle, userId);
            this.props.fetchFollowers(userId);
            this.props.fetchFollowing(userId);
            this.props.fetchMyFollowers(this.props.user.id);
            this.props.fetchMyFollowing(this.props.user.id);
            this.props.fetchMusic(userId);
        } else {
            userId = this.props.user.id;
            this.props.fetchMyProfile(userId);
            this.props.fetchMusic(userId);
        }
    }
    render() {
      let { music } = this.props;
      let display = Object.keys(music.byId).length
        ? Object.keys(music.byId).map(key => music.byId[key])
        : [];
      let user = this.state.other ? this.props.profile : this.props.user;
      console.log("user", user);
      let self = !this.state.other;
        if (user.loading) {
            return (
              <Container>
                <Header
                  style={[
                    styles.header,
                    { backgroundColor: "white", height: 40 }
                  ]}
                  androidStatusBarColor="transparent"
                >
                  <Left style={{ maxWidth: 50 }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("Feed")
                      }
                    >
                      <Icon
                        name="md-close"
                        style={{
                          color: "#666666",
                          fontFamily: "Segoe UI Bold",
                          fontSize: 20
                        }}
                      />
                    </TouchableOpacity>
                  </Left>
                  <Body>
                    <Title
                      style={{
                        color: "#666666",
                        fontFamily: "Segoe UI Bold",
                        fontSize: 15
                      }}
                    >
                      Please wait...
                    </Title>
                  </Body>
                </Header>
                <Content>
                  <View style={styles.loadingIndicator}>
                    <Spinner
                      color={"#666666"}
                      size={Platform.OS === "ios" ? 1 : 20}
                    />
                  </View>
                </Content>
              </Container>
            );
        }
        return (
          <Container style={{ backgroundColor: "white" }}>
            <Header
              style={[
                styles.header,
                { backgroundColor: "white", height: 40 }
              ]}
              androidStatusBarColor="transparent"
            >
              <Left style={{ maxWidth: 50 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Icon
                    name="md-arrow-back"
                    style={{
                      color: "#666666",
                      fontFamily: "Segoe UI Bold",
                      fontSize: 20
                    }}
                  />
                </TouchableOpacity>
              </Left>
              <Body>
                <Title
                  style={{
                    color: "#666666",
                    fontFamily: "Segoe UI Bold",
                    fontSize: 15,
                    marginLeft: -30
                  }}
                >
                  {`@${user.userHandle} (${user.noSongs} Songs)`}
                </Title>
              </Body>

              <Right>
                <Button
                  transparent
                  onPress={() =>
                    this.props.navigation.navigate("Settings")
                  }
                >
                  <Ionicons
                    name="ios-more"
                    size={33}
                    color={"#666666"}
                  />
                </Button>
              </Right>
            </Header>
            <ScrollView>
              <ProfileSummaryNew
                navigation={this.props.navigation}
                user={user}
                self={false}
                myId={this.props.user.id}
                unFollowUser={this.props.unFollowUser}
              />

              <Tabs
                transparent
                // renderTabBar={() => <ScrollableTab />}
              >
                <Tab
                  heading={
                    <TabHeading style={{ backgroundColor: "white" }}>
                      <Ionicons
                        name="md-apps"
                        size={26}
                        color="#666666"
                      />
                    </TabHeading>
                  }
                >
                  <ScrollView>
                    <ImageView
                      display={display}
                      navigation={this.props.navigation}
                      fetching={music.loading}
                    />
                  </ScrollView>
                </Tab>
                <Tab
                  heading={
                    <TabHeading style={{ backgroundColor: "white" }}>
                      <Ionicons
                        name="ios-menu"
                        size={26}
                        color="#666666"
                      />
                    </TabHeading>
                  }
                >
                  <ScrollView>
                    <FeedItemWrapper
                      navigation={this.props.navigation}
                    />
                  </ScrollView>
                </Tab>
              </Tabs>
            </ScrollView>
          </Container>
        );
    }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    profile: state.profile,
    music: state.music
  };
};

const mapDispatchToProps = {
  fetchProfile,
  fetchMyProfile,
  fetchMusic,
  fetchFollowers,
  fetchFollowing,
  fetchMyFollowers,
  fetchMyFollowing,
  unFollowUser
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileScreen);
