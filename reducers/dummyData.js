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
      id: null,
      email: null,
      username: null,
      loggedIn: false,
      thumbnail: null,
      avatar: null
};

const sampleFeed = {
  byId: {
    // post1: {
    //   id: "post1",
    //   handle: "steverog",
    //   artwork: require("../assets/a.jpg"),
    //   thumbnail: sly,
    //   //hits: 12,
    //   text: "My jaaaaam!!!!!",
    //   ago: "5 days ago",
    //   comments: ["comment1", "comment2"],
    //   hits: ["user1", "user2", "user3", "user4"]
    // },
    // post2: {
    //   id: "post2",
    //   handle: "onubrooks",
    //   artwork: require("../assets/b.jpg"),
    //   thumbnail: onu,
    //   //hits: 4,
    //   text: "love this though!",
    //   ago: "5 days ago",
    //   comments: ["comment3"],
    //   hits: ["user1", "user3", "user4"]
    // },
    // post3: {
    //   id: "post3",
    //   handle: "madrock60",
    //   artwork: require("../assets/f.jpg"),
    //   thumbnail: cardImage,
    //   //hits: 1,
    //   text: "jaming!!!!!",
    //   ago: "5H",
    //   comments: ["comment4", "comment5"],
    //   hits: ["user1", "user0", "user4"]
    // },
    // post4: {
    //   id: "post4",
    //   handle: "steverog",
    //   artwork: require("../assets/d.jpg"),
    //   thumbnail: sly,
    //   // hits: 12,
    //   text: "My jaaaaam!!!!!",
    //   comments: [],
    //   ago: "5 days ago",
    //   hits: ["user1", "user0", "user4"]
    // },
    // post5: {
    //   id: "post5",
    //   handle: "28thsly",
    //   artwork: require("../assets/i.jpg"),
    //   thumbnail: sly,
    //   // hits: 12,
    //   text: "My jaaaaam!!!!!",
    //   comments: [],
    //   ago: "5 days ago",
    //   hits: ["user1", "user3", "user4"]
    // },
    // post6: {
    //   id: "post6",
    //   handle: "28thsly",
    //   artwork: require("../assets/h.jpg"),
    //   thumbnail: sly,
    //   // hits: 12,
    //   text: "My jaaaaam!!!!!",
    //   comments: [],
    //   ago: "5 days ago",
    //   hits: ["user1", "user3", "user4"]
    // }
  },
  allIds: ["post1", "post2", "post3", "post4", "post5"],
  loading: false,
  updated: false,
  lastUpdated: 0 // Date.now()
};

const sampleComments = {
  byId: {
    "comment1": {
      id: "comment1",
      author: "28thsly",
      comment: ".....",
      post_id: "post1"
    },
    "comment2": {
      id: "comment2",
      author: "steverog",
      comment: "Oh boyyyy",
      post_id: "post2"
    },
    "comment3": {
      id: "comment3",
      author: "steverog",
      comment: "hmmmm",
      post_id: "post3"
    },
    "comment4": {
      id: "comment4",
      author: "madrock60",
      comment: "...littttt",
      post_id: "post4"
    },
    "comment5": {
      id: "comment5",
      author: "steverog",
      comment: "I love this...",
      post_id: "post1"
    }
  },
  allIds: ["comment1", "comment2", "comment3", "commment4", "comment5"]
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
const sampleBookmarks = ["post1", "post4"];

export const initialState = {
      feed: sampleFeed,
      comments: sampleComments,
      users: sampleUsers,
      user: loggedInUser,
      bookmarks: sampleBookmarks
}