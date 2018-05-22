import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Title,
  List,
  ListItem,
  Content,
  Button,
  Footer,
  FooterTab,
  Body,
  Left,
  Right,
  Text,
  Thumbnail
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
const sly = require("../assets/sly.jpg");

export class Recent extends Component {
  constructor(props) {
        super(props);
  }
  render() {
    return <List>
        <ListItem avatar>
          <Left>
            <Thumbnail source={sly} />
          </Left>
          <Body>
            <Text>
            <Text>{this.props.person} </Text>
            <Text note>{this.props.activity} </Text>
            <Text note>{this.props.time}</Text>
            </Text>
          </Body>
          <Right>
            {this.props.following ? <Button transparent bordered dark>
                <Text>Following</Text>
              </Button> : <Button primary>
                <Text> Follow </Text>
              </Button>}
          </Right>
        </ListItem>
      </List>;
  }
}
export class Recent2 extends Component {
  constructor(props) {
        super(props);
  }
  render() {
    return <Grid style={{marginVertical: 20}}> 
        <Col>
          <Thumbnail source={sly} />
        </Col>
        <Col>
        <Text>
          <Text>{this.props.person} </Text>
          <Text note>{this.props.activity} </Text>
          <Text note>{this.props.time}</Text>
          </Text>
        </Col>
        <Col>
          {this.props.following ? <Button transparent bordered dark>
              <Text>Following</Text>
            </Button> : <Button primary>
              <Text> Follow </Text>
            </Button>}
        </Col>
      </Grid>;
  }
}

//export default Recent;