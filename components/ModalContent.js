import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Button, H1 } from "native-base";
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

export class FeedScreenModalContent extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress(val) {
    this.props.setModalVisible(false, null, val);
  }
  render() {
      return <View style={{ marginHorizontal: 20, backgroundColor:"white", width:"90%", borderRadius:6 }}>
            <View style={{marginLeft: 20}}>
                  <Text onPress={ () => this.handlePress('remove') } style={{marginVertical: 13, fontSize: 17}}>Remove</Text>
                  <Text onPress={ () => this.handlePress('facebook') } style={{marginVertical: 13, fontSize: 17}}>Block User</Text>
                  <Text onPress={() => this.handlePress('twitter')} style={{ marginVertical: 13, fontSize: 17 }}>Report Abuse</Text>
          <Text onPress={() => this.handlePress('twitter')} style={{ marginVertical: 13, fontSize: 17 }}>Unfollow</Text>
            </View>
      </View>
  }
}

export class ProfileScreenModalContent extends Component {
  constructor(props) {
    super(props);
  }
  newPhoto = () => {
    this.props.setModalVisible(false, {newPhoto: true});
  }

  removePhoto = () => {
    this.props.setModalVisible(false, {removePhoto: true});
  }

  render() {
    return <View style={{ marginHorizontal: 20, backgroundColor: "white", width: "90%", borderRadius: 6 }}>
        <View style={{ marginLeft: 20 }}>
        <Text style={{ marginVertical: 13, fontSize: 17, fontWeight: '900' }}>
            Set a Profile Photo
          </Text>
          <Hr />
        <Text onPress={this.newPhoto} style={{ marginVertical: 13, fontSize: 17, fontWeight: '300' }}>
            New Profile Photo
          </Text>
        <Text onPress={this.removePhoto} style={{ marginVertical: 13, fontSize: 17, fontWeight: '300' }}>
            Remove Profile Photo
          </Text> 
        </View>
      </View>;
  }
}

export class EulaModalContent extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.setModalVisible(false);
  }
  render() {
    return <View style={{ backgroundColor: "white", width: "100%", height: "100%", borderRadius: 6 }}>
        <View style={{ marginLeft: 20 }}>
        <H1 style={{ alignSelf: "center", marginTop: 10 }}>Privacy Policy</H1><Button light bordered block onPress={() => this.handlePress()}><Text>I Agree</Text></Button>
          <ScrollView>
          <Text style={{ marginVertical: 13, fontSize: 17 }}>
            Leedder Inc built the Leedder app as a Free app. This SERVICE is provided by Leedder Inc at no cost and is intended for use as is. This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service. If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy. The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Leedder unless otherwise defined in this Privacy Policy. Information Collection and Use For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to full name, email, phone, song. The information that we request will be retained by us and used as described in this privacy policy. The app does use third party services that may collect information used to identify you. Link to privacy policy of third party service providers used by the app • Google Play Services Log Data We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics. Cookies Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory. This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service. Service Providers We may employ third-party companies and individuals due to the following reasons: • To facilitate our Service; • To provide the Service on our behalf; • To perform Service-related services; or • To assist us in analyzing how our Service is used. We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose. Security We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security. Links to Other Sites This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. Children’s Privacy These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions. Changes to This Privacy Policy We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page. Contact Us If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us. This privacy policy page was created at privacypolicytemplate.net and modified/generated by App Privacy Policy Generator
          </Text>
        
        </ScrollView>
        </View>
      </View>;
  }
}

const Hr = () => {
  return <View style={{ borderTopWidth: 0.4, width: DEVICE_WIDTH, marginHorizontal: 1 }}>
      <Text />
    </View>;
}