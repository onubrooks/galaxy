import { combineReducers } from 'redux';
import {
  GET_FEED,
  GET_FEED_SUCCESS,
  GET_FEED_FAIL,
  GET_USERS,
  ADD_POST,
  LIKE_SONG,
  UNLIKE_SONG,
  COMMENT_SONG,
  BOOKMARK_SONG,
  UNBOOKMARK_SONG,
  TOGGLE_TAB,
  LOGIN,
  LOGOUT,
  DELETE_USER,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_fAIL
} from "../actions/actions";
import { initialState } from "./dummyData";

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
function users(state = initialState.users, action) {
  switch(action.type) {
    case GET_USERS:
      return {...state}
    default:
      return { ...state }
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
        ...state, lastUpdated: Date.now(), loading: false, updated: true, byId: {...action.payload.byIds, ...state.byId}, allIds: state.allIds.concat(action.payload.ids)
      }
    case GET_FEED_FAIL:
      return {
        ...state, loading:false, updated: false
      }
    case LIKE_SONG:
    console.log("l1ke song");
      return {
        ...state, 
        byId: {
          ...state.byId, // all other ids stay the same 
          [action.payload.songId]: {  // edit the song which is being liked
            ...state.byId[action.payload.songId], 
            iHit: true
          }
        }
      }
      case UNLIKE_SONG:
        console.log("unlike song");
        return {
          ...state, 
          byId: {
            ...state.byId, // all other ids stay the same
            [action.payload.songId]: { // edit the post which is being unliked
              ...state.byId[action.payload.songId], 
              iHit: false
            }
          }
        }
      case BOOKMARK_SONG:
          return {
            ...state,
            byId: {
              ...state.byId, // all other ids stay the same 
              [action.payload.songId]: {  // edit the song which is being liked
                ...state.byId[action.payload.songId],
                iFav: true
              }
            }
          }
      case UNBOOKMARK_SONG:
          return {
            ...state,
            byId: {
              ...state.byId, // all other ids stay the same
              [action.payload.songId]: { // edit the post which is being unliked
                ...state.byId[action.payload.songId],
                iFav: false
              }
            }
          } 
      default:
        return state;
    }
}

function comment(state = initialState.comments, action) {
      switch (action.type) {
        case COMMENT_SONG:
          return { 
            ...state, 
            byId: { 
              ...state.byId, 
              [action.payload.comment]: { // new comment id is the comment for now
                id: action.payload.comment, author: action.payload.user_id, comment: action.payload.comment, post_id: action.payload.post_id 
              }
            }, 
            allIds: [...state.allIds, action.payload.comment] };// payload consists of post_id, user_id and comment text
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
                    ...state, id:action.payload.id, loggedIn: true
                    // ...state, email:action.payload.email,username: action.payload.username, loggedIn: true
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
    case GET_PROFILE_SUCCESS:
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
  users,
  posts: posts,
  comments: comment,
  tab: tab,
  user: user,
  getProfile: getProfile
});
export default rootReducer;