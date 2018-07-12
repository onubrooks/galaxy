import React, { Component } from "react";
import {
  Container,
  Text
} from "native-base";

export class WorkInProgress extends Component {
  render() {
    return <Container style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Text>Work in Progress </Text>
    </Container>;
  }
}

export default WorkInProgress;
