/**
 * this wrapper class for Gallery componont was created because a recurring pattern of the
 * functionality provided by all the methods in this class was noticed and had to be abstracted out
 * for code reuse, therefore avoiding repetition of the same functionality across different classes / components
 * example components that use this same functionality include: SearchScreen.js, ProfileScreen.js and SavedGridScreen.js
 * the class does all the necessary filtering based on the route name and passes the filtered data to the Gallery component for display
*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Text, Spinner } from "native-base"

import Gallery from "./Gallery";

export class ImageView extends Component {
  render() {
    const { user, display, NoResults, fetching = false} = this.props;

    if (!display.length && !fetching) return <NoResults />;
    if (!display.length && fetching) return <Spinner />;
  
    return <Gallery display={display} navigation={this.props.navigation} user={user} />;   
  }
         
}

const mapStateToProps = (state) => {
  return {
    feed: state.feed,
    user: state.user
  };
};


export default connect(mapStateToProps)(ImageView);
