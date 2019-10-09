import React, { Component } from "react";
import { ScrollView, View, TouchableOpacity, Platform } from "react-native";
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
  Spinner,
  Icon
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

import ProfileSummary from "../../../components/ProfileSummary";
import ImageView from "../../../components/ImageView";
import FeedItemWrapper from "../../../components/FeedItemWrapper";
import styles from "../../../components/styles";

import { connect } from "react-redux";
import { fetchMyProfile, fetchMusic } from "../../../actions/actions";
export class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { other: props.navigation.getParam("other", false) };
  }
  componentDidMount() {
    let userId, userHandle;
    userId = this.props.user.id;
    this.props.fetchMyProfile(userId);
    this.props.fetchMusic(userId);
  }
  render() {
    let self = !this.state.other;
    let { music, user } = this.props;
    let items = Object.keys(music.byId).length
      ? Object.keys(music.byId).map(key => music.byId[key])
      : [];
    let display = items.filter(song => song.userId == user.id);
    
    if (user.loading) {
      return (
        <Container>
          <Header
            style={[
              styles.header,
              { backgroundColor: "white", height: 45 }
            ]}
          >
            <Left style={{ maxWidth: 50 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Feed")}
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
                color={'#666666'}
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
          style={[styles.header, { backgroundColor: "white", height: 45 }]}
        >
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Feed")}
            >
              <Icon
                name="ios-arrow-back"
                style={{
                  color: styles.headerColor,
                  fontFamily: "Segoe UI Bold",
                  fontSize: 20
                }}
              />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title
              style={{
                color: styles.headerColor,
                fontFamily: "Segoe UI Bold",
                fontSize: 15,
                marginLeft: -30
              }}
            >
              {user.userHandle ? `@${user.userHandle} (${user.noSongs} Songs)` : ""}
            </Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Settings")}
            >
              <Ionicons name="ios-more" size={33} color={styles.headerColor} />
            </Button>
          </Right>
        </Header>
        <ScrollView>
          <ProfileSummary user={user}  self={self} navigation={this.props.navigation} />
          <Tabs
            transparent
            // renderTabBar={() => <ScrollableTab />}
          >
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "white" }}>
                  <Ionicons name="md-apps" size={26} color="#666666" />
                </TabHeading>
              }
            >
                <ImageView
                  display={display}
                  navigation={this.props.navigation}
                  fetching={music.loading}
                />
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "white" }}>
                  <Ionicons name="ios-menu" size={26} color="#666666" />
                </TabHeading>
              }
            >
                <FeedItemWrapper navigation={this.props.navigation} />
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
    music: state.music
  };
};

const mapDispatchToProps = {
  fetchMyProfile,
  fetchMusic
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
