import { StackNavigator } from 'react-navigation';
import Feed from "./Feed";
import { Search } from "./Search";
import { Following } from "./Following";
import { Profile } from "./Profile";

import {ModalScreen} from "./ModalScreen";
import {AddCommentScreen} from "./AddCommentScreen";

const FeedStackNavigator = StackNavigator(
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
const MainStackNavigator = StackNavigator(
  {
    Feed: {
      screen: FeedStackNavigator
    },
    Search: {
      screen: Search
    },
    Profile: {
      screen: Profile
    },
    Following: {
      screen: Following
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Feed"
  }
);

export default AppStack = StackNavigator(
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