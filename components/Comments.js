import React, { Component } from "react";
import {
  Dimensions
} from "react-native";

import {
  Container,
  Content,
  Body,
  Left,
  Right,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail
} from "native-base";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Comments extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
             let { user, post = [], comments, users } = this.props;
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
                   <List>
                     <ListItem avatar>
                       <Left>
                         <Thumbnail small source={post.thumbnail} />
                       </Left>
                       <Body>
                         <Text>
                         <Text style={{ fontWeight: '900' }}>{post.handle} </Text>{post.text}
                         </Text>
                         <Text note>{post.ago}</Text>
                       </Body>
                       <Right />
                     </ListItem>
                     {thisComments.map((data, idx) => (
                       <ListItem avatar key={idx}>
                         <Left>
                           <Thumbnail
                             small
                             source={data.commenter.avatar}
                           />
                         </Left>
                         <Body>
                           <Text>
                             <Text style={{fontWeight:'900'}}>{data.commenter.username} </Text>
                             {data.comment.comment}
                           </Text>
                           <Text note>4m</Text>
                         </Body>
                         <Right>
                           <Icon
                             size={15}
                             name="md-heart-outline"
                           />
                         </Right>
                       </ListItem>
                     ))}
                   </List>
                 </Content>
               </Container>;
           }
}