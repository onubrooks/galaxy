// Gallery.js
import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
// import ImageViewer from "@dwqs/react-native-image-viewer";
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
    const { images } = this.props;
    const { index, shown } = this.state;
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