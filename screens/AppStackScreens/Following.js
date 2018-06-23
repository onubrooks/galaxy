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
import {Recent, Recent2} from "../../components/Recent";
import styles from "../../components/styles";


export class Following extends Component {
  render() {
    return <Container>
        <Tabs style={{ marginTop: 24 }}>
          <Tab heading="Following">
            {/*<Recent2 person="onubrooks" activity="started following you" time="11:45pm" following={true} />*/}
          </Tab>
          <Tab heading="You">
  {/*<Recent person="onubrooks" activity="started following you" time="11:45pm" following={true} />*/}
          </Tab>
        </Tabs>
      </Container>;
  }
}

export default Following;
