import { combineReducers } from "redux";
import {
  GET_FEED,
  GET_FEED_SUCCESS,
  GET_FEED_FAIL,
  ADD_COMMENT,
  GET_PLAYLIST,
  GET_PLAYLIST_SUCCESS,
  GET_PLAYLIST_FAIL,
  GET_COMMENTS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  COMMENT_SONG,
  LIKE_SONG,
  UNLIKE_SONG,
  REMOVE_SONG,
  BOOKMARK_SONG,
  UNBOOKMARK_SONG,
  UPLOAD_SONG,
  UPLOAD_SONG_SUCCESS,
  UPLOAD_SONG_FAIL,
  LOGIN,
  LOGOUT,
  DELETE_USER,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_MY_PROFILE,
  GET_MY_PROFILE_SUCCESS,
  GET_MY_PROFILE_FAIL,
  UNFOLLOW,
  GET_FOLLOWERS,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_FAIL,
  GET_FOLLOWING,
  GET_FOLLOWING_SUCCESS,
  GET_FOLLOWING_FAIL,
  GET_MY_FOLLOWERS,
  GET_MY_FOLLOWERS_SUCCESS,
  GET_MY_FOLLOWERS_FAIL,
  GET_MY_FOLLOWING,
  GET_MY_FOLLOWING_SUCCESS,
  GET_MY_FOLLOWING_FAIL,
  REMOVE_MY_PHOTO,
  UPDATE_MY_PHOTO
} from "../actions/actions";
import { initialState } from "./dummyData";

function feed(state = initialState.feed, action) {
  switch (action.type) {
    case GET_FEED:
      return {
        ...state,
        loading: true,
        updated: false
      };
    case GET_FEED_SUCCESS:
      return {
        ...state,
        lastUpdated: Date.now(),
        loading: false,
        updated: true,
        byId: { ...state.byId, ...action.payload.byId },
        allIds: Array.from(new Set(state.allIds.concat(action.payload.ids)))
      };
    case GET_FEED_FAIL:
      return {
        ...state,
        loading: false,
        updated: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.songId]: {
            ...state.byId[action.payload.songId],
            comments: action.payload.comments
          }
        }
      };
    case LIKE_SONG:
      return {
        ...state,
        byId: {
          ...state.byId, // all other ids stay the same
          [action.payload.songId]: {
            // edit the song which is being liked
            ...state.byId[action.payload.songId],
            iHit: true,
            noHits: state.byId[action.payload.songId].noHits + 1
          }
        }
      };
    case UNLIKE_SONG:
      return {
        ...state,
        byId: {
          ...state.byId, // all other ids stay the same
          [action.payload.songId]: {
            // edit the post which is being unliked
            ...state.byId[action.payload.songId],
            iHit: false,
            noHits: state.byId[action.payload.songId].noHits - 1
          }
        }
      };
    case REMOVE_SONG:
      return {
        ...state,
        byId: {
          ...state.byId, // all other ids stay the same
          [action.payload.songId]: null
        }
      };
    case UNFOLLOW:
      // the following line filters the object and excludes the first key
      const filtered = Object.keys(state.byId)
        .filter(key => state.byId[key].userId !== action.payload.song.userId)
        .reduce((obj, key) => {
          obj[key] = state.byId[key];
          return obj;
        }, {});
      return {
        ...state,
        byId: {
          ...filtered
        }
      };
    case BOOKMARK_SONG:
      return {
        ...state,
        byId: {
          ...state.byId, // all other ids stay the same
          [action.payload.songId]: {
            // edit the song which is being liked
            ...state.byId[action.payload.songId],
            iFav: true
          }
        }
      };
    case UNBOOKMARK_SONG:
      return {
        ...state,
        byId: {
          ...state.byId, // all other ids stay the same
          [action.payload.songId]: {
            // edit the post which is being unliked
            ...state.byId[action.payload.songId],
            iFav: false
          }
        }
      };
    case UPLOAD_SONG:
      return {
        ...state,
        uploadingSong: {
          ...state.uploadingSong,
          song: action.payload.song,
          loading: true
        }
      };
    case UPLOAD_SONG_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.song.title]: action.payload.song
        },
        uploadingSong: {
          ...state.uploadingSong,
          song: null,
          uploaded: true,
          loading: false
        }
      };
    case UPLOAD_SONG_FAIL:
      return {
        ...state,
        uploadingSong: {
          ...state.uploadingSong,
          uploaded: false,
          loading: false
        }
      };
    default:
      return state;
  }
}

function playlist(state = initialState.playlist, action) {
  switch (action.type) {
    case GET_PLAYLIST:
      return {
        ...state,
        loading: true,
        updated: false
      };
    case GET_PLAYLIST_SUCCESS:
      return {
        ...state,
        lastUpdated: Date.now(),
        loading: false,
        updated: true,
        byId: { ...action.payload.byId },
        allIds: null
      };
    case GET_PLAYLIST_FAIL:
      return {
        ...state,
        loading: false,
        updated: false
      };
    default:
      return state;
  }
}

function comments(state = initialState.comments, action) {
  switch (action.type) {
    case COMMENT_SONG:
      return {
        ...state,
        byId: { ...state.byId, ...action.payload.comment }
      }; // payload consists of post_id, user_id and comment text

    case GET_COMMENTS:
      return {
        ...state,
        currentSong: action.payload.songId,
        loading: true
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        byId: { ...action.payload.byId },
        loading: false,
        updated: true
      };
    case GET_COMMENTS_FAIL:
      return { ...state, loading: false, updated: false };
    default:
      return state;
  }
}

function user(state = initialState.user, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        id: action.payload.id,
        loggedIn: true
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        id: null,
        email: null,
        userHandle: null,
        fullname: null,
        gender: null,
        status: null,
        userAvatar: null,
        noSongs: null,
        noFollowers: null,
        noFollowing: null,
        loading: false,
        updated: false
      };
    case DELETE_USER:
      return {};
    case GET_MY_PROFILE:
      return {
        ...state,
        loading: true
      };
    case GET_MY_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: true,
        id: action.payload.data.userId,
        email: action.payload.data.email,
        userHandle: action.payload.data.userHandle,
        fullname: action.payload.data.fullname,
        gender: action.payload.data.gender,
        status: action.payload.data.status,
        userAvatar: action.payload.data.userAvatar,
        noSongs: action.payload.data.noSongs,
        noFollowers: action.payload.data.noFollowers,
        noFollowing: action.payload.data.noFollowing
      };
    case GET_MY_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        updated: false
      };
    case GET_MY_FOLLOWING:
      return {
        ...state,
        following: {
          ...state.following,
          loading: true
        }
      };
    case GET_MY_FOLLOWING_SUCCESS:
      return {
        ...state,
        following: {
          ...state.following,
          loading: false,
          updated: true,
          data: action.payload.data
        }
      };
    case GET_MY_FOLLOWING_FAIL:
      return {
        ...state,
        following: {
          ...state.following,
          loading: false,
          updated: false
        }
      };
    case GET_MY_FOLLOWERS:
      return {
        ...state,
        followers: {
          ...state.followers,
          loading: true
        }
      };
    case GET_MY_FOLLOWERS_SUCCESS:
      return {
        ...state,
        followers: {
          ...state.followers,
          loading: false,
          updated: true,
          data: action.payload.data
        }
      };
    case GET_MY_FOLLOWERS_FAIL:
      return {
        ...state,
        followers: {
          ...state.followers,
          loading: false,
          updated: false
        }
      };
    case REMOVE_MY_PHOTO:
      return {
        ...state,
        userAvatar: null
      };
    case UPDATE_MY_PHOTO:
      return {
        ...state,
        userAvatar: action.payload.data
      };
    default:
      return state;
  }
}

function profile(state = initialState.profile, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        userHandle: action.payload.userHandle,
        prevUserId: state.userId,
        userId: action.payload.userId,
        loading: true
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: true,
        email: action.payload.data.email,
        fullname: action.payload.data.fullname,
        gender: action.payload.data.gender,
        status: action.payload.data.status,
        userAvatar: action.payload.data.userAvatar,
        noSongs: action.payload.data.noSongs,
        noFollowers: action.payload.data.noFollowers,
        noFollowing: action.payload.data.noFollowing
      };
    case GET_PROFILE_FAIL:
      let reset = {
        loading: false,
        updated: false
      };
      if (state.userId !== state.prevUserId) {
        reset = {
          ...reset,
          email: null,
          userHandle: null,
          fullname: null,
          gender: null,
          status: null,
          userAvatar: null,
          noSongs: null,
          noFollowers: null,
          noFollowing: null
        };
      }
      return {
        ...state,
        ...reset
      };
    case GET_FOLLOWING:
      return {
        ...state,
        following: {
          ...state.following,
          loading: true
        }
      };
    case GET_FOLLOWING_SUCCESS:
      return {
        ...state,
        following: {
          ...state.following,
          loading: false,
          updated: true,
          data: action.payload.data
        }
      };
    case GET_FOLLOWING_FAIL:
      return {
        ...state,
        following: {
          ...state.following,
          loading: false,
          updated: false
        }
      };
    case GET_FOLLOWERS:
      return {
        ...state,
        followers: {
          ...state.followers,
          loading: true
        }
      };
    case GET_FOLLOWERS_SUCCESS:
      return {
        ...state,
        followers: {
          ...state.followers,
          loading: false,
          updated: true,
          data: action.payload.data
        }
      };
    case GET_FOLLOWERS_FAIL:
      return {
        ...state,
        followers: {
          ...state.followers,
          loading: false,
          updated: false
        }
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  feed,
  playlist,
  comments,
  user,
  profile
});
export default rootReducer;
