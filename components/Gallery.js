// Gallery.js
import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import GalleryImage from './GalleryImage';
export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      shown: false,
    };
  }
  
  render() {
    let display;
    const { images, user } = this.props;
    const { index, shown } = this.state;
    if(this.props.navigation.state.routeName == 'Explore') {
      display = images;
    }
    else if (this.props.navigation.state.routeName == 'Likes') {
      display = images.filter((post, index) => {
        return post.hits.some((id) => id == user.id)
      });
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {images.map((image, idx) => <GalleryImage idx={idx} key={idx} navigation={this.props.navigation} uri={image.artwork} /> )}
        
      </View>
    );
  }
}
Gallery.propTypes = {
  images: PropTypes.array,
};