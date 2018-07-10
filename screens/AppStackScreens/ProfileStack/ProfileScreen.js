import React, { Component } from "react";
import { Image, ScrollView, View, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Title,
  List,
  ListItem,
  Content,
  Button,
  Body,
  Left,
  Right,
  Icon,
  ScrollableTab,
  Text,
  Thumbnail,
  Spinner
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

import ProfileSummary from "../../../components/ProfileSummary";
import ImageView from "../../../components/ImageView";
import FeedItemWrapper from "../../../components/FeedItemWrapper";
import styles from "../../../components/styles";

export class ProfileScreen extends Component {
         render() {
           return <Container style={{ backgroundColor: "white" }}>
             <Header style={[styles.header, { backgroundColor: "white" }]}>
                 <Left>
                   <Title style={{ color: "black" }}>Steverogers</Title>
                 </Left>

                 <Right>
                   <Button transparent onPress={() => this.props.navigation.navigate('Settings')}>
                     <Ionicons name="md-more" size={33} />
                 </Button>
                 </Right>
               </Header>
               <ScrollView>
                 <ProfileSummary navigation={this.props.navigation} />
               <Text style={{fontWeight:'bold', marginLeft: 15}}>Steven Strange </Text> 
                 <Tabs style={{ marginTop: 24, backgroundColor: "white" }} transparent renderTabBar={() => <ScrollableTab />}>
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
                       </TabHeading>} >
                   <ScrollView>
                     <ImageView navigation={this.props.navigation} bookmarkedOnly={true} />
                   </ScrollView>
                       </Tab>
                 </Tabs>
               </ScrollView>
             </Container>;
         }
       }

export default ProfileScreen;
