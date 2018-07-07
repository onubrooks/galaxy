/**
 * this wrapper class for Gallery componont was created because a recurring pattern of the
 * functionality provided by all the methods in this class was noticed and had to be abstracted out
 * for code reuse, therefore avoiding repetition of the same functionality across different classes / components
 * example components that use this same functionality include: SearchScreen.js, ProfileScreen.js and SavedGridScreen.js
 * the class does all the necessary filtering based on the route name and passes the filtered data to the Gallery component for display
*/
import React, { Component } from "react";

import { connect } from "react-redux";

import Gallery from "./Gallery";

export class ImageView extends Component {
  render() {
    let display;
    const { user, bookmarks, bookmarkedOnly = false } = this.props;
    const postArray = Object.keys(this.props.feed.byId).map((post_id, idx) => this.props.feed.byId[post_id]);
    if (this.props.navigation.state.routeName == "Search") {
      display = postArray;
    } else if (this.props.navigation.state.routeName == "Profile") {
      display = postArray.filter((post, index) => {
        return post.handle == user.username;
      });
    } else if (this.props.navigation.state.routeName == "Likes") {
      display = postArray.filter((post, index) => {
        return post.hits.some(id => id == user.id);
      });
    }  else if (bookmarkedOnly || this.props.navigation.state.routeName == "SavedGrid") {
      display = postArray.filter((post, index) => {
        return bookmarks.some(id => id == post.id);
      });
    }
    return <Gallery display={display} navigation={this.props.navigation} user={user} bookmarks={bookmarks} />;   
  }
         
}

const mapStateToProps = (state) => {
  return {
    feed: state.feed,
    user: state.user,
    bookmarks: state.bookmarks
  };
};


export default connect(mapStateToProps)(ImageView);
