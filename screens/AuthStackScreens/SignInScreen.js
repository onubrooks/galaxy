import React from "react";
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import {
  Button,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  Icon,
  H1,
  Separator
} from "native-base";
import styles from "../components/styles";
import { Facebook, Google } from "expo";

export class SignInScreen extends React.Component {

  render() {
    return <Container style={{ margin: "auto" }}>
        <Content>
          <Separator bordered>
            <H1>Leedder</H1>
          </Separator>
          <Form style={{ margin: "auto" }}>
            <Item inlineLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Separator style={{ height: 5 }} />
            <Item inlineLabel>
              <Label>Password</Label>
              <Input />
            </Item>
            <Separator style={{ height: 5 }} />
            <Button info bordered block onPress={this._signInAsync}>
              <Text>Login</Text>
            </Button>
            <Separator style={{ height: 5 }} />
            <Button iconLeft primary block onPress={this._signInFacebookAsync}>
              <Icon name="home" />
              <Text>Login With Facebook</Text>
            </Button>
            <Separator style={{ height: 5 }} />
            <Button iconLeft warning block onPress={this._signInGoogleAsync}>
              <Icon name="home" />
              <Text>Login With Google</Text>
            </Button>
          </Form>
        </Content>
      </Container>;
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("App");
  };

  _signInFacebookAsync = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('<APP_ID>', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }

  _signInGoogleAsync = async () => {
      try {
        const result = await Google.logInAsync({
          androidClientId: YOUR_CLIENT_ID_HERE,
          iosClientId: YOUR_CLIENT_ID_HERE,
          scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
          return result.accessToken;
        } else {
          return {cancelled: true};
        }
      } catch(e) {
        return {error: true};
      }
    }
}
