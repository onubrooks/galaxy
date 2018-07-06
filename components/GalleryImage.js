// GalleryImage.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";
import { Button } from "native-base";
import { Image } from "react-native-animatable";
const WIDTH = Dimensions.get("window").width;
export default class GalleryImage extends Component {
  goto = (idx) => {
    if(this.props.navigation.state.routeName == 'Search') {
      this.props.navigation.navigate("Explore", { idx });
    } else if (this.props.navigation.state.routeName == 'Likes') {
      this.props.navigation.navigate("Song", { idx });
    }
      
  };
  render() {
    const { uri, idx } = this.props;
    return (
      <Button
        onPress={() => this.goto(idx)}
        style={{
          backgroundColor: "transparent",
          borderRadius: 0,
          height: 120,
          width: WIDTH / 3
        }}
      >
        <Image
          animation={"bounceIn"}
          delay={100 * idx}
          duration={500}
          source={uri}
          style={{
            height: 120,
            left: 0,
            position: "absolute",
            resizeMode: "cover",
            top: 0,
            width: WIDTH / 3,
            margin: 3
          }}
        />
      </Button>
    );
  }
}
GalleryImage.propTypes = {
  //uri: PropTypes.string,
  index: PropTypes.number,
  onPress: PropTypes.func
};
