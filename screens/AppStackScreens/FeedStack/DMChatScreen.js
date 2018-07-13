import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";
import {
  Container,
  Header,
  Body,
  Left,
  Right,
  Icon,
  Text,
  Thumbnail
} from "native-base";

import { connect } from "react-redux";
import { commentPost } from "../../../actions/actions";

import { GiftedChat, Bubble } from "react-native-gifted-chat";

import styles from "../../../components/styles";
const sly = require("../../../assets/sly.jpg");
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

export class DMChatScreen extends React.Component {
         //static navigationOptions = { tabBarVisible: false };
         state = { messages: [] };

         componentWillMount() {
           this.setState({
             messages: [
               {
                 _id: 1,
                 text: "Hello developer",
                 createdAt: new Date(),
                 user: {
                   _id: 2,
                   name: "React Native",
                   avatar: "https://placeimg.com/140/140/any"
                 }
               },
               {
                 _id: 2,
                 text: "Hi dev ops",
                 createdAt: new Date(),
                 user: {
                   _id: 1,
                   name: "Native Base",
                   avatar: "https://placeimg.com/140/140/any"
                 }
               }
             ]
           });
         }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error); 
  }

         onSend(messages = []) {
           this.setState(previousState => ({
             messages: GiftedChat.append(
               previousState.messages,
               messages
             )
           }));
         }

         renderBubble = (props) => {
           return (
             <Bubble
               {...props}
               textStyle={{
                 right: {
                   color: 'yellow',
                 },
               }}
               wrapperStyle={{
                 left: {
                   backgroundColor: '#006E8C',
                 },
               }}
             />
           );
         }

         render() {
           let { user, comments } = this.props;
           return <Container style={styles.container}>
             <Header style={[styles.header, { backgroundColor: "white", height: 70 }]} androidStatusBarColor="#006E8C">
                 <Left>
                   <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                   <Icon name="md-arrow-back" style={{ color: "#006E8C" }}/>
                   </TouchableOpacity>
                 </Left>
                 <Body>
                   <View style={{ alignItems: "center" }}>
                     <Thumbnail small source={sly} />
                   <Text style={{ fontWeight: '500', color: "#006E8C" }}>max_payne</Text>
                   </View>
                 </Body>
               </Header>
             <View style={{ flex: 1 }}>
               <GiftedChat messages={this.state.messages} onSend={messages => this.onSend(messages)} user={{ _id: 1 }} />
               {/* <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={80} /> */}
             </View>
             </Container>;
         }
       }

const mapStateToProps = state => {
  return {
    user: state.user,
    comments: state.comments
  };
};

const mapDispatchToProps = {
  commentPost
};

export default connect(mapStateToProps, mapDispatchToProps)(DMChatScreen);