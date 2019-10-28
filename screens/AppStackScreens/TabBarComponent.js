import React from "react";
import { Platform, Keyboard, View, Image } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs'; // need version 2.0 react-navigation of course... it comes preinstalled as a dependency of react-navigation.

export class TabBarComponent extends React.Component {
  state = {
    visible: true
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', this.visible(false)),
        Keyboard.addListener('keyboardDidHide', this.visible(true))
      ];
    }
  }

  componentWillUnmount() {
    this.keyboardEventListeners && this.keyboardEventListeners.forEach((eventListener) => eventListener.remove());
  }

  visible = visible => () => this.setState({ visible });

  render() {
    if (!this.state.visible) {
      return null;
    } else {
      return (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          <Image
            source={require("../../assets/icons/bottombar.png")}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 45
            }}
          />
          <BottomTabBar {...this.props} />
        </View>
      );
    }
  }
}