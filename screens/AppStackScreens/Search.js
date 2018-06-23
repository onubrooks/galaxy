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

export class Search extends Component {
  render() {
    return (
      <Container>
        <Header style={{ marginTop: 24 }} searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" editable={false} />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
          <ScrollView>
            <ImageView />
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default Search;
