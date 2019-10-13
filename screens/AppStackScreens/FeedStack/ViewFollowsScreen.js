import React, { Component } from "react";
import {View, AsyncStorage, Platform } from "react-native"
import {
    Container,
    Spinner,
    Tab,
    Tabs,
    TabHeading,
    Icon,
    Text
} from "native-base";
import { Follows } from "../../../components/Follows";
import styles from "../../../components/styles";
// redux
import { connect } from "react-redux";
import {
  fetchProfile,
  fetchMyProfile,
  unFollowUser
} from "../../../actions/actions";
import { ScrollView } from "react-native-gesture-handler";
import Axios from "axios";

Axios.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem("userToken");
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export class ViewFollowsScreen extends Component {
         constructor(props) {
           super(props);
           this.state = {
             followers: [],
             followersLoading: true,
             following: [],
             myFollowing: [],
             followingLoading: true
           };
         }
         componentDidMount() {
           this.getFollowers();
           this.getFollowing();
           this.getMyFollowing();
         }
         componentDidUpdate(prevProps) {
           if (!this.props.navigation.getParam("self", false)){
             let newUserId = this.props.navigation.getParam(
               "self",
               false
             )
               ? this.props.navigation.getParam("user", null).id
               : this.props.navigation.getParam("profile", null)
                   .userId;
            let oldUserId = prevProps.navigation.getParam("self", false)
              ? this.props.navigation.getParam("user", null).id
              : this.props.navigation.getParam("profile", null)
                  .userId;
             if (newUserId != oldUserId) {
               this.setState({
                 followers: [],
                 followersLoading: true,
                 following: [],
                 myFollowing: [],
                 followingLoading: true
               });
               this.getFollowers();
               this.getFollowing();
               this.getMyFollowing();
             }
           } 
         }

         getFollowers = () => {
           let user = this.props.navigation.getParam("self", false)
             ? this.props.navigation.getParam("user", null).id
             : this.props.navigation.getParam("profile", null).userId;
           let endpoint = `https://api.leedder.com/api/v1.0/users/followers/${user}`;
           Axios(endpoint, {
             method: "get"
           })
             .then(res => {
               let data = res.data;
               if (!data.error) {
                 this.setState({ followers: data });
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
             .finally(() => this.setState({ followersLoading: false }));
         };

         getFollowing = () => {
           let user = this.props.navigation.getParam("self", false)
             ? this.props.navigation.getParam("user", null).id
             : this.props.navigation.getParam("profile", null).userId;
           let endpoint = `https://api.leedder.com/api/v1.0/users/following/${user}`;
           Axios(endpoint, {
             method: "get"
           })
             .then(res => {
               let data = res.data;
               if (!data.error) {
                 this.setState({ following: data });
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

         getMyFollowing = () => {
           let user = this.props.user.id;
           let endpoint = `https://api.leedder.com/api/v1.0/users/following/${user}`;
           Axios(endpoint, {
             method: "get"
           })
             .then(res => {
               let data = res.data;
               if (!data.error) {
                 this.setState({ myFollowing: data });
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

         render() {
           let user = this.props.navigation.getParam("self", false)
             ? this.props.user
             : this.props.profile;
           let initialPage = this.props.navigation.getParam("init", 0);
           return (
             <Container style={styles.container}>
               <Tabs
                 tabBarUnderlineStyle={{
                   backgroundColor: styles.headerColor
                 }}
                 style={[{ marginTop: 0 }]}
                 initialPage={initialPage}
               >
                 <Tab
                   heading={
                     <TabHeading style={{ backgroundColor: "white" }}>
                       <Text style={{ color: styles.headerColor }}>
                         Following
                       </Text>
                     </TabHeading>
                   }
                 >
                   <ScrollView>
                     {this.state.followingLoading ? (
                       <View style={styles.loadingIndicator}>
                         <Spinner
                           color={styles.headerColor}
                           size={Platform.OS === "ios" ? 1 : 20}
                         />
                       </View>
                     ) : (
                       this.state.following.map(item => (
                         <Follows
                           personData={item}
                           key={item.userId}
                           unFollowUser={this.props.unFollowUser}
                           myId={this.props.user.id}
                           myFollows={this.state.myFollowing}
                           navigation={this.props.navigation}
                         />
                       ))
                     )}
                   </ScrollView>
                 </Tab>
                 <Tab
                   heading={
                     <TabHeading style={{ backgroundColor: "white" }}>
                       <Text style={{ color: styles.headerColor }}>
                         Followers
                       </Text>
                     </TabHeading>
                   }
                 >
                   <ScrollView>
                     {this.state.followerLoading ? (
                       <View style={styles.loadingIndicator}>
                         <Spinner
                           color={styles.headerColor}
                           size={Platform.OS === "ios" ? 1 : 20}
                         />
                       </View>
                     ) : (
                       this.state.followers.map(item => (
                         <Follows
                           personData={item}
                           key={item.userId}
                           unFollowUser={this.props.unFollowUser}
                           myId={this.props.user.id}
                           myFollows={this.state.myFollowing}
                           navigation={this.props.navigation}
                         />
                       ))
                     )}
                   </ScrollView>
                 </Tab>
               </Tabs>
             </Container>
           );
         }
       }

const mapStateToProps = state => {
    return {
        user: state.user,
        profile: state.profile
    };
};

const mapDispatchToProps = {
  fetchProfile,
  fetchMyProfile,
  unFollowUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewFollowsScreen);
