import {LoginScreen} from "./LoginScreen";
import { SignUpScreen } from "./SignUpScreen";
import {LoginAsScreen} from "./LoginAsScreen";
import {SignUpAsScreen} from "./SignUpAsScreen";

import { createStackNavigator } from 'react-navigation';

export default (AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    LoginAs: LoginAsScreen,
    SignUpAs: SignUpAsScreen
  },
  { headerMode: "none" }
));