const logo = require("../assets/logo.png");
const cardImage = require("../assets/drawer-cover.png");
const sly = require("../assets/sly.jpg");
const onu = require("../assets/onu.jpg");
const cov1 = require("../assets/album-cover/1.jpg");
const cov2 = require("../assets/album-cover/2.jpg");
const cov3 = require("../assets/album-cover/3.jpg");
const cov4 = require("../assets/album-cover/4.jpg");
const cov5 = require("../assets/album-cover/5.jpg");
const cov6 = require("../assets/album-cover/6.jpg");
const covDef = require("../assets/album-cover/default.jpg");
export const loggedInUser = {
      id: "user0",
      email: 'onu@email.com',
      username: 'onubrooks',
      loggedIn: true,
      thumbnail: onu,
      avatar: onu
};

const sampleFeed = {
  byId: {
    post1: {
      id: "post1",
      handle: "28thsly",
      artwork: cov5,
      thumbnail: sly,
      //hits: 12,
      text: "My jaaaaam!!!!!",
      ago: "5 days ago",
      comments: ["comment1", "comment2"],
      hits: ["user1", "user2", "user3", "user4"]
    },
    post2: {
      id: "post2",
      handle: "onubrooks",
      artwork: cov2,
      thumbnail: onu,
      //hits: 4,
      text: "love this though!",
      ago: "5 days ago",
      comments: ["comment3"],
      hits: ["user1", "user3", "user4"]
    },
    post3: {
      id: "post3",
      handle: "28thsly",
      artwork: cov3,
      thumbnail: cardImage,
      //hits: 1,
      text: "jaming!!!!!",
      ago: "5H",
      comments: ["comment4", "comment5"],
      hits: ["user1", "user0", "user4"]
    },
    post4: {
      id: "post4",
      handle: "28thsly",
      artwork: cov2,
      thumbnail: sly,
      // hits: 12,
      text: "My jaaaaam!!!!!",
      comments: [],
      ago: "5 days ago",
      hits: ["user1", "user0", "user4"]
    },
    post5: {
      id: "post5",
      handle: "28thsly",
      artwork: cov5,
      thumbnail: sly,
      // hits: 12,
      text: "My jaaaaam!!!!!",
      comments: [],
      ago: "5 days ago",
      hits: ["user1", "user3", "user4"]
    }
  },
  allIds: ["post1", "post2", "post3", "post4", "post5"],
  loading: false,
  updated: true,
  lastUpdated: 2 // Date.now()
};

const sampleComments = {
  byId: {
    comment1: {
      id: "comment1",
      author: "user2",
      comment: ".....",
      post_id: "post1"
    },
    comment2: {
      id: "comment2",
      author: "user3",
      comment: ".....",
        post_id: "post2"
    },
    comment3: {
      id: "comment3",
      author: "user3",
      comment: ".....",
      post_id: "post3"
    },
    comment4: {
      id: "comment4",
      author: "user1",
      comment: ".....",
        post_id: "post4"
    },
    comment5: {
      id: "comment5",
      author: "user3",
      comment: ".....",
        post_id: "post1"
    }
  },
  allIds: ["comment1", "comment2", "comment3", "commment4", "comment5"]
};
const sampleUsers =  {
        byId : {
              "user0": {
                    username: "user0",
                    name: "onubrooks",
                    avatar: onu
              },
            "user1" : {
                username : "user1",
                name : "User 1",
                avatar: sly
            },
            "user2" : {
                username : "user2",
                name : "User 2",
                avatar: sly
            },
            "user3" : {
                username : "user3",
                name : "User 3",
                avatar: onu
            }
        },
        allIds : ["user1", "user2", "user3"]
};
const sampleBookmarks = ["post1", "post4"];

export const initialState = {
      feed: sampleFeed,
      comments: sampleComments,
      users: sampleUsers,
      user: loggedInUser,
      bookmarks: sampleBookmarks
}