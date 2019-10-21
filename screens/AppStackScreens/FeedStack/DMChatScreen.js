import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
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
import Axios from "axios";

import styles from "../../../components/styles";
const sly = require("../../../assets/avatar.png");
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

export class DMChatScreen extends React.Component {
         constructor(props) {
           super(props);
           this.interval = null;
           this.chattingWith = props.navigation.getParam(
             "chattingWith",
             null
           );
           this.state = {
             messages: [],
             cancel: null,
             CancelToken: Axios.CancelToken,
             chatEndpoint:
               "https://api.leedder.com/api/v1.0/DM/conversations/",
             sendEndpoint: "https://api.leedder.com/api/v1.0/DM/send",
             fetching: true,
             posting: false
           };
         }
         static navigationOptions = { tabBarVisible: false };

         componentWillMount() {
           this.fetchConversation();
           this.interval = setInterval(this.fetchConversation, 30000);
         }
         componentWillMount() {
           this.interval && clearInterval(this.interval)
         }
         componentDidCatch(error, info) {
           // Display fallback UI
           this.setState({ hasError: true });
           console.log(error);
         }

         fetchConversation = () => {
           let otherId = this.chattingWith.userId;
           let selfId = this.props.user.id;
           let otherAvatar = this.chattingWith.userAvatar;
           let selfAvatar = this.props.user.userAvatar;
           let otherHandle = this.chattingWith.userHandle;
           let selfHandle = this.props.user.userHandle;
           let endpoint = `${
             this.state.chatEndpoint
           }${selfId}/${otherId}`;
           Axios.get(endpoint, {
             cancelToken: new this.state.CancelToken(c =>
               this.setState({ cancel: c })
             )
           })
             .then(res => {
               let data = res.data;
               if (data.error && data.error === "Unauthenticated.") {
                 AsyncStorage.removeItem("userToken");
                 this.props.navigation.navigate("Auth", {});
               }
               let messages =
                 data.map(item => {
                   return {
                     _id: item.id,
                     text: item.message,
                     createdAt: item.created_at,
                     user: {
                       _id: item.sender_id,
                       name:
                         item.sender_id == selfId
                           ? selfHandle
                           : otherHandle,
                       avatar:
                         item.sender_id == selfId
                           ? selfAvatar
                           : otherAvatar
                     }
                   };
                 }) || [];
               this.setState({
                 messages: messages.reverse().concat(this.state.messages)
               });
             })
             .finally(() => this.setState({ fetching: false }));
         };

         onSend(messages = []) {
           this.setState(previousState => ({
             messages: GiftedChat.append(
               previousState.messages,
               messages
             )
           }));
           this.setState({ posting: true });
           let endpoint = this.state.sendEndpoint;
           let msg = messages[0].text;
           Axios(endpoint, {
             method: "post",
             data: {
               sender: this.props.user.id,
               receiver: this.chattingWith.userId,
               msg
             }
           }).then(res => {
                let data = res.data;
                if (data.error && data.error === "Unauthenticated.") {
                  AsyncStorage.removeItem("userToken");
                  this.props.navigation.navigate("Auth", {});
                }
                console.log(data)
              })
              .finally(() => this.setState({ posting: false }));
         }

         renderBubble = props => {
           return (
             <Bubble
               {...props}
               textStyle={{
                 right: {
                   color: "yellow"
                 }
               }}
               wrapperStyle={{
                 left: {
                   backgroundColor: "#006E8C"
                 }
               }}
             />
           );
         };

         render() {
           let { user, comments } = this.props;
           let source = this.chattingWith.userAvatar
             ? { uri: this.chattingWith.userAvatar }
             : sly; 
          let handle = this.chattingWith.userHandle;
           return (
             <Container style={styles.container}>
               <Header style={[styles.header, { height: 70 }]}>
                 <Left>
                   <TouchableOpacity
                     onPress={() => this.props.navigation.goBack()}
                   >
                     <Icon
                       name="ios-arrow-back"
                       style={{ color: "#006E8C" }}
                     />
                   </TouchableOpacity>
                 </Left>
                 <Body>
                   <View style={{ alignItems: "center", marginLeft: 40, }}>
                     <Thumbnail small source={source} />
                     <Text
                       style={{
                         fontWeight: "500",
                         color: "#006E8C"
                       }}
                     >
                       {handle}
                     </Text>
                   </View>
                 </Body>
               </Header>
               <View style={{ flex: 1 }}>
                 <GiftedChat
                   messages={this.state.messages}
                   onSend={messages => this.onSend(messages)}
                   user={{
                     _id: +this.props.user.id
                   }}
                   showUserAvatar={true}
                 />
                 {/* <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={80} /> */}
               </View>
             </Container>
           );
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