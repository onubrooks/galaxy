import React from "react";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import Feed from "./Feed";
import { Search } from "./Search";
import { Add } from "./Add";
import WorkInProgress from "./WorkInProgress";
import { Following } from "./Following";
import Profile from "./Profile";

import {ModalScreen} from "./ModalScreen";
import {AddCommentScreen} from "./AddCommentScreen";

import { Icon } from "native-base";

const FeedStackNavigator = createStackNavigator(
  {
    Feed: {
      screen: Feed
    },
    AddComment: {
      screen: AddCommentScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Feed",
    mode: "modal"
  }
);
// make tab bar hide on the add comment screen
FeedStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return { tabBarVisible };
  // alternative implementation
  // let { routeName } = navigation.state.routes[navigation.state.index];
  // return { tabBarVisible: routeName == "AddComment" ? false : true };
};
const MainStackNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedStackNavigator
    },
    Search: {
      screen: Search
    },
    Add: {
      screen: WorkInProgress
    },
    Following: {
      screen: Following
    },
    Profile: {
      screen: WorkInProgress
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Feed",
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Feed") {
          iconName = "home";
        } else if (routeName === "Search") {
          iconName = "search";
        } else if (routeName === "Add") {
          iconName = "add";
        } else if (routeName === "Profile") {
          iconName = "contact";
        } else if (routeName === "Following") {
          iconName = "heart";
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={15} style={{ color: tintColor }} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "#b3c6ff",
      //activeBackgroundColor: "",
      //inactiveBackgroundColor: "",
      showLabel: false,
      style: {
        backgroundColor: "#006E8C"
      }
    }
  }
);

let AppStack = createStackNavigator(
  {
    Main: {
      screen: MainStackNavigator
    },
    MyModal: {
      screen: ModalScreen
    }
  },
  {
    headerMode: "none",
    mode: "modal"
  }
);

export default AppStack;