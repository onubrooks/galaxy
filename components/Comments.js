import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Body,
  Left,
  Right,
  //Icon,
  List,
  ListItem,
  Text,
  Thumbnail
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import CommentInput from "./CommentInput";

import styles from "./styles";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Comments extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
             let { user, post, comments, users } = this.props;
             // this next line maps through the comments object and converts it into an array using Object.keys()
             //which is easier to process for display. same thing is done for users object down below
             let thisComments = Object.keys(comments)
               .map((val, idx) => comments[val])
               .filter(comment => comment.post_id == post.id);
             thisComments = thisComments.map(comment => {
               let usersArr = Object.keys(users).map((val, idx) => users[val]);
               let commenter = usersArr.find(user => user.username == comment.author);
               return { 
                 comment, 
                 commenter 
                  }; 
             });
             return <Container>
                 <Content>
                   <List style={{ height: (height * 80) / 100, maxHeight: (height * 80) / 100 }}>
                     <ListItem avatar>
                       <Left>
                       <Thumbnail small source={post.thumbnail} />
                       </Left>
                       <Body>
                         <Text>
                           {post.handle} {post.text}
                         </Text>
                         <Text note>{post.ago}</Text>
                       </Body>
                       <Right />
                     </ListItem>
                   {thisComments.map((data, idx) => <ListItem avatar key={idx}>
                         <Left>
                       <Thumbnail small source={data.commenter.avatar} />
                         </Left>
                         <Body>
                           <Text>
                             {data.commenter.username} {data.comment.comment}
                           </Text>
                           <Text note>4m</Text>
                         </Body>
                         <Right>
                       <Ionicons size={15} name="md-heart-outline" />
                         </Right>
                       </ListItem>)}
                   </List>
                   <CommentInput user={user} post={post} addComment={this.addComment} style={{ flex: 0.1, position: "fixed", bottom: 0 }} />
                 </Content>
               </Container>;
           }
}