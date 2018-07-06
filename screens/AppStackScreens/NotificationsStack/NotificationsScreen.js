import React, { Component } from "react";
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text
} from "native-base";
import { Recent } from "../../../components/Recent";
import styles from "../../../components/styles";

export class NotificationsScreen extends Component {
  render() {
    return <Container style={styles.container}>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: "#006E8C" }} style={[{ marginTop: 24 }]}>
          <Tab heading={<TabHeading style={{ backgroundColor: "white" }}> 
                <Text style={{ color: "#006E8C" }}>Following</Text>
              </TabHeading>}>
            <Recent person="onubrooks" activity="started following you" time="11:45pm" following={false} />
          </Tab>
          <Tab heading={<TabHeading style={{ backgroundColor: "white" }}>
                <Text style={{ color: "#006E8C" }}>You</Text>
              </TabHeading>}>
            <Recent person="onubrooks" activity="started following you" time="11:45pm" following={true} />
          </Tab>
        </Tabs>
      </Container>;
  }
}

export default NotificationsScreen;
