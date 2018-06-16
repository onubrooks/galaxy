import React from "react";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import Feed from "./Feed";
import { Search } from "./Search";
import { Add } from "./Add";
import { Following } from "./Following";
import { Profile } from "./Profile";

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
const MainStackNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedStackNavigator
    },
    Search: {
      screen: Search
    },
    Add: {
      screen: Add
    },
    Following: {
      screen: Following
    },
    Profile: {
      screen: Profile
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
        backgroundColor: "#2e5cb8"
      }
    }
  }
);

export default AppStack = createStackNavigator(
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