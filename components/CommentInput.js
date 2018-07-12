import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Keyboard
} from "react-native";
import { Thumbnail, Form, Item, Input, Button, Text } from "native-base";

let styles = StyleSheet.create({
  noBorder: {
    borderColor: "white"
  },
  grid: { 
    flex: 0.1, 
    flexDirection: "row", 
    marginHorizontal: 1, 
    marginBottom: 5 
  },
  commentScreen: {
    marginHorizontal: 15,
    marginBottom: 15
  }
});

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
    //Keyboard.dismiss();
    this.setState({inputFocused: true});
    console.log('focus');
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
      Keyboard.dismiss();
      this.props.addComment(this.props.post.id, this.state.comment);
      this.setState({ comment: '' });
    } else
    alert('Please type a comment before posting...');
  }
  
  render() { 
    let { user, post, multiline = false, editable = true, commentScreen = false } = this.props;
      return <View style={[styles.grid, commentScreen ? styles.commentScreen : {}]}>
        <Thumbnail small source={user.thumbnail} style={{ padding: -20 }} />
        <Form style={{width:"90%"}}>
          <Item style={styles.noBorder}>
            <Input 
              style={{fontSize: 14}}
              placeholder='Add a comment...' 
              onFocus={(event) => this.onInputFocus(event)} 
              onBlur={(event) => this.onInputBlur(event)} 
              value={this.state.comment} 
              onChangeText={(text)=>this.setState({comment:text})} 
              multiline={multiline}
              editable={editable}
              autoFocus={commentScreen} 
              onSubmitEditing={this.postComment} />
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