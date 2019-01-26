import React, { Component } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import {
  Container,
  Header,
  Body,
  Left,
  Text,
  Content,
  Spinner
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../../../components/styles";
// redux imports
import { connect } from "react-redux";
import { fetchProfile } from "../actions/actions";
import { ScrollView } from "react-native-gesture-handler";

export class ViewProfileScreen extends Component {
    componentWillMount() {
        let { userId, userHandle } = this.props.navigation.params;
        this.props.fetchProfile(userHandle, userId);
    }
  render() {
      let { profile } = this.props;
    return <Container>
        <Header style={[styles.header, { backgroundColor: "white" }]} androidStatusBarColor="#006E8C">
          <Left style={{ maxWidth: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="md-arrow-back" size={33} color="#006E8C" />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{ fontWeight: "900", color:"#006E8C" }}>{ this.props.userHandle}</Text>
          </Body>
        </Header>
        <Content>
            {profile.loading ? 
            <View style={styles.loadingIndicator}>
                <Spinner color={"#006E8C"} size={Platform.OS === 'ios' ? 1 : 20} />
            </View> 
            : <ScrollView>
                    <ProfileSummary navigation={this.props.navigation} user={profile.data} />
                    <Text
                        style={{ fontWeight: "bold", marginLeft: 15 }}
                    >
                        {profile.data.fullname}
                    </Text>
                    <Text
                        style={{ marginLeft: 15 }}
                    >
                        {profile.data.status}
                    </Text>
            </ScrollView>}
        </Content>
      </Container>;
  }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    };
};

const mapDispatchToProps = {
    fetchProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProfileScreen);

