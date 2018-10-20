import { combineReducers } from 'redux';
import {
  GET_FEED,
  GET_FEED_SUCCESS,
  GET_FEED_FAIL,
  GET_COMMENTS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  COMMENT_SONG,
  LIKE_SONG,
  UNLIKE_SONG,
  BOOKMARK_SONG,
  UNBOOKMARK_SONG,
  UPLOAD_SONG,
  UPLOAD_SONG_SUCCESS,
  UPLOAD_SONG_FAIL,
  LOGIN,
  LOGOUT,
  // todo
  GET_USERS,
  DELETE_USER,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_MY_PROFILE,
  GET_MY_PROFILE_SUCCESS,
  GET_MY_PROFILE_FAIL
} from "../actions/actions";
import { initialState } from "./dummyData";

function feed(state = initialState.feed, action) {
  switch (action.type) {
    case GET_FEED:
      return {
        ...state, loading:true, updated: false
      }
    case GET_FEED_SUCCESS:
      return {
        ...state, lastUpdated: Date.now(), loading: false, updated: true, byId: { ...state.byId, ...action.payload.byId}, allIds: state.allIds.concat(action.payload.ids)
      }
    case GET_FEED_FAIL:
      return {
        ...state, loading:false, updated: false
      }
    case LIKE_SONG:
      return {
        ...state, 
        byId: {
          ...state.byId, // all other ids stay the same 
          [action.payload.songId]: {  // edit the song which is being liked
            ...state.byId[action.payload.songId], 
            iHit: true,
            noHits: state.byId[action.payload.songId].noHits + 1
          }
        }
      }
      case UNLIKE_SONG:
        return {
          ...state, 
          byId: {
            ...state.byId, // all other ids stay the same
            [action.payload.songId]: { // edit the post which is being unliked
              ...state.byId[action.payload.songId], 
              iHit: false,
              noHits: state.byId[action.payload.songId].noHits - 1
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
          return { ...state, byId: { ...state.byId, [action.payload.comment]: { // new comment id is the comment for now
                id: action.payload.comment, author: action.payload.user_id, comment: action.payload.comment, post_id: action.payload.post_id } }, allIds: [...state.allIds, action.payload.comment] }; // payload consists of post_id, user_id and comment text
        case GET_COMMENTS:
          return { ...state, currentSong: action.payload.songId, loading: true };
        case GET_COMMENTS_SUCCESS:
          return { ...state, byId: { ...action.payload.byId, ...state.byId }, allIds: state.allIds.concat(action.payload.ids), loading: false, updated: true };
        case GET_COMMENTS_FAIL:
          return { ...state, loading: false, updated: false };
        default:
          return state;
      }
}

// this action uploads a song as logged in user
function upload(state = initialState.uploadingSong, action) {
  switch (action.type) {
    case UPLOAD_SONG:
      return { ...state, song: action.payload.song, loading: true };
    case UPLOAD_SONG_SUCCESS:
      return { ...state, loading: false, uploaded: true, song: null };
    case UPLOAD_SONG_FAIL:
      return { ...state, loading: false, uploaded: false};
    default:
      return state;
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
        case GET_MY_PROFILE:
          return {
            ...state,
            loading: true
          }
        case GET_MY_PROFILE_SUCCESS:
          return {
            ...state,
            loading: false,
            updated: true,
            email: action.payload.data.email,
            username: action.payload.data.username,
            thumbnail: action.payload.data.thumbnail,
            avatar: action.payload.data.avatar
          }
        case GET_MY_PROFILE_FAIL:
          return {
            ...state, loading: false, updated: false
          }
            default:
              return state
      }
}

function getProfile(state = initialState.profile, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
            ...state, 
            userHandle: action.payload.userHandle,
            loading: true
      }
    case GET_PROFILE_SUCCESS:
      return {
        ...state,  
        loading: false,
        updated: true,
        data: action.payload.data
      }
    case GET_PROFILE_FAIL:
      return {
            ...state, loading: false, updated: false
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  feed,
  upload,
  comment,
  user,
  getProfile
});
export default rootReducer;