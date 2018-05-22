import React, { Component } from "react";
import { Image } from "react-native";
import {
  Footer,
  FooterTab,
  Button,
  Icon
} from "native-base";

export default class FooterNav extends Component {
  constructor(props) {
  super(props);
        this.state = {
              tab1: props.navigation.state.routeName == "Feed",
              tab2: false,
              tab3: false,
              tab4: props.navigation.state.routeName == "Following",
              tab5: props.navigation.state.routeName == "Profile"
        };
  }
  toggleTab1() {
    this.props.navigation.navigate("Feed");
  }
  toggleTab2() {
    this.props.navigation.navigate("Search");
  }
  toggleTab3() {

  }
  toggleTab4() {
        this.props.navigation.navigate("Following");
  }
  toggleTab5() {
    this.props.navigation.navigate("Profile");
  }
  render() {
        return (
          <Footer>
            <FooterTab>
              <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
                <Icon active={this.state.tab1} name="home" />
              </Button>
              <Button active={this.state.tab2} onPress={() => this.toggleTab2()}>
                <Icon active={this.state.tab2} name="search" />
              </Button>
              <Button active={this.state.tab3} onPress={() => this.toggleTab3()}>
                <Icon active={this.state.tab3} name="add" />
              </Button>
              <Button active={this.state.tab4} onPress={() => this.toggleTab4()}>
                <Icon active={this.state.tab4} name="heart" />
              </Button>
              <Button active={this.state.tab5} onPress={() => this.toggleTab5()}>
              <Icon active={this.state.tab5} name="contact" />
              </Button>
            </FooterTab>
          </Footer>
        );
  }
}
