import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import { Thumbnail, Form, Item, Input, Button, Text } from "native-base";

export default class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
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
  
  render() {
    let { user } = this.props;
      return <View style={{ flex: 0.1, flexDirection:"row", bottom: 0, marginHorizontal:9 }}>      
            <Thumbnail small source={user.thumbnail} style={{ padding: -20 }} />
            <Form style={{width:"90%"}}>
              <Item>
                <Input placeholder='Add a comment...' onFocus={(event) => this.onInputFocus(event)} onBlur={this.onInputBlur} value={this.state.comment} onChangeText={(text)=>this.setState({comment:text})} />
                {this.state.inputFocused && this.state.comment.length < 1 ?
                 <Button small disabled transparent style={{ right:0, paddingBottom:-15 }}><Text>POST</Text></Button>
                :
              (this.state.comment.length > 0 ?
                <Button small transparent style={{ right:0, paddingBottom:-15 }}><Text>POST</Text></Button> : null)
              }
              </Item>
            </Form>       
          </View>
  }
}