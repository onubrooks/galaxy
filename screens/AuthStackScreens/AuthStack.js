import {LoginScreen} from "./LoginScreen";
import {LoginAsScreen} from "./LoginAsScreen";
import {SignUpAsScreen} from "./SignUpAsScreen";

import { createStackNavigator } from 'react-navigation';

export default AuthStack = createStackNavigator(
  { 
        Login: LoginScreen,
        LoginAs: LoginAsScreen,
        //SignUp: SignUpScreen,
        SignUpAs: SignUpAsScreen
 },
  { headerMode: "none"}
);