import genericAsyncActionDispatcher from "./actionhelpers";
/*
 * action types
 */
// logged in user uploading a song
export const UPLOAD_SONG = 'UPLOAD_SONG';
export const UPLOAD_SONG_SUCCESS = 'UPLOAD_SONG_FAIL';
export const UPLOAD_SONG_FAIL = 'UPLOAD_SONG_FAIL';
// fetch feed async when feed component mounts
export const GET_FEED = 'GET_FEED'
// successful fetch
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
// failed to get feed for some reason
export const GET_FEED_FAIL = 'GET_FEED_FAIL';
// user likes a post
export const LIKE_SONG = 'LIKE_SONG'
export const UNLIKE_SONG = 'UNLIKE_SONG'
export const REMOVE_SONG = 'REMOVE_SONG'
// user comments on a post
export const COMMENT_SONG = 'COMMENT_SONG'
export const GET_COMMENTS = "GET_COMMENTS";
export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
export const GET_COMMENTS_FAIL = "GET_COMMENTS_FAIL";
// user bookmarks a post
export const BOOKMARK_SONG = 'BOOKMARK_SONG'
export const UNBOOKMARK_SONG = 'UNBOOKMARK_SONG'
// user logs in
export const LOGIN = 'LOGIN'
// user logs out
export const LOGOUT = 'LOGOUT'
// user deletes his account from the app
export const DELETE_USER = 'DELETE_USER'
// logged in user profile
export const GET_MY_PROFILE = 'GET_PROFILE'
// success action called, sets loading to false and sets data
export const GET_MY_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'
// error action, sets loading to false and error message
export const GET_MY_PROFILE_fAIL = 'GET_PROFILE_FAIL'
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
export function getFeed(user) {
  return {
    type: GET_FEED,
  }
}

export function getFeedSuccess(data) {
  let ids = data.map((item) => item.songId);
  let byId = {};
  for(let item of data) {
    byId = { [item.songId]: item, ...byId }
  }
  return {
    type: GET_FEED_SUCCESS,
    payload: {
      ids,
      byId
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

export function removeSong(songId) {
  return {
    type: REMOVE_SONG,
    payload: {
      songId
    }
  }
}

export function commentSong(data) {
  return { 
    type: COMMENT_SONG, 
    payload: {
      songId: data.songId, 
      comment: data.comment,
      user_id: data.user_id
    }
  }
}
export function getComments(songId) {
  return {
    type: GET_COMMENTS,
    payload: {
      songId
    }
  }
}
export function getCommentsSuccess(data) {
  let ids = data.map((item) => item.id);
  let byId = {};
  for (let item of data) {
    byId = { [item.id]: item, ...byId }
  }
  return {
    type: GET_COMMENTS_SUCCESS,
    payload: {
      ids,
      byId
    }
  }
}
export function getCommentsFail(songId) {
  return {
    type: GET_COMMENTS_FAIL,
    payload: {
      songId
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

export function uploadSong(song) {
  return {
    type: UPLOAD_SONG,
    payload: {
      song
    }
  }
}

export function uploadSongSuccess(song) {
  return {
    type: UPLOAD_SONG_SUCCESS,
    payload: {
      song
    }
  }
}

export function uploadSongFail(song) {
  return {
    type: UPLOAD_SONG_FAIL,
    payload: {
      song
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
export function getMyProfile(id) {
  return {
    type: GET_MY_PROFILE,
    payload: {
      id
    }
  }
}

export function getMyProfileSuccess(data) {
  return {
    type: GET_MY_PROFILE_SUCCESS,
    payload: {
      data
    }
  }
}

export function getMyProfileFail() {
  return {
    type: GET_MY_PROFILE_fAIL,
    payload: {
    }
  }
}

export function getProfile(userHandle) {
  return { 
    type: GET_PROFILE, 
    payload: {
      userHandle
    }
  }
}

export function getProfileSuccess(data) {
  return { 
    type: GET_PROFILE_SUCCESS, 
    payload: {
      data
    }
  }
}

export function getProfileFail() {
  return { 
    type: GET_PROFILE_fAIL, 
    payload: {
    }
  }
}

export function fetchFeed(user) {
  let req = {
    method: 'GET',
    url: `feeds/${user.id}/10`,
    data: null
  };
  let cb = {
    initial: getFeed,
    success: getFeedSuccess,
    fail: getFeedFail,
    successMsg: 'fetch feed successful...',
    errorMsg: 'Unable to update feed...'
  };
  return genericAsyncActionDispatcher(user, req, cb);
}
export function hitASong(songId) {
  let req = {
    method: 'POST',
    url: `like`,
    data: { songId }
  };
  let cb = {
    initial: likeSong,
    success: null,
    fail: unLikeSong,
    successMsg: 'hit successful...',
    errorMsg: 'Network error, please try again...'
  };
  return genericAsyncActionDispatcher(songId, req, cb);
}
export function unHitASong(songId) {
  let req = {
    method: 'POST',
    url: `like`,
    data: { songId }
  };
  let cb = {
    initial: unLikeSong,
    success: null,
    fail: likeSong,
    successMsg: 'unhit successful...',
    errorMsg: 'Network error, please try again...'
  };
  return genericAsyncActionDispatcher(songId, req, cb);
}
export function bookmarkASong(songId) {
  let req = {
    method: 'POST',
    url: `favorite`,
    data: { songId }
  };
  let cb = {
    initial: bookmarkSong,
    success: null,
    fail: unBookmarkSong,
    successMsg: 'bookmark successful...',
    errorMsg: 'Network error, please try again...'
  };
  return genericAsyncActionDispatcher(songId, req, cb);
}
export function unBookmarkASong(songId) {
  let req = {
    method: 'POST',
    url: `favorite`,
    data: { songId }
  };
  let cb = {
    initial: unBookmarkSong,
    success: null,
    fail: bookmarkSong,
    successMsg: 'unbookmark successful...',
    errorMsg: 'Network error, please try again...'
  };
  return genericAsyncActionDispatcher(songId, req, cb);
}
export function fetchComments(songId) {
  let req = {
    method: 'POST',
    url: `comments/${songId}`,
    data: { songId }
  };
  let cb = {
    initial: getComments,
    success: getCommentsSuccess,
    fail: getCommentsFail,
    successMsg: 'get comments successful...',
    errorMsg: 'Network error, please try again...'
  };
  return genericAsyncActionDispatcher(songId, req, cb);
}
export function commentASong(songId, comment, user_id) {
  let data ={ songId, comment, user_id };
  let req = {
    method: 'POST',
    url: `comment/${songId}`,
    data
  };
  let cb = {
    initial: commentSong,
    success: null,
    fail: null,
    successMsg: 'add comment successful...',
    errorMsg: 'Network error, please try again...'
  };
  return genericAsyncActionDispatcher(data, req, cb);
}
export function uploadSongAsync(song, user_id) {
  let data = {
    title: song.title,
    desc: song.desc,
    audio: song.audio,
    coverArt: song.coverArt,
    user: user_id
  };
  let req = {
    method: 'POST',
    url: `upload`,
    data
  };
  let cb = {
    initial: uploadSong,
    success: null,
    fail: null,
    successMsg: 'song upload successful...',
    errorMsg: 'Network error, please try again...'
  };
  return genericAsyncActionDispatcher(data, req, cb);
}
export function fetchMyProfile(user_id) {
  let data = {
    user: user_id
  };
  let req = {
    method: 'POST',
    url: `user`,
    data
  };
  let cb = {
    initial: getMyProfile,
    success: getMyProfileSuccess,
    fail: getMyProfileFail,
    successMsg: 'unable to fetch my profile',
    errorMsg: 'Network error, please try again...'
  };
  return genericAsyncActionDispatcher(user_id, req, cb);
}
export function fetchProfile(userHandle) {
  let data = {
    userHandle
  };
  let req = {
    method: 'POST',
    url: `get-profile`,
    data
  };
  let cb = {
    initial: getProfile,
    success: getProfileSuccess,
    fail: getProfileFail,
    successMsg: 'unable to fetch profile',
    errorMsg: 'Network error, please try again...'
  };
  return genericAsyncActionDispatcher(userHandle, req, cb);
}