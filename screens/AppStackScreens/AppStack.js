import React from "react";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import { TabBarComponent } from "./TabBarComponent";
// Feed Stack
import FeedScreen from "./FeedStack/FeedScreen";
import AddCommentScreen from "./FeedStack/AddCommentScreen";
import DMListScreen from "./FeedStack/DMListScreen";
import DMChatScreen from "./FeedStack/DMChatScreen";
import ViewProfileScreen from "./FeedStack/ViewProfileScreen";
import ViewFollowsScreen from "./FeedStack/ViewFollowsScreen";

// Search Stack
import { SearchScreen } from "./SearchStack/SearchScreen";
import ExploreScreen from "./SearchStack/ExploreScreen";
import Add from "./Add";
import PlaylistScreen from "./PlaylistScreen";
import WorkInProgress from "./WorkInProgress";

// Notification Stack
import { NotificationsScreen } from "./NotificationsStack/NotificationsScreen";

// Profile Stack
import ProfileScreen from "./ProfileStack/ProfileScreen";
import EditProfileScreen from "./ProfileStack/EditProfileScreen";
import SettingsScreen from "./ProfileStack/SettingsScreen";
import PasswordScreen from "./ProfileStack/PasswordScreen";
import LikesScreen from "./ProfileStack/LikesScreen";
import SongScreen from "./ProfileStack/SongScreen";
import SavedGridScreen from "./ProfileStack/SavedGridScreen";
import SavedListScreen from "./ProfileStack/SavedListScreen";
import PostScreen from "./ProfileStack/PostScreen";

import {ModalScreen} from "./Modals/ModalScreen";

import { Icon } from "native-base";

const FeedStackNavigator = createStackNavigator(
  {
    Feed: {
      screen: FeedScreen
    },
    AddComment: {
      screen: AddCommentScreen
    },
    DMList: {
      screen: DMListScreen
    },
    DMChat: {
      screen: DMChatScreen
    },
    Playlist: {
      screen: PlaylistScreen
    },
    ViewProfile: {
      screen: ViewProfileScreen
    },
    ViewFollows: {
      screen: ViewFollowsScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Feed",
    mode: "modal",
    // make tab bar hide on the add comment screen
    navigationOptions: ({ navigation }) => {
      let tabBarVisible = true;
      if (navigation.state.index > 0) {
        tabBarVisible = false;
      }

      return { tabBarVisible };
      // alternative implementation
      // let { routeName } = navigation.state.routes[navigation.state.index];
      // return { tabBarVisible: routeName == "AddComment" ? false : true };
    }
  }
);

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
      screen: SettingsScreen
    },
    Password: {
      screen: PasswordScreen
    },
    Likes: {
      screen: LikesScreen
    },
    Song: {
      screen: SongScreen
    },
    SavedGrid: {
      screen: SavedGridScreen
    },
    SavedList: {
      screen: SavedListScreen
    },
    Post: {
      screen: PostScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Profile",
    mode: "modal",
    navigationOptions: ({ navigation }) => {
      let { routeName } = navigation.state.routes[navigation.state.index];
      return { tabBarVisible: routeName == "EditProfile" || routeName =="Password" ? false : true };
    }
  }
);

const MainStackNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedStackNavigator
    },
    // Search: {
    //   screen: SearchStackNavigator
    // },
    Add: {
      screen: Add
    },
    // Notifications: {
    //   screen: NotificationsScreen
    // },
    Profile: {
      screen: ProfileStackNavigator
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Feed",
    defaultNavigationOptions: ({ navigation }) => ({
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
        backgroundColor: "#764BA2"
      }
    },
    tabBarComponent: props => <TabBarComponent {...props} />,
    tabBarPosition: "bottom"
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