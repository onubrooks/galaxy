import React, { Component } from "react";
import { Image, ScrollView, View } from "react-native";
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

import { Col, Row, Grid } from "react-native-easy-grid";
import ImageView from "../../components/ImageView";
import FeedItemWrapper from "../../components/FeedItemWrapper";
import styles from "../../components/styles";
const sly = require("../../assets/sly.jpg");

export class ProfileScreen extends Component {
         render() {
           return <Container style={{ backgroundColor: "white" }}>
               <Header style={{ marginTop: 30 }} backgroundColor="white">
                 <Left>
                   <Title style={{ color: "black" }}>Onubrooks</Title>
                 </Left>

                 <Right>
                   <Button transparent>
                     <Ionicons name="md-more" size={33} />
                   </Button>
                 </Right>
               </Header>
               <ScrollView>
                 <Grid style={styles.pc}>
                   <Col size={1} style={styles.pc_col1}>
                     <Thumbnail large source={sly} />
                   </Col>
                   <Col size={3} style={styles.pc_col2}>
                     <Row>
                       <Col>
                         <Row>
                           <Text style={styles.pff_num}>1</Text>
                         </Row>
                         <Row>
                           <Text>Posts</Text>
                         </Row>
                       </Col>
                       <Col>
                         <Row>
                           <Text style={styles.pff_num}>1</Text>
                         </Row>
                         <Row>
                           <Text>Followers</Text>
                         </Row>
                       </Col>
                       <Col>
                         <Row>
                           <Text style={styles.pff_num}>1</Text>
                         </Row>
                         <Row>
                           <Text>Following</Text>
                         </Row>
                       </Col>
                     </Row>
                     <Row>
                       <Button light>
                         <Text>Edit profile</Text>
                       </Button>
                     </Row>
                   </Col>
                 </Grid>
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
                       </TabHeading>} />
                 </Tabs>
               </ScrollView>
             </Container>;
         }
       }

export default ProfileScreen;
