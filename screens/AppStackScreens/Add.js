import React, { Component } from "react";
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Item,
  Input,
  Label,
  Text,
  Textarea,
  Thumbnail
} from "native-base";
import styles from "../../components/styles";
const onu = require("../../assets/onu.jpg");
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");


export class Add extends Component {
         saveAndGoBack = () => {
           // dispatch a redux action
           console.log("profile updated...");
           // then go back
           this.props.navigation.goBack();
         };
         render() {
           return <Container style={styles.container}>
               <Header style={[styles.header, { backgroundColor: "white" }]} searchBar rounded>
                 <Left style={{ maxWidth: 50 }}>
                   <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                     <Icon name="md-close" />
                   </TouchableOpacity>
                 </Left>
                 <Body>
                   <Text style={stl.heading}>Upload a Song</Text>
                 </Body>
                 <Right>
                   <Button onPress={this.saveAndGoBack} transparent>
                     <Icon name="md-checkmark" style={{ color: primaryColor }} />
                   </Button>
                 </Right>
               </Header>
               <Content>
                 <View style={stl.grid}>
                   <View style={stl.col1}>
                   <ImageBackground style={{ flex: 1 }} resizeMode="contain" source={require("../../assets/default.jpg")} />
                     
                   </View>
                   <View style={stl.col2}>
                     <Form style={{ alignSelf: "stretch" }}>
                       <Item floatingLabel>
                         <Label>Title</Label>
                         <Input />
                       </Item>
                       <Item floatingLabel last>
                         <Label>Choose Song(.mp3, .wav)</Label>
                         <Input />
                       </Item>
                       <Item floatingLabel last>
                         <Label>Description</Label>
                         <Textarea rowSpan={5} bordered placeholder="About the song" />
                       </Item>
                     </Form>
                   </View>
                 </View>
               </Content>
             </Container>;
         }
       }

export default Add;

const primaryColor = "#006E8C";
const stl = StyleSheet.create({
  grid: {
    backgroundColor: '#fff',
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    // alignItems: 'center',
    marginVertical: 30,
    // height: DEVICE_HEIGHT
  },
  heading: {
    fontWeight: '900',
  },
  col1: {
    width: 150,
    height: 150,
    backgroundColor: 'yellow',
    marginLeft: 10
  },
  col2: {
    //width: 500,
    //alignItems: 'stretch', 
  }
});

