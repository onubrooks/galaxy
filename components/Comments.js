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
             let { user, song = {}, comments = {} } = this.props;
             console.log('comments ', comments);
             // this next line maps through the comments object and converts it into an array using Object.keys()
             //which is easier to process for display. same thing is done for users object down below
             let thisComments = Object.keys(comments.byId)
               .map((key, idx) => comments.byId[key]).filter((item) => item.songId == comments.currentSong);
             return <Container>
                 <Content>
                   <List>
                     <ListItem avatar>
                       <Left>
                         <Thumbnail small source={{uri: song.userAvatar}} />
                       </Left>
                       <Body>
                         <Text>
                         <Text style={{ fontWeight: '900' }}>{song.userHandle} </Text>{song.songTitle}
                         </Text>
                         <Text note>{song.songDate}</Text>
                       </Body>
                       <Right />
                     </ListItem>
                     {thisComments.map((data, idx) => (
                       <ListItem avatar key={idx}>
                         <Left>
                           <Thumbnail
                             small
                             source={{uri: data.userAvatar}}
                           />
                         </Left>
                         <Body>
                           <Text>
                             <Text style={{fontWeight:'900'}}>{data.userHandle} </Text>
                             {data.comment}
                           </Text>
                           <Text note>{ data.commentDate }</Text>
                         </Body>
                         {/* <Right>
                           <Icon
                             size={15}
                             name="md-heart-outline"
                           />
                         </Right> */}
                       </ListItem>
                     ))}
                   </List>
                 </Content>
               </Container>;
           }
}