import React, { Component } from "react";

import { StyleSheet, View, ScrollView, Image } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import Gallery from "./Gallery";
import * as styles from "./styles";
const sly = require("../assets/sly.jpg");
const photos = [
    { label: "beach", src: require("../assets/a.jpg") },
    { label: "bridge", src: require("../assets/b.jpg") },
    { label: "fields", src: require("../assets/c.jpg") },
    { label: "mountains", src: require("../assets/d.jpg") },
    { label: "sunflower", src: require("../assets/e.jpg") },
    { label: "sunset", src: require("../assets/f.jpg") },
    { label: "lake", src: require("../assets/g.jpg") },
    { label: "nature", src: require("../assets/h.jpg") },
    { label: "pink", src: require("../assets/onu.jpg") },
    { label: "rails", src: require("../assets/sly.jpg") }
  ];

export class ImageView extends Component {
  render() {
    return <Gallery images={photos} />   
  }
         
       }
export default ImageView;
