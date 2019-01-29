
export const loggedInUser = {
      id: null,
      email: null,
      userHandle: null,
      fullname: null,
      gender: null,
      status: null,
      loggedIn: false,
      userAvatar: null,
      noSongs: null,
      noFollowers: null,
      noFollowing: null,
      loading: false,
      updated: false,
      followers: {
        data: null,
        loading: false,
        updated: false
      },
      following: {
        data: null,
        loading: false,
        updated: false
      }
};

const sampleFeed = {
  byId: {
  },
  allIds: [],
  loading: false,
  updated: false,
  lastUpdated: 0 // Date.now()
};

const sampleComments = {
  byId: {
  },
  // allIds: [],
  currentSong: null,
  loading: false,
  updated: true
};
const sampleUsers =  {
        byId : {
              
        },
  allIds: []
};
const sampleBookmarks = [];
const uploadingSong = {
  loading: false,
  uploaded: false,
  song: {
    title: '',
    desc: '',
    audio: null,
    coverArt: null
  }
};
const profile = {
  userId: null,
  prevUserId: null,
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
  updated: false,
  followers: {
    data: null,
    loading: false,
    updated: false
  },
  following: {
    data: null,
    loading: false,
    updated: false
  }
};
const playlist = {
  byId: {},
  // allIds: [],
  loading: false,
  updated: false,
  lastUpdated: 0 // Date.now()
};

export const initialState = {
      feed: sampleFeed,
      comments: sampleComments,
      users: sampleUsers,
      user: loggedInUser,
      bookmarks: sampleBookmarks,
      uploadingSong,
      profile,
      playlist
}