import React, { Component } from "react";

import { connect } from "react-redux";

import Gallery from "./Gallery";

export class ImageView extends Component {
  render() {
    const postArray = Object.keys(this.props.feed.byId).map((post_id, idx) => this.props.feed.byId[post_id]);
    return <Gallery images={postArray} navigation={this.props.navigation} user={this.props.user} />;   
  }
         
}

const mapStateToProps = (state) => {
  return {
    feed: state.feed,
    user: state.user
  };
};


export default connect(mapStateToProps)(ImageView);
