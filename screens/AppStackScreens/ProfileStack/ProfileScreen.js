import React, { Component } from "react";
import { Image, ScrollView, View, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Title,
  Button,
  Body,
  Left,
  Right,
  ScrollableTab,
  Text
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

import ProfileSummary from "../../../components/ProfileSummary";
import ImageView from "../../../components/ImageView";
import FeedItemWrapper from "../../../components/FeedItemWrapper";
import styles from "../../../components/styles";

import { connect } from "react-redux";
import { fetchProfile, fetchMyProfile } from "../../../actions/actions";

export class ProfileScreen extends Component {
  componentDidMount() {
    let user = this.props.user;
    this.props.fetchMyProfile(user.id);
  }
         render() {
           let { user } = this.props;
           return <Container style={{ backgroundColor: "white" }}>
               <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor="#006E8C">
                 <Left>
                 <Title style={{ color: "#006E8C" }}>
                     { user.userHandle }
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
                   { user.fullname }
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
    user: state.user
  };
};

const mapDispatchToProps = {
  fetchProfile,
  fetchMyProfile
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
