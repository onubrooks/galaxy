import React, { Component } from "react";
import ReactNative, {
  Image,
  ImageBackground,
  View,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Body,
  Left,
  Right,
  //Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Form,
  Item,
  Input
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/EvilIcons";
import { Dropdown } from "react-native-material-dropdown";
import styles from "./styles";
import KeyboardAvoidingScrollView from "./KeyboardAvoidingScrollView";
import CommentInput from "./CommentInput";
import Player from "./Player";

export class FeedItem extends Component {
         constructor(props) {
           super(props);
           this.handlePress = this.handlePress.bind(this);
           this.onInputFocus = this.onInputFocus.bind(this);
           this.onInputBlur = this.onInputBlur.bind(this);
           this.gotoComments = this.gotoComments.bind(this);
           this.addComment = this.addComment.bind(this);
           this.state = { inputFocused: false, comment: "" };
         }
         onInputFocus(event) {
           this.setState({ inputFocused: true });
           console.log("focus");
           //console.log(event);
           //this.props._scrollToInput(ReactNative.findNodeHandle(event.target));
         }
         onInputBlur() {
           this.setState({ inputFocused: false });
           console.log("blur");
         }
         onInputTextChange() {
           this.setState({ inputFocused: true });
           console.log("focus");
         }
         handlePress() {
           this.props.setModalVisible(true);
         }
         gotoComments(post) {
           this.props.gotoComments(post);
         }
        addComment(post_id, comment) {
          this.props.addComment(post_id, comment);
        }

         render() {
           const { post, user, bookmarks, addComment } = this.props;
           return <Card transparent>
               <CardItem style={{ height: 50 }}>
                 <Left>
                   <Thumbnail small source={post.thumbnail} style={{ padding: -20 }} />
                   <Body>
                     <Text style={styles.handle}>{post.handle}</Text>
                   </Body>
                 </Left>
                 <Right>
                   <TouchableOpacity transparent onPress={this.handlePress}>
                     <Ionicons name="md-more" size={25} />
                   </TouchableOpacity>
                 </Right>
               </CardItem>

               <CardItem cardBody style={{ marginHorizontal: -100 }}>
               
               <ImageBackground style={{
                   flex: 1,
                   alignSelf: 'stretch'
                 }} source={post.artwork} >
               
                 <Player />
                 </ImageBackground>
               
               </CardItem>

               <CardItem style={{ paddingVertical: 0 }}>
                 <Left>
                   <TouchableOpacity onPress={() => this.props.toggleLike(post.id)}>
                     <Ionicons name={post.hits.some(id => id === user.id) ? "md-heart" : "md-heart-outline"} size={30} />
                   </TouchableOpacity>
                   <Text />
                   <TouchableOpacity onPress={() => this.gotoComments(post)} >
                     <Icon name="comment" size={30} />
                   </TouchableOpacity>
                 </Left>
                 <Body />
                 <Right>
                 <TouchableOpacity onPress={() => this.props.toggleBookmark(post.id)}>
                   <Ionicons name={bookmarks.some(id => id === post.id) ? "ios-bookmark" : "ios-bookmark-outline"} size={25} />
                   </TouchableOpacity>
                 </Right>
               </CardItem>
               <View style={{ paddingLeft: 10, marginTop: -15, overflow: "hidden", flex: 1 }}>
                 {post.hits.length ? <Text>
                     {post.hits.length} hits
                   </Text> : null}
                 <Text>
                   <Text>{post.handle}</Text> {post.text}
                 </Text>
                 <Text style={styles.note} note>
                   {post.ago}
                 </Text>
               <CommentInput user={user} post={post} addComment={this.addComment} />
               </View>
             </Card>;
         }
       }
export default FeedItem;
