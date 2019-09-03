// GalleryImage.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";
import { Button } from "native-base";
import { Image } from "react-native-animatable";
const WIDTH = Dimensions.get("window").width;
export default class GalleryImage extends Component {
  goto = (idx, item) => {
    if(this.props.navigation.state.routeName == 'Search') {
      let route, params;
      if(item.coverPath){
        route = "Explore";
        params = { idx, item };
      } else {
        route = "ViewProfile";
        params = { userId: item.userId, userHandle: item.userHandle, other: true };
      }
      
      this.props.navigation.navigate(route, params);
    } else if (this.props.navigation.state.routeName == 'Likes') {
      this.props.navigation.navigate("Song", { idx, item });
    } else if (this.props.navigation.state.routeName == 'SavedGrid') {
      this.props.navigation.navigate("SavedList", { idx, item });
    } else {
      // if profile page
      this.props.navigation.navigate("Song", { idx, item });
    }
      
  };
  render() {
    const { idx, item } = this.props;
    let uri = {uri: item.coverPath ? item.coverPath : item.userAvatar}
    return (
      <Button
        onPress={() => this.goto(idx, item)}
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
