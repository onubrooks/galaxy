import React, { Component } from "react";
import { AsyncStorage, ScrollView, View, TouchableOpacity, Platform } from "react-native";
import {
    Container,
    Header,
    Content,
    Tab,
    Tabs,
    TabHeading,
    Title,
    Toast,
    Body,
    Left,
    Spinner,
    Icon
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

import ProfileSummaryNew from "../../../components/ProfileSummaryNew";
import ImageView from "../../../components/ImageView";
import FeedItemWrapper from "../../../components/FeedItemWrapper";
import styles from "../../../components/styles";

import { connect } from "react-redux";
import {
  fetchProfile,
  fetchMyProfile,
  fetchMusic,
  fetchFollowers,
  fetchFollowing,
  fetchMyFollowers,
  fetchMyFollowing,
  unFollowUser
} from "../../../actions/actions";
import Axios from "axios";

Axios.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem("userToken");
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
export class ViewProfileScreen extends Component {
         constructor(props) {
           super(props);
           this.state = {
             other: props.navigation.getParam("other", false),
             profileLoading: true,
             profile: null,
             songsLoading: true,
             songs: [],
             iFollow: false,
             following: [],
             followingLoading: true
           };
         }
         componentDidMount() {
           this.getProfile().then(() => this.getSongs());
           this.getFollowing()
         }
         componentDidUpdate(prevProps){
           if(this.props.navigation.getParam("userId", null) != prevProps.navigation.getParam("userId", null)){
             this.getProfile().then(() => this.getSongs());
             this.getFollowing();
           }
         }

         getProfile = () => {
           let userId, userHandle;
           userId = this.props.navigation.getParam("userId", null);
           userHandle = this.props.navigation.getParam(
             "userHandle",
             null
           );
           this.setState({
             profileLoading: true
           });
           return Axios.get(
             `https://api.leedder.com/api/v1.0/users/profile/${userId}`
           )
             .then(
               res => {
                 let data = res.data;
                 if (data.error && data.error === "Unauthenticated.") {
                   AsyncStorage.removeItem("userToken");
                   this.props.navigation.navigate("Auth", {});
                 } else {
                   // if (cb.displaySuccessToast) {
                   //   Toast.show({
                   //     text: cb.successMsg,
                   //     position: "bottom",
                   //     duration: 2000
                   //   });
                   // }
                   this.setState({
                     profile: data
                   });
                 }
               },
               error => {}
             )
             .catch(error => {
               Toast.show({
                 text: "Unable to fetch profile",
                 position: "bottom",
                 duration: 2000
               });
             })
             .finally(() => {
               this.setState({
                 profileLoading: false
               });
             });
         };

         getSongs = () => {
           let userId = this.props.navigation.getParam("userId", null);
           return Axios.get(
             `https://api.leedder.com/api/v1.0/music/user/${userId}`
           )
             .then(
               res => {
                 let data = res.data;
                 this.setState({
                   songs: data
                 });
               },
               error => {}
             )
             .catch(error => {})
             .finally(() => {
               this.setState({
                 songsLoading: false
               });
             });
         };

         getFollowing = () => {
           
           let endpoint = `https://api.leedder.com/api/v1.0/users/following/${this.props.user.id}`;
           Axios(endpoint, {
             method: "get"
           })
             .then(res => {
               let following = res.data;
               if (!following.error) {
                 let iFollow = following.some(
                   d => d.userId == this.props.user.id
                 );
                 this.setState({ following, iFollow });
               } else {
                 Toast.show({
                   text: "error fetching data...",
                   position: "bottom",
                   duration: 3000
                 });
               }
             })
             .catch(error => {
               console.log(error);
               Toast.show({
                 text: "operation failed, please check network...",
                 position: "bottom",
                 duration: 3000
               });
             })
             .finally(() => this.setState({ followingLoading: false }));
         };

         unFollowUser = () => {
           let iFollow = this.state.iFollow;
           this.setState({ followLoading: true });
           let partyA = this.props.user.id;
           let partyB = this.props.navigation.getParam("userId", null);
           Axios.post(`https://api.leedder.com/api/v1.0/users/follow`, {
             partyA,
             partyB
           })
             .then(
               res => {
                 if (res.data === true) {
                   let noFollowers = iFollow
                     ? this.state.profile.noFollowers - 1
                     : this.state.profile.noFollowers + 1;
                   this.setState({
                     iFollow: !this.state.iFollow,
                     profile: {
                       ...this.state.profile,
                       noFollowers
                     }
                   });
                 } else {
                   Toast.show({
                     text: "Something went wrong...",
                     position: "bottom",
                     duration: 2000
                   });
                 }
               },
               error => {
                 console.log(error);
               }
             )
             .finally(() => {
               this.setState({ followLoading: false });
             });
         };

         render() {
           let display = this.state.songs;
           let profile = this.state.profile;
           let user = this.props.user;
           if (this.state.profileLoading) {
             return (
               <Container>
                 <Header
                   style={[
                     styles.header,
                     { backgroundColor: "white", height: 45 }
                   ]}
                 >
                   <Left style={{ maxWidth: 50 }}>
                     <TouchableOpacity
                       onPress={() =>
                         this.props.navigation.navigate("Feed")
                       }
                     >
                       <Icon
                         name="md-close"
                         style={{
                           color: "#666666",
                           fontFamily: "Segoe UI Bold",
                           fontSize: 20
                         }}
                       />
                     </TouchableOpacity>
                   </Left>
                   <Body>
                     <Title
                       style={{
                         color: "#666666",
                         fontFamily: "Segoe UI Bold",
                         fontSize: 15
                       }}
                     >
                       Please wait...
                     </Title>
                   </Body>
                 </Header>
                 <Content>
                   <View style={styles.loadingIndicator}>
                     <Spinner
                       color={"#666666"}
                       size={Platform.OS === "ios" ? 1 : 20}
                     />
                   </View>
                 </Content>
               </Container>
             );
           }
           return (
             <Container style={{ backgroundColor: "white" }}>
               <Header
                 style={[
                   styles.header,
                   { backgroundColor: "white", height: 45 }
                 ]}
               >
                 <Left style={{ maxWidth: 50 }}>
                   <TouchableOpacity
                     onPress={() => this.props.navigation.goBack()}
                   >
                     <Icon
                       name="ios-arrow-back"
                       style={{
                         color: styles.headerColor,
                         fontFamily: "Segoe UI Bold",
                         fontSize: 20
                       }}
                     />
                   </TouchableOpacity>
                 </Left>
                 <Body>
                   <Title
                     style={{
                       color: styles.headerColor,
                       fontFamily: "Segoe UI Bold",
                       fontSize: 15,
                       marginLeft: -30
                     }}
                   >
                     {`@${profile.userHandle} (${
                       profile.noSongs
                     } Songs)`}
                   </Title>
                 </Body>
               </Header>
               <ScrollView>
                 <ProfileSummaryNew
                   navigation={this.props.navigation}
                   profile={profile}
                   user={user}
                   iFollow={this.state.iFollow}
                   followingLoading={this.state.followingLoading}
                   myId={this.props.user.id}
                   unFollowUser={this.unFollowUser}
                 />

                 <Tabs transparent>
                   <Tab
                     heading={
                       <TabHeading
                         style={{ backgroundColor: "white" }}
                       >
                         <Ionicons
                           name="md-apps"
                           size={26}
                           color="#666666"
                         />
                       </TabHeading>
                     }
                   >
                     <ImageView
                       display={display}
                       navigation={this.props.navigation}
                       fetching={this.state.songsLoading}
                     />
                   </Tab>
                   <Tab
                     heading={
                       <TabHeading
                         style={{ backgroundColor: "white" }}
                       >
                         <Ionicons
                           name="ios-menu"
                           size={26}
                           color="#666666"
                         />
                       </TabHeading>
                     }
                   >
                     <FeedItemWrapper
                       navigation={this.props.navigation}
                       display={display}
                     />
                   </Tab>
                 </Tabs>
               </ScrollView>
             </Container>
           );
         }
       }

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  fetchProfile,
  fetchMyProfile,
  fetchMusic,
  fetchFollowers,
  fetchFollowing,
  fetchMyFollowers,
  fetchMyFollowing,
  unFollowUser
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileScreen);
