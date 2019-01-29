import React, { Component } from "react";
import {
    Container,
    Header,
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

export class ViewFollowsScreen extends Component {
    render() {
        let user = this.props.navigation.getParam('self', false) ? this.props.user : this.props.profile;
        let initialPage = this.props.navigation.getParam("init", 0);
        return (
            <Container style={styles.container}>
                <Tabs
                    tabBarUnderlineStyle={{ backgroundColor: "#006E8C" }}
                    style={[{ marginTop: 24 }]}
                    initialPage={initialPage}
                >
                    <Tab
                        heading={
                            <TabHeading style={{ backgroundColor: "white" }}>
                                <Text style={{ color: "#006E8C" }}>Following</Text>
                            </TabHeading>
                        }
                    >
                    <ScrollView>
                        {user.following.loading ?
                            <View style={styles.loadingIndicator}>
                                <Spinner color={"#006E8C"} size={Platform.OS === "ios" ? 1 : 20} />
                            </View>
                            : user.following.data.map((item) => <Follows
                                personData={item}
                                key={item.userId}
                                unFollowUser={this.props.unFollowUser}
                                myId={this.props.user.id}
                                myFollows={this.props.user.following}
                            />)}
                            </ScrollView>
                    </Tab>
                    <Tab
                        heading={
                            <TabHeading style={{ backgroundColor: "white" }}>
                                <Text style={{ color: "#006E8C" }}>Followers</Text>
                            </TabHeading>
                        }
                    >
                    <ScrollView>
                        {user.followers.loading ?
                            <View style={styles.loadingIndicator}>
                                <Spinner color={"#006E8C"} size={Platform.OS === "ios" ? 1 : 20} />
                            </View>
                            : user.followers.data.map((item) => <Follows
                                personData={item}
                                key={item.userId}
                                unFollowUser={this.props.unFollowUser}
                                myId={this.props.user.id}
                                myFollows={this.props.user.following}
                            />)}
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
