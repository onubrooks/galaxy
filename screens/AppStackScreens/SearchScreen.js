import React, { Component } from "react";
import { ScrollView } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Body,
  Left,
  Right,
  Icon,
  Item,
  Input,
  Text
} from "native-base";

import ImageView from "../../components/ImageView";
import styles from "../../components/styles";

export class SearchScreen extends Component {
  render() {
    return <Container>
      <Header style={[styles.header, { backgroundColor: 'white'}]} searchBar rounded>
          <Item> 
            <Icon name="ios-search" />
            <Input placeholder="Search" editable={true} />
          </Item>
          <Right>
            <Button transparent>
              <Text>Search</Text> 
            </Button>
          </Right>
        </Header>
        <Content>
          <ScrollView>
            <ImageView navigation={this.props.navigation}/>
          </ScrollView>
        </Content>
      </Container>;
  }
}

export default SearchScreen;
