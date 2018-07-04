import React, { Component } from "react";

import { connect } from "react-redux";

import Gallery from "./Gallery";
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
    { label: "pink", src: require("../assets/i.jpg") },
    { label: "rails", src: require("../assets/sly.jpg") }
  ];

export class ImageView extends Component {
  render() {
    const postArray = Object.keys(this.props.feed.byId).map((post_id, idx) => this.props.feed.byId[post_id]);
    return <Gallery images={postArray} navigation={this.props.navigation} />;   
  }
         
}

const mapStateToProps = (state) => {
  return {
    feed: state.feed
  };
};


export default connect(mapStateToProps)(ImageView);
