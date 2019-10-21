import React from "react";
import {
  TouchableOpacity,
  AsyncStorage,
  Platform
} from "react-native";
import {
  Container,
  Header,
  Content,
  Spinner,
  Left,
  Icon,
  Item,
  Input
} from "native-base";
import Axios from "axios";

import { connect } from "react-redux";
import { commentPost } from "../../../actions/actions";

import { DMItem } from "../../../components/DMItem";
import styles from "../../../components/styles";

export class DMListScreen extends React.Component {
         constructor(props) {
           super(props);
           this.state = {
             cancel: null,
             CancelToken: Axios.CancelToken,
             userChats: [],
             userResults: [],
             text: "",
             userEndpoint:
               "https://api.leedder.com/api/v1.0/search/users/",
             inboxEndpoint: "https://api.leedder.com/api/v1.0/DM/inbox/",

             fetching: false
           };
         }

         search = text => {
           if (text.charAt(0) === "@") {
             text = text.slice(1);
           }
           let endpoint = `${this.state.userEndpoint}${text}`;
           this.setState({
             fetching: true,
             userResults: []
           });

           this.state.cancel && this.state.cancel();
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
               this.setState({
                 userResults: data || []
               });
             })
             .finally(() => this.setState({ fetching: false }));
         };
         static navigationOptions = { tabBarVisible: false };
         go = chattingWith => {
           this.props.navigation.navigate("DMChat", { chattingWith });
         };
         render() {
           return (
             <Container style={styles.container}>
               <Header
                 searchBar
                 rounded
                 style={[styles.header2, { backgroundColor: "#EFEFEF" }]}
               >
                 <Left style={{ maxWidth: 50 }}>
                   <TouchableOpacity
                     onPress={() => this.props.navigation.goBack()}
                   >
                     <Icon
                       name="ios-arrow-back"
                       style={{ color: "#006E8C" }}
                     />
                   </TouchableOpacity>
                 </Left>
                 <Item
                   style={{
                     backgroundColor: "#EFEFEF",
                     marginLeft: 15
                   }}
                 >
                   <Icon name="ios-search" />
                   <Input
                     placeholder="Search for users..."
                     onChangeText={text => {
                       this.setState({ text });
                       this.search(text);
                     }}
                   />
                 </Item>
               </Header>
               <Content>
                 {this.state.fetching ? (
                   <Spinner
                     color={styles.headerColor}
                     size={Platform.OS === "ios" ? 1 : 20}
                   />
                 ) : null}
                 {this.state.userChats.length
                   ? this.state.userChats.map(item => (
                       <TouchableOpacity
                         key={item.userId}
                         activeOpacity={0.9}
                         onPress={() => this.go(item)}
                       >
                         <DMItem
                           handle={item.userHandle}
                           avatar={item.userAvatar}
                           caption={item.status}
                         />
                       </TouchableOpacity>
                     ))
                   : null}
                 {this.state.userResults.length
                   ? this.state.userResults.map(item => (
                       <TouchableOpacity
                         key={item.userId}
                         activeOpacity={0.9}
                         onPress={() => this.go(item)}
                       >
                         <DMItem
                           handle={item.userHandle}
                           avatar={item.userAvatar}
                           caption={item.status}
                         />
                       </TouchableOpacity>
                     ))
                   : null}
               </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(DMListScreen);