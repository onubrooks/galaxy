import React, { Component } from "react";
import { ScrollView, View, AsyncStorage } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Right,
  Icon,
  Item,
  Input,
  Text,
  Tabs,
  Tab
} from "native-base";

import ImageView from "../../../components/ImageView";
import Recent from "../../../components/Recent";
import styles from "../../../components/styles";
import Axios from "axios";

export class SearchScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      cancel: null,
      CancelToken: Axios.CancelToken,
      userResults: [],
      songResults: [],
      text: "",
      endpoint: "https://api.leedder.com/api/v1.0/search?term=",
      userEndpoint: "https://api.leedder.com/api/v1.0/search/users/",
      musicEndpoint: "https://api.leedder.com/api/v1.0/search/music/",
      // segment display variables
      s: false,
      u: false,
      h: true,
      fetching: false
    };
  }

  search = (text) => {
    //let text = this.state.text; //event.nativeEvent.text;
    let type;
    if (text.charAt(0) === "#") {
      this.setState({ s: false, u: false, h: true });
      type = 'hashtag'
      url = this.state.endpoint
      text = text.slice(1);
    } else if(text.charAt(0) === "@"){
      type = "user";
      url = this.state.userEndpoint;
      this.setState({ s: false, u: true, h: false}) 
      text = text.slice(1);
    } else {
      type = "song";
      url = this.state.musicEndpoint;
      this.setState({ s: true, u: false, h: false})
    }
    let endpoint = `${url}${text}`
    this.setState({fetching:true, userResults: [], songResults: []})
    
    this.state.cancel && this.state.cancel();
    Axios.get(endpoint, {
      cancelToken: new this.state.CancelToken((c) => this.setState({cancel: c}))
    })
      .then(res => {
        let data = res.data;
        if (data.error && data.error === "Unauthenticated.") {
          AsyncStorage.removeItem("userToken");
          this.props.navigation.navigate("Auth", {});
        }
        if (type == "hashtag") {
          this.setState({
            userResults: data.users || [],
            songResults: data.songs || []
          });
        } else if (type == "song") {
          this.setState({ songResults: data });
        } else if (type == "user") {
          this.setState({ userResults: data });
        }
      })
      .finally(() => this.setState({ fetching: false }));
  }

  render() {
    let {songResults, userResults} = this.state;
    let hashtagResults = [...songResults, ...userResults]
    return (
      <Container style={styles.container}>
        <Header
          hasTabs
          searchBar
          rounded
          style={[styles.header2, { backgroundColor: "#EFEFEF" }]}
        >
          <Item style={{ backgroundColor: "#EFEFEF", marginLeft: 30 }}>
            <Icon name="ios-search" />
            <Input
              placeholder="Search for anything..."
              onChangeText={text => {
                this.setState({ text });
                this.search(text);
              }}
              onChangeText={this.search}
            />
          </Item>
        </Header>
        <Content>
          <View style={styles.segmentView}>
            <Button
              transparent
              bordered={this.state.h}
              onPress={() => {
                this.setState({
                  s: false,
                  u: false,
                  h: true
                });
              }}
              style={styles.segmentButton}
            >
              <Text
                style={[
                  styles.segmentButtonText,
                  { textTransform: "capitalize" }
                ]}
              >
                Hashtags
              </Text>
            </Button>
            <Button
              transparent
              bordered={this.state.s}
              onPress={() => {
                this.setState({
                  s: true,
                  u: false,
                  h: false
                });
              }}
              style={styles.segmentButton}
            >
              <Text
                style={[
                  styles.segmentButtonText,
                  { textTransform: "capitalize" }
                ]}
              >
                Songs
              </Text>
            </Button>
            <Button
              transparent
              bordered={this.state.u}
              onPress={() => {
                this.setState({
                  s: false,
                  u: true,
                  h: false
                });
              }}
              style={styles.segmentButton}
            >
              <Text
                style={[
                  styles.segmentButtonText,
                  { textTransform: "capitalize" }
                ]}
              >
                Users
              </Text>
            </Button>
          </View>
          <ScrollView>
            {this.state.h ? (
              <ImageView
                display={hashtagResults}
                navigation={this.props.navigation}
                fetching={this.state.fetching}
                isProfile={true}
              />
            ) : null}

            {this.state.s ? (
              <ImageView
                display={songResults}
                navigation={this.props.navigation}
                NoResults={NoResults}
                fetching={this.state.fetching}
                isProfile={false}
              />
            ) : null}

            {this.state.u ? (
              <ImageView
                display={userResults}
                navigation={this.props.navigation}
                NoResults={NoResults}
                fetching={this.state.fetching}
                isProfile={true}
              />
            ) : null}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default SearchScreen;