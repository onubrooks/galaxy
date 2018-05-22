import {LoginScreen} from "./LoginScreen";
import {LoginAsScreen} from "./LoginAsScreen";
import {SignUpAsScreen} from "./SignUpAsScreen";

import { StackNavigator } from 'react-navigation';

export default AuthStack = StackNavigator(
  { 
        Login: LoginScreen,
        LoginAs: LoginAsScreen,
        //SignUp: SignUpScreen,
        SignUpAs: SignUpAsScreen
 },
  { headerMode: "none"}
);