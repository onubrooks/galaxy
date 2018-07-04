import React from "react";
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
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
var Dimensions = require('Dimensions')
var { width, height } = Dimensions.get('window');
import styles from "../../components/styles";
import { ShowTocFooter } from "../../components/ShowTocFooter";

export class SignUpScreen extends React.Component {

  render() {
    return <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: 500, backgroundColor: "#fff" }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: height - 90 }}>
          <View style={{ marginBottom: 20, marginTop: 0 }}>
            <H1>Leedder</H1>
          </View>
          <View>
            <Form>
              <Item style={{ marginVertical: 6, width: 300 }} regular>
                <Input placeholder="Enter your email" />
              </Item>
              <Item style={{ marginVertical: 6, width: 300 }} regular>
                <Input placeholder="Choose a username" />
              </Item>
              <Item style={{ marginVertical: 6, width: 300 }} regular>
                <Input placeholder="Password" secureTextEntry={true} />
              </Item>
              <Item style={{ marginVertical: 6, width: 300 }} regular>
                <Input placeholder="Confirm password" secureTextEntry={true} />
              </Item>
            </Form>
          </View>

          <View style={{ width: 300 }}>
            <Button block onPress={this._signInAsync} style={styles.buttonBlock}>
              <Text style={styles.text}>Sign Up</Text>
            </Button>
          </View>
          <View style={{ width: 250, marginVertical: 6 }}>
            <Text style={{ fontSize: 15, textAlign: "center" }} note>
              Already have an account? <Text style={{ fontWeight: "bold", fontSize: 15 }} onPress={() => this.props.navigation.navigate("Login")}>
                Login.
              </Text>
            </Text>
          </View>
        </View>
        <ShowTocFooter />
      </View>;
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("App");
  };
}
const Hr = () => {
  return <View style={{ borderTopWidth: 0.4, width: (width) / 3, marginVertical: 30, marginHorizontal: 10 }}>
    <Text></Text>
  </View>
}


  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("App");
  };
