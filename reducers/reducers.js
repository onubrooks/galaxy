import { combineReducers } from 'redux';
import {
  GET_FEED,
  GET_FEED_SUCCESS,
  GET_FEED_FAIL,
  ADD_POST,
  LIKE_POST,
  UNLIKE_POST,
  COMMENT_POST,
  BOOKMARK_POST,
  UNBOOKMARK_POST,
  TOGGLE_TAB,
  LOGIN,
  LOGOUT,
  DELETE_USER,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_fAIL
} from "../actions/actions";
import { initialState } from "./dummyData";
import { initialUser } from "./dummyData";
const onu = require("../assets/onu.jpg");

// const initialState = {
//       posts: [], // posts by the logged in user
//       feed: initialFeed, // initial feed for the main page
//       comments: [], // 
//       bookmarks: [], // ids of posts that logged in user has bookmarked
//       selected_tab: {
//             tab: 1,// tab 1 is the default navigation
//             modal:false
//       },
//       user: null, // logged in user data
//       getProfile: null // id of a user profile to be fetched and displayed on profile view
// }

// this action adds a post to my(logged in user) posts
function posts(state = [], action) {
  switch (action.type) {
    case ADD_POST:
      return [
        ...state, action.post   
      ]
    default:
      return state
  }
}

function feed(state = initialState.feed, action) {
  switch (action.type) {
    case GET_FEED:
      return {
        ...state, loading:true, updated: false
      }
    case GET_FEED_SUCCESS:
      return {
        ...state, lastUpdated: 0, loading:false, byId: {[action.payload.id]: action.payload.data, ...state.byId}, allIds: state.allIds.concat(action.id)
      }
    case GET_FEED_FAIL:
      return {
        ...state, loading:false
      }
    case LIKE_POST:
    console.log("loke post");
      return {
        ...state, 
        byId: {
          ...state.byId, 
          [action.payload.post_id]: {
            ...state.byId[action.payload.post_id], 
            hits: state.byId[action.payload.post_id].hits.concat(action.payload.user_id)
          }
        }
      }
      case UNLIKE_POST:
        console.log("unlike");
        return {
          ...state, 
          byId: {
            ...state.byId, 
            [action.payload.post_id]: {
              ...state.byId[action.payload.post_id], 
              hits: state.byId[action.payload.post_id].hits.filter(item => item !== action.payload.user_id)
            }
          }
        }
      default:
        return state;
    }
}

function comment(state = initialState.comments, action) {
      switch (action.type) {
        case COMMENT_POST:
          return [...state, action.payload]; // payload consists of post_id and text
        default:
          return state
      }
}

function like(state = [], action) {
      switch (action.type) {
        case LIKE_POST:
          return [...state, action.post_id];
        default:
          return state
      }
}

function bookmark(state = initialState.bookmarks, action) {
      switch (action.type) {
        case BOOKMARK_POST:
          return [...state, action.payload.post_id];
        case UNBOOKMARK_POST:
          return state.filter(item => item !== action.payload.post_id);
        default:
          return state
      }
}

function tab(state = {tab: 1, modal: false}, action) {
     switch (action.type) {
      case TOGGLE_TAB:
            return {
                  ...state, tab: action.tab, modal: false
            }
      default: 
          return state
     }
}

function user(state = initialState.user, action) {
      switch (action.type) {
            case LOGIN:
              return {
                    ...state, email:action.payload.email,username: action.payload.username, loggedIn: true
              }
            case LOGOUT: 
              return {
                    ...state,  loggedIn: false 
              }
            case DELETE_USER:
              return {}
            default:
              return state
      }
}

function getProfile(state = {}, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
            ...state, 
            id: action.payload.id, 
            loading: true
      }
    case GET_FEED_SUCCESS:
      return {
        ...state,  
        loading: false, 
        data: action.payload.data
      }
    case GET_PROFILE_fAIL:
      return {
            ...state, loading: false, error: 'Error getting user info'
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  feed,
  posts: posts,
  comments: comment,
  //likes: like,
  bookmarks: bookmark,
  tab: tab,
  user: user,
  getProfile: getProfile
});
export default rootReducer;