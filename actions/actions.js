const onu = require("../assets/onu.jpg");
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
export const LIKE_POST = 'LIKE_POST'
export const UNLIKE_POST = 'UNLIKE_POST'
// user comments on a post
export const COMMENT_POST = 'COMMENT_POST'
// user bookmarks a post
export const BOOKMARK_POST = 'BOOKMARK_POST'
export const UNBOOKMARK_POST = 'UNBOOKMARK_POST'
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
  return {
    type: GET_FEED_SUCCESS,
    payload: {
      id: data.id,
      data: data
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

export function likePost(post_id, user_id) {
  return { 
    type: LIKE_POST, 
    payload: {
      post_id,
      user_id
    }
   }
}

export function unLikePost(post_id, user_id) {
  return { 
    type: UNLIKE_POST, 
    payload: {
      post_id,
      user_id
    }
   }
}

export function commentPost(post_id, comment, user_id) {
  return { 
    type: COMMENT_POST, 
    payload: {
      post_id, 
      comment,
      user_id
    }
  }
}

export function bookmarkPost(post_id) {
  return { 
    type: BOOKMARK_POST, 
    payload: {
      post_id
    }
  }
}

export function unBookmarkPost(post_id) {
  return { 
    type: UNBOOKMARK_POST, 
    payload: {
      post_id
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
export function login(cred) {
  return { 
    type: LOGIN, 
    payload: {
      cred
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

      return new Promise(function(resolve, reject) {
        setTimeout(resolve, 5000, 'foo');
      })
      .then(
        () => { 
                  return {id: "post5",
                  handle: "onubrooks", 
                  artwork: onu, 
                  thumbnail: onu, 
                  // hits: 4, 
                  text: "this is a new post!", 
                  ago: "5min",
                  comments: [],
                  hits: ["onubrooks", "madrock60", "28thsly"]}
},
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => {
          console.log('An error occurred.', error);
          dispatch(getFeedFail(error))
        }
      )
      .then(data =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(getFeedSuccess(data))
      )
  }
}