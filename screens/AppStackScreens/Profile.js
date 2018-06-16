import React, { Component } from "react";
import { Image, ScrollView } from "react-native";
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
  Thumbnail
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Dropdown } from "react-native-material-dropdown";

import { Col, Row, Grid } from "react-native-easy-grid";
import ImageView from "../../components/ImageView";
import FeedItem from "../../components/FeedItem";
import styles from "../../components/styles";
const sly = require("../../assets/sly.jpg");

export class Profile extends Component {
         constructor(props) {
           super(props);
           this.state = { selected2: undefined };
         }
         onValueChange2(value) {
           this.setState({ selected2: value });
         }
         render() {
           let data = [{ value: "Banana" }, { value: "Mango" }, { value: "Pear" }];
           return <Container style={{ backgroundColor: "white" }}>
               <Header style={{ marginTop: 30 }} backgroundColor="white">
                 <Left>
                   <Title style={{ color: "black" }}>
                     Onubrooks
                   </Title>
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
                        <ImageView />
                      </ScrollView>
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: "white" }}>
                          <Ionicons name="ios-list-outline" size={30} />
                        </TabHeading>}>
                      <ScrollView>
                        <FeedItem />
                      </ScrollView>
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: "white" }}>
                          <Ionicons name="md-photos" size={30} />
                        </TabHeading>}>
                      <Text />
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: "white" }}>
                          <Ionicons name="ios-bookmark-outline" size={30} />
                        </TabHeading>}>
                    </Tab>
                  </Tabs>
               </ScrollView>
             </Container>;
         }
       }

export default Profile;
