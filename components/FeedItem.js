/**
 * Copyright (c) 2018, Artinict, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
'use strict';

import React, { Component } from "react";
import {
  ImageBackground,
  View,
  TouchableOpacity
} from "react-native";
import {
  Body,
  Left,
  Right,
  Card,
  CardItem,
  Text,
  Thumbnail
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/EvilIcons";
import styles from "./styles";
import CommentInput from "./CommentInput";
import Player from "./OldPlayer";
import UserHandle from "./UserHandle";
import * as Animatable from "react-native-animatable";

const ICON_HIT_BUTTON = require('../assets/icons/fist-red.png');
const ICON_UNHIT_BUTTON = require('../assets/icons/fist-white-edit.png');

export class FeedItem extends Component {
         constructor(props) {
           super(props);
           this.handlePress = this.handlePress.bind(this);
           this.onInputFocus = this.onInputFocus.bind(this);
           this.onInputBlur = this.onInputBlur.bind(this);
           this.gotoComments = this.gotoComments.bind(this);
           this.addComment = this.addComment.bind(this);
           this.state = { inputFocused: false, comment: "", show: false };
         }

         onInputFocus() {
           this.setState({ inputFocused: true });
           console.log("focus");
         }
         onInputBlur() {
           this.setState({ inputFocused: false });
           console.log("blur");
         }
         onInputTextChange() {
           this.setState({ inputFocused: true });
           console.log("focus");
         }
         handlePress(song) {
           this.props.setModalVisible(true, song);
         }
         gotoComments(song) {
           this.props.gotoComments(song);
         }
        addComment(songId, comment) {
          this.props.addComment(songId, comment);
        }

         render() {
           const { song, user } = this.props;
           return (
             <Card transparent style={styles.noBorder}>
               <CardItem style={{ height: 50 }}>
                 <Left>
                   <Thumbnail
                     small
                     source={{ uri: song.userAvatar }}
                     style={{ padding: -20 }}
                   />
                   <Body>
                     <UserHandle
                       userId={song.userId}
                       userHandle={song.userHandle}
                       navigation={this.props.navigation}
                     />
                     {/* <Text style={styles.handle}>{song.userHandle}</Text> */}
                   </Body>
                 </Left>
                 <Right>
                   <TouchableOpacity
                     style={{ width: 30, paddingRight: 10 }}
                     transparent
                     onPress={() => this.handlePress(song)}
                   >
                     <Ionicons name="ios-more" size={25} />
                   </TouchableOpacity>
                 </Right>
               </CardItem>

               <CardItem cardBody style={{ marginHorizontal: -100 }}>
                 <ImageBackground
                   style={{ flex: 1 }}
                   source={{ uri: song.coverPath }}
                   resizeMode="cover"
                 >
                   <Player
                     title={song.songTitle}
                     songPath={song.songPath}
                   />
                 </ImageBackground>
               </CardItem>

               <CardItem style={{ paddingVertical: -50 }}>
                 <Left>
                   <TouchableOpacity
                     onPress={() =>
                       this.props.toggleLike(song.songId, +user.id)
                     }
                   >
                     <Animatable.Image
                       animation="bounce"
                       style={{ width: 30, height: 30 }}
                       source={
                         song.iHit
                           ? ICON_HIT_BUTTON
                           : ICON_UNHIT_BUTTON
                       }
                     />
                   </TouchableOpacity>
                   <Text />
                   <TouchableOpacity
                     onPress={() => this.gotoComments(song)}
                   >
                     <Icon name="comment" size={30} />
                   </TouchableOpacity>
                 </Left>
                 <Body />
                 <Right>
                   <TouchableOpacity
                     onPress={() =>
                       this.props.toggleBookmark(
                         song.songId,
                         +user.id
                       )
                     }
                   >
                     <Ionicons
                       name={
                         song.iFav ? "ios-heart" : "ios-heart-empty"
                       }
                       size={25}
                       color="red"
                     />
                   </TouchableOpacity>
                 </Right>
               </CardItem>
               <View
                 style={{
                   paddingLeft: 10,
                   marginTop: -15,
                   overflow: "hidden",
                   flex: 1
                 }}
               >
                 <Text style={styles.hits}>{song.noHits} hits</Text>
                 <Text style={styles.comment_handle}>
                   <UserHandle
                     userId={song.userId}
                     userHandle={song.userHandle}
                     navigation={this.props.navigation}
                   />{" "}
                   {song.songDescription}
                 </Text>
                 <Text style={styles.note} note>
                   {song.songDate}
                 </Text>
                 {this.props.navigation.state.routeName == "Feed" ? (
                   <CommentInput
                     user={user}
                     song={song}
                     addComment={this.addComment}
                   />
                 ) : null}
               </View>
             </Card>
           );
         }
       }
export default FeedItem;
