import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import { Button, H2, H3 } from "native-base";
import * as WebBrowser from 'expo-web-browser';
import AddCommentScreen from "./../screens/AppStackScreens/FeedStack/AddCommentScreen";
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
                  <Text onPress={ () => this.handlePress('unfollow') } style={{marginVertical: 13, fontSize: 17}}>Unfollow</Text>
                  <Text onPress={() => this.handlePress('block')} style={{ marginVertical: 13, fontSize: 17 }}>Block</Text>
                  <Text onPress={() => this.handlePress('report')} style={{ marginVertical: 13, fontSize: 17 }}>Report Abuse</Text>
            </View>
      </View>
  }
}

export class ReportAbuseModalContent extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress(val) {
    this.props.setModalVisible(false, null, val);
  }
  render() {
    return <View style={{ marginHorizontal: 20, backgroundColor: "white", width: "90%", borderRadius: 6 }}>
      <View style={{ marginLeft: 20 }}>
      <Text style={{fontSize: 14, fontWeight:'normal', marginVertical:6}}>Choose a reason for reporting this post</Text>
      <Hr />
        <Text onPress={() => this.handlePress('spam')} style={{ marginVertical: 13, fontSize: 17 }}>It's spam</Text>
        <Text onPress={() => this.handlePress('inappropriate')} style={{ marginVertical: 13, fontSize: 17 }}>It's inappropriate</Text>
      </View>
    </View>
  }
}

export class CommentsModalContent extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress(val) {
    this.props.setModalVisible(false, null, val);
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: "",
          // width: DEVICE_WIDTH,
          height: "110%",
          marginHorizontal: -18,
          borderRadius: 10
        }}
      >
        <AddCommentScreen
          handlePress={this.handlePress}
          song={this.props.song}
        />
      </View>
    );
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
          <H3 style={{ alignSelf: "center", marginTop: 10 }}>
          Leedder End User Licence </H3>
          <H3 style={{ alignSelf: "center" }}>Agreement (EULA)
          </H3>
        <Button light bordered block onPress={() => this.handlePress()}>
          <Text>I Agree</Text>
        </Button>
          <ScrollView>
            <Text>
              Leedder Inc built the Leedder app as a Free app. This SERVICE
              is provided by Leedder Inc at no cost and is intended for use
              as is. This page is used to inform visitors regarding our
              policies with the collection, use, and disclosure of Personal
              Information if anyone decided to use our Service. If you
              choose to use our Service, then you agree to the collection
              and use of information in relation to this policy. The
              Personal Information that we collect is used for providing and
              improving the Service. We will not use or share your
              information with anyone except as described in this Privacy
              Policy. The terms used in this Privacy Policy have the same
              meanings as in our Terms and Conditions, which is accessible
              at Leedder unless otherwise defined in this Privacy Policy.{" "}
            </Text>
            <H3 style={{ marginVertical: 10 }}>Objectionable Content</H3>
            <Text>
              {`Users should not include content that is offensive, insensitive, abusive, upsetting, intended to disgust, or in exceptionally poor taste. Examples of such content include:

1. Defamatory, discriminatory, or mean-spirited content, including references or commentary about religion, race, sexual orientation, gender, national/ethnic origin, or other targeted groups, particularly if the app is likely to humiliate, intimidate, or place a targeted individual or group in harm’s way. Professional political satirists and humorists are generally exempt from this requirement.
2. Realistic portrayals of people or animals being killed, maimed, tortured, or abused, or content that encourages violence. “Enemies” within the context of a game cannot solely target a specific race, culture, real government, corporation, or any other real entity.
3. Depictions that encourage illegal or reckless use of weapons and dangerous objects, or facilitate the purchase of firearms.
4. Overtly sexual or pornographic material, defined by Webster’s Dictionary as "explicit descriptions or displays of sexual organs or activities intended to stimulate erotic rather than aesthetic or emotional feelings."
5. Inflammatory religious commentary or inaccurate or misleading quotations of religious texts.
6. False information and features, including inaccurate device data or trick/joke functionality, such as fake location trackers. Stating that the app is “for entertainment purposes” won’t overcome this guideline. Apps that enable anonymous or prank phone calls or SMS/MMS messaging will be rejected.
7. App Store Reviews: App Store customer reviews can be an integral part of the app experience, so you should treat customers with respect when responding to their comments. Keep your responses targeted to the user’s comments and do not include personal information, spam, or marketing in your response.
Use the provided API to prompt users to review your app; this functionality allows customers to provide an App Store rating and review without the inconvenience of leaving your app, and we will disallow custom review prompts. 
              `}
            </Text>
            <H3 style={{ marginVertical: 10 }}>Information Collection and Use</H3>
            <Text>
              For a better experience, while using our Service, we may
            require you to provide us with certain personally identifiable
            information, including but not limited to full name, email,
            phone, song. The information that we request will be retained
            by us and used as described in this privacy policy. The app
            does use third party services that may collect information
            used to identify you. 
            Link to privacy policy of third party
            service providers used by the app: 
            
              {Platform.OS == 'android' ? <Text onPress={() => WebBrowser.openBrowserAsync('https://www.google.com/policies/privacy/')} style={{ fontWeight: 'bold' }}>
              {`\n• Google Play Services`}</Text> : null}
            {Platform.OS == 'ios' ? <Text onPress={() => WebBrowser.openBrowserAsync('https://www.apple.com/legal/privacy/en-ww/')} style={{ fontWeight: 'bold' }}>
            {`\n• Apple Privacy Policy`}</Text> : null}
               </Text>
               
              <H3 style={{ marginVertical: 10 }}>Log Data</H3> 
              <Text>
              We want to inform you that whenever you use our Service,
              in a case of an error in the app we collect data and
              information (through third party products) on your phone
              called Log Data. This Log Data may include information such as
              your device Internet Protocol (“IP”) address, device name,
              operating system version, the configuration of the app when
              utilizing our Service, the time and date of your use of the
              Service, and other statistics. </Text>
              <H3 style={{ marginVertical: 10 }}>Cookies</H3> 
              <Text>
              Cookies are files with
              a small amount of data that are commonly used as anonymous
              unique identifiers. These are sent to your browser from the
              websites that you visit and are stored on your device's
              internal memory. This Service does not use these “cookies”
              explicitly. However, the app may use third party code and
              libraries that use “cookies” to collect information and
              improve their services. You have the option to either accept
              or refuse these cookies and know when a cookie is being sent
              to your device. If you choose to refuse our cookies, you may
              not be able to use some portions of this Service. 
              </Text>
              <H3 style={{ marginVertical: 10 }}>Service Providers</H3> 
              <Text>
              We may employ third-party companies and individuals
              due to the following reasons: • To facilitate our Service; •
              To provide the Service on our behalf; • To perform
              Service-related services; or • To assist us in analyzing how
              our Service is used. We want to inform users of this Service
              that these third parties have access to your Personal
              Information. The reason is to perform the tasks assigned to
              them on our behalf. However, they are obligated not to
              disclose or use the information for any other purpose.
              </Text>
              <H3 style={{ marginVertical: 10 }}>Security</H3> 
              <Text> 
              We value your trust in providing us your Personal
              Information, thus we are striving to use commercially
              acceptable means of protecting it. But remember that no method
              of transmission over the internet, or method of electronic
              storage is 100% secure and reliable, and we cannot guarantee
              its absolute security. 
              </Text>
              <H3 style={{ marginVertical: 10 }}>Links to Other Sites</H3> 
              <Text> 
              This Service may
              contain links to other sites. If you click on a third-party
              link, you will be directed to that site. Note that these
              external sites are not operated by us. Therefore, we strongly
              advise you to review the Privacy Policy of these websites. We
              have no control over and assume no responsibility for the
              content, privacy policies, or practices of any third-party
              sites or services. 
              </Text>
              <H3 style={{ marginVertical: 10 }}>Children's Privacy</H3> 
              <Text> 
              These Services do not
              address anyone under the age of 13. We do not knowingly
              collect personally identifiable information from children
              under 13. In the case we discover that a child under 13 has
              provided us with personal information, we immediately delete
              this from our servers. If you are a parent or guardian and you
              are aware that your child has provided us with personal
              information, please contact us so that we will be able to do
              necessary actions. 
              </Text>
              <H3 style={{ marginVertical: 10 }}>Changes to This Privacy Policy</H3> 
              <Text> 
              We may
              update our Privacy Policy from time to time. Thus, you are
              advised to review this page periodically for any changes. We
              will notify you of any changes by posting the new Privacy
              Policy on this page. These changes are effective immediately
              after they are posted on this page. 
              </Text>
              <H3 style={{ marginVertical: 10 }}>Contact Us</H3> 
              <Text> 
              If you have any
              questions or suggestions about our EULA, do not
              hesitate to contact us. 
            </Text>
            <Text>Email: <Text style={{ fontWeight: 'bold' }}>leedder@gmail.com</Text></Text>
          <View style={{ height: 100, marginBottom: 60 }}></View>
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