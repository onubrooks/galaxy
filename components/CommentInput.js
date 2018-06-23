import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Thumbnail, Form, Item, Input, Button, Text } from "native-base";

export default class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.postComment = this.postComment.bind(this);
    this.state = {
      inputFocused: false,
      comment: ''
    }
  }
  onInputFocus(event) {
    this.setState({inputFocused: true});
    console.log('focus');
    //console.log(event);
    //this.props._scrollToInput(ReactNative.findNodeHandle(event.target));
  }
  onInputBlur() {
    this.setState({inputFocused: false});
    console.log('blur');
  }
  onInputTextChange() {
    this.setState({inputFocused: true});
    console.log('focus');
  }
  postComment() {
    if(this.state.comment.length > 0) {
      this.props.addComment(this.props.post.id, this.state.comment);
      this.setState({ comment: '' });
    } else
    alert('Please type a comment before posting...');
  }
  
  render() {
    let { user, post, multiline = false, editable = true, autoFocus = false } = this.props;
      return <View style={{ flex: 0.1, flexDirection:"row", bottom: 0, marginHorizontal:8 }}>
            <Thumbnail small source={user.thumbnail} style={{ padding: -20 }} />
            <Form style={{width:"90%"}}>
              <Item>
                <Input 
                  placeholder='Add a comment...' 
                  onFocus={(event) => this.onInputFocus(event)} 
                  onBlur={(event) => this.onInputBlur(event)} 
                  value={this.state.comment} 
                  onChangeText={(text)=>this.setState({comment:text})} 
                  multiline={multiline}
                  editable={editable}
                  autoFocus={autoFocus} />
                {this.state.inputFocused && this.state.comment.length < 1 ?
                 <Button small disabled transparent style={{ right:0, paddingBottom:-15 }}><Text>POST</Text></Button>
                :
              (this.state.comment.length > 0 ?  
                <Button small transparent style={{ right:0, paddingBottom:-15 }} onPress={ this.postComment }>
                  <Text>POST</Text>
                </Button> : null)
              }
              </Item>
            </Form>     
          </View>
  }
}