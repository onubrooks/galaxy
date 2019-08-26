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
import styles from "../../../components/styles";
import Axios from "axios";

export class SearchScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      userResults: [],
      songResults: [],
      text: "",
      endpoint: "https://api.leedder.com/api/v1.0/search?term=",
      userEndpoint: "https://api.leedder.com/api/v1.0/search/users/",
      musicEndpoint: "https://api.leedder.com/api/v1.0/search/music/",
      // segment display variables
      s: true,
      u: false,
      h: false
    };
  }

  search = (event) => {
    let text = event.nativeEvent.text;
    if (text.charAt(0) === "#") {
      this.setState({ s: false, u: false, h: true });
    } else if(text.charAt(0) === "@"){
      this.setState({ s: false, u: true, h: false}) 
    } else {
      this.setState({ s: true, u: false, h: false})
    }
    let endpoint = `${this.state.endpoint}${text}`
    Axios.get(endpoint)
      .then((res) => {
        let data = res.data
        if (data.error && data.error === "Unauthenticated."){
          AsyncStorage.removeItem("userToken");
          this.props.navigation.navigate("Auth", {});
        }
          this.setState({
            userResults: data.users || [],
            songResults: data.songs || []
          });
      })
  }

  render() {
    let {songResults, userResults} = this.state;
    let hashtagResults = [...songResults, ...userResults]
    return (
      <Container style={styles.container}>
        {/* <Header
          style={[styles.header2, { backgroundColor: "#EFEFEF" }]}
          searchBar
          rounded
        >
          <Body>
            <Item style={{ marginLeft: 20 }}>
              <Icon name="ios-search" />
              <Input
                placeholder="Search for anything..."
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                onSubmitEditing={this.search}
              />
            </Item>
          </Body>
        </Header> */}
        <Header
          hasTabs
          searchBar
          rounded
          style={[styles.header2, { backgroundColor: "#EFEFEF" }]}
        >
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search for anything..."
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              onSubmitEditing={this.search}
            />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
          <View
            style={styles.segmentView}
          >
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
              <Text style={styles.segmentButtonText}>Songs</Text>
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
              <Text style={styles.segmentButtonText}>Users</Text>
            </Button>
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
              <Text style={styles.segmentButtonText}>Hashtags</Text>
            </Button>
          </View>
          <ScrollView>
            {this.state.s ? (<ImageView
              display={songResults}
              navigation={this.props.navigation}
              NoResults={NoResults}
            />) : null }
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default SearchScreen;

NoResults = () => {
  return (
    <Container
      style={{
        marginTop: 50,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      <Text style={{ fontFamily: "Segoe UI Bold" }}>
        No Search Results{" "}
      </Text>
    </Container>
  );
}