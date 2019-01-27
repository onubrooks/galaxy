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

import ProfileSummary from "../../../components/ProfileSummary";
import ImageView from "../../../components/ImageView";
import FeedItemWrapper from "../../../components/FeedItemWrapper";
import styles from "../../../components/styles";

import { connect } from "react-redux";
import { fetchProfile, fetchMyProfile } from "../../../actions/actions";

const primaryColor = "#006E8C";
export class ProfileScreen extends Component {
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
    } else {
      userId = this.props.user.id;
      this.props.fetchMyProfile(userId);
    }
  }
  render() {
    let user = this.state.other ? this.props.profile : this.props.user;
    if (user.loading) {
      return <Container>
          <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor="#006E8C">
            <Left style={{ maxWidth: 50 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Feed")}>
                <Icon name="md-close" style={{ color: primaryColor }} />
              </TouchableOpacity>
            </Left>
          <Body style={{ marginLeft: 20}}>
              <Text style={{ color: primaryColor }}>
                please wait...
              </Text>
            </Body>
          </Header>
          <Content>
            <View style={styles.loadingIndicator}>
              <Spinner color={"#006E8C"} size={Platform.OS === "ios" ? 1 : 20} />
            </View>
          </Content>
        </Container>;
    }
    return <Container style={{ backgroundColor: "white" }}>
      <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor="#006E8C">
        <Left>
          <Title style={{ color: "#006E8C" }}>
            {user.userHandle}
          </Title>
        </Left>

        <Right>
          <Button transparent onPress={() => this.props.navigation.navigate("Settings")}>
            <Ionicons name="md-more" size={33} color="#006E8C" />
          </Button>
        </Right>
      </Header>
      <ScrollView>
        <ProfileSummary navigation={this.props.navigation} user={user} />
        <Text
          style={{ fontWeight: "bold", marginLeft: 15 }}
        >
          {user.fullname}
        </Text>
        <Text
          style={{ marginLeft: 15 }}
        >
          {user.status}
        </Text>
        {/* <Tabs style={{ marginTop: 24, backgroundColor: "white" }} transparent renderTabBar={() => <ScrollableTab />}>
                   <Tab heading={<TabHeading style={{ backgroundColor: "white" }}>
                         <Ionicons name="md-apps" size={30} />
                       </TabHeading>}>
                     <ScrollView>
                       <ImageView navigation={this.props.navigation} />
                     </ScrollView>
                   </Tab>
                   <Tab heading={<TabHeading style={{ backgroundColor: "white" }}>
                         <Ionicons name="ios-list-outline" size={30} />
                       </TabHeading>}>
                     <ScrollView>
                       <FeedItemWrapper navigation={this.props.navigation} />
                     </ScrollView>
                   </Tab>
                   <Tab heading={<TabHeading style={{ backgroundColor: "white" }}>
                         <Ionicons name="ios-bookmark-outline" size={30} />
                       </TabHeading>}>
                     <ScrollView>
                       <ImageView navigation={this.props.navigation} bookmarkedOnly={true} />
                     </ScrollView>
                   </Tab>
                 </Tabs> */}
      </ScrollView>
    </Container>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    profile: state.profile
  };
};

const mapDispatchToProps = {
  fetchProfile,
  fetchMyProfile
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
