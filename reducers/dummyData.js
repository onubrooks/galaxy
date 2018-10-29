const sly = require("../assets/sly.jpg");
const onu = require("../assets/onu.jpg");
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
      updated: false
};

const sampleFeed = {
  byId: {
  },
  // allIds: [],
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
              "onubrooks": {
                    username: "onubrooks",
                    name: "onubrooks",
                    avatar: onu
              },
            "madrock60" : {
                username : "madrock60",
                name : "User 1",
                avatar: sly
            },
            "28thsly" : {
                username : "28thsly",
                name : "User 2",
                avatar: sly
            },
            "steverog" : {
                username : "steverog",
                name : "User 3",
                avatar: onu
            }
        },
  allIds: ["madrock60", "28thsly", "steverog", "onubrooks"]
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
  loading: false,
  updated: false,
  userHandle: null,
  data: null
};

export const initialState = {
      feed: sampleFeed,
      comments: sampleComments,
      users: sampleUsers,
      user: loggedInUser,
      bookmarks: sampleBookmarks,
      uploadingSong,
      profile,
      playlist: {}
}