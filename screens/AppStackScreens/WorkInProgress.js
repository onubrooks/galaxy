import React, { Component } from "react";
import {
  Container,
  Header,
  Tab,
  Tabs,
  Title,
  List,
  ListItem,
  Content,
  Body,
  Left,
  Right,
  Icon,
  ScrollableTab,
  Text
} from "native-base";
import FooterNav from "../../components/FooterNav";
import { Recent, Recent2 } from "../../components/Recent";
import styles from "../../components/styles";


export class WorkInProgress extends Component {
  render() {
    return <Container style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Text>Work in Progress </Text>
    </Container>;
  }
}

export default WorkInProgress;
