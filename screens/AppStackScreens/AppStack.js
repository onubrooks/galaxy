import React from "react";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import FeedScreen from "./FeedStack/FeedScreen";
import { SearchScreen } from "./SearchStack/SearchScreen";
import ExploreScreen from "./SearchStack/ExploreScreen";
import { Add } from "./Add";
import WorkInProgress from "./WorkInProgress";
import { NotificationsScreen } from "./NotificationsStack/NotificationsScreen";
import ProfileScreen from "./ProfileStack/ProfileScreen";
import EditProfileScreen from "./ProfileStack/EditProfileScreen";

import {ModalScreen} from "./Modals/ModalScreen";
import AddCommentScreen from "./FeedStack/AddCommentScreen";

import { Icon } from "native-base";

const FeedStackNavigator = createStackNavigator(
  {
    Feed: {
      screen: FeedScreen
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
const SearchStackNavigator = createStackNavigator(
  {
    Search: {
      screen: SearchScreen
    },
    Explore: {
      screen: ExploreScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Search",
    mode: "modal"
  }
);

const ProfileStackNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen
    },
    EditProfile: {
      screen: EditProfileScreen
    },
    Settings: {
      screen: WorkInProgress// SettingsScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Profile",
    mode: "modal"
  }
);
const MainStackNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedStackNavigator
    },
    Search: {
      screen: SearchStackNavigator
    },
    Add: {
      screen: WorkInProgress
    },
    Notifications: {
      screen: NotificationsScreen
    },
    Profile: {
      screen: ProfileStackNavigator
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Profile",
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
        } else if (routeName === "Notifications") {
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