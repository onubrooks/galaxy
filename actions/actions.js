import { AsyncStorage } from 'react-native';
import { Toast } from "native-base";
/*
 * action types
 */
// logged in user creating a post
export const ADD_POST = 'ADD_POST';
// fetch feed async when feed component mounts
export const GET_FEED = 'GET_FEED'
// fetch users
export const GET_USERS = 'GET_USERS'
// successful fetch
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
// failed to get feed for some reason
export const GET_FEED_FAIL = 'GET_FEED_FAIL';
// user likes a post
export const LIKE_SONG = 'LIKE_SONG'
export const UNLIKE_SONG = 'UNLIKE_SONG'
// user comments on a post
export const COMMENT_SONG = 'COMMENT_SONG'
// user bookmarks a post
export const BOOKMARK_SONG = 'BOOKMARK_SONG'
export const UNBOOKMARK_SONG = 'UNBOOKMARK_SONG'
// navigation between tabs triggers this action
export const TOGGLE_TAB = 'TOGGLE_TAB'
// user logs in
export const LOGIN = 'LOGIN'
// user logs out
export const LOGOUT = 'LOGOUT'
// user deletes his account from the app
export const DELETE_USER = 'DELETE_USER'
// view a user profile {id:{id, loading, data}} sets id and loading to true
export const GET_PROFILE = 'GET_PROFILE'
// success action called, sets loading to false and sets data
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'
// error action, sets loading to false and error message
export const GET_PROFILE_fAIL = 'GET_PROFILE_FAIL'


/*
 * action creators
 */
// the following are action creators for the above mentioned actions

export function addPost(post) {
  return { 
    type: ADD_POST, 
    payload: {
      post
    }
  }
}
export function getFeed(user) {
  // return {
  //   type: GET_FEED,
  //   payload: {
  //     request: {
  //       //url: `/users/${user}/repos`
  //       url: `/users/onubrooks/repos`
  //     }
  //   }
  // }
  return {
    type: GET_FEED,
  }
}
export function getUsers() {
  return {
    type: GET_USERS,
  }
}

export function getFeedSuccess(data) {
  let ids = data.map((item) => item.songId);
  let byIds = {};
  for(let item of data) {
    byIds = { [item.songId]: item, ...byIds }
  }
  return {
    type: GET_FEED_SUCCESS,
    payload: {
      ids,
      byIds
    }
  }
}

export function getFeedFail(error) {
  return {
    type: GET_FEED_FAIL,
    payload: {
      error: error
    }
  }
}

export function likeSong(songId) {
  return { 
    type: LIKE_SONG, 
    payload: {
      songId
    }
   }
}

export function unLikeSong(songId) {
  return { 
    type: UNLIKE_SONG, 
    payload: {
      songId
    }
   }
}

export function commentSong(songId, comment, user_id) {
  return { 
    type: COMMENT_SONG, 
    payload: {
      songId, 
      comment,
      user_id
    }
  }
}

export function bookmarkSong(songId) {
  return { 
    type: BOOKMARK_SONG, 
    payload: {
      songId
    }
  }
}

export function unBookmarkSong(songId) {
  return { 
    type: UNBOOKMARK_SONG, 
    payload: {
      songId
    }
  }
}

// navigation
export function toggleTab(tab) {
  return { 
    type: TOOGLE_TAB, 
    payload: {
      tab 
    }
  }
}

// auth: cred is an object with keys username and password
export function login(id) {
  return { 
    type: LOGIN, 
    payload: {
      id
    }
  }
}

export function logout() {
  return { 
    type: LOGOUT
  }
}

export function deleteUser(email) {
  return { 
    type: DELETE_USER, 
    payload: {
      email
    }
  }
}

export function getProfile(id) {
  return { 
    type: GET_PROFILE, 
    payload: {
      id
    }
  }
}

export function getProfileSuccess(id, data) {
  return { 
    type: GET_PROFILE_SUCCESS, 
    payload: {
      id,
      data
    }
  }
}

export function getProfileFail(id, error) {
  return { 
    type: GET_PROFILE_fAIL, 
    payload: {
      id,
      error
    }
  }
}

// thunk action creator, returns a function that dispatches getFeed and then 
// getFeedSuccess or getFeedFail depending on the result of the api call
export function fetchFeed(user) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(getFeed(user))
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    let userId = AsyncStorage.getItem("userToken");
    let limit = 10;
    const PUSH_ENDPOINT = `http://api.leedder.com/api/feeds/${user.id}/${limit}`;
    fetch(PUSH_ENDPOINT, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    }).then((response) => response.json()).then(data => {
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        console.log(data.length, ' items');
        dispatch(getFeedSuccess(data));
    }, 
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => {
          console.log('An error occurred.', error);
          Toast.show({
            text: 'Unable to update feed',
            position: 'bottom',
            type: 'warning',
            duration: 1600
          });
          dispatch(getFeedFail(error))
        }
      )
  }
}
export function hitASong(songId) {
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(likeSong(songId));

    const PUSH_ENDPOINT = `http://api.leedder.com/api/like`;
    fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      }
    }).then((response) => response.json()).then(data => {
      console.log('successfully hit song')
    }, error => {
      console.log(error);
      Toast.show({
        text: 'Network error, please try again...',
        position: 'bottom',
        duration: 1600
      });
      //dispatch(unLikeSong(songId));
      }
    )
  }
}
export function unHitASong(songId) {
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(unLikeSong(songId));

    const PUSH_ENDPOINT = `http://api.leedder.com/api/like`;
    fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      }
    }).then((response) => response.json()).then(data => {
      console.log('successfully unhit song')
    }, error => {
      console.log(error);
      Toast.show({
        text: "Network error, please try again...",
        position: "bottom",
        duration: 1600
      });
      //dispatch(likeSong(songId));
    }
    )
  }
}
export function bookmarkASong(songId) {
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(bookmarkSong(songId));

    const PUSH_ENDPOINT = `http://api.leedder.com/api/favorite`;
    fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      }
    }).then((response) => response.json()).then(data => {
      console.log('successfully hit song')
    }, error => {
      console.log(error);
      Toast.show({
        text: 'Network error, please try again...',
        position: 'top',
        duration: 1600
      });
      //dispatch(unBookmarkSong(songId));
    }
    )
  }
}
export function unBookmarkASong(songId) {
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(unBookmarkSong(songId));

    const PUSH_ENDPOINT = `http://api.leedder.com/api/favorite`;
    fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      }
    }).then((response) => response.json()).then(data => {
      console.log('successfully unhit song')
    }, error => {
      console.log(error);
      Toast.show({
        text: "Network error, please try again...",
        position: "top",
        duration: 1600
      });
      //dispatch(bookmarkSong(songId));
    }
    )
  }
}
export function commentASong(songId, comment, user_id) {
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(commentSong(songId, comment, user_id));

    const PUSH_ENDPOINT = `http://api.leedder.com/api/comment`;
    fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      }
    }).then((response) => response.json()).then(data => {
      console.log('successfully commented on a song')
    }, error => {
      console.log(error);
      Toast.show({
        text: "Network error, please try again...",
        position: "top",
        duration: 1600
      });
      //dispatch(bookmarkSong(songId));
    }
    )
  }
}