const logo = require("../assets/logo.png");
const cardImage = require("../assets/drawer-cover.png");
const sly = require("../assets/sly.jpg");
const onu = require("../assets/onu.jpg");
export const initialFeed = [{ handle: "28thsly", artwork: cardImage, thumbnail: sly, liked: true, bookmarked: true, hits: 12, text: "My jaaaaam!!!!!", ago: "5 days ago" }, { handle: "onubrooks", artwork: onu, thumbnail: onu, liked: false, bookmarked: false, hits: 4, text: "love this though!", ago: "5 days ago" }, { handle: "28thsly", artwork: sly, thumbnail: cardImage, liked: false, bookmarked: true, hits: 1, text: "jaming!!!!!", ago: "5H" }, { handle: "28thsly", artwork: cardImage, thumbnail: sly, liked: true, bookmarked: true, hits: 12, text: "My jaaaaam!!!!!", ago: "5 days ago" }];
export const loggedInUser = {
      id: "user0",
      email: 'onu@email.com',
      username: 'onubrooks',
      loggedIn: true,
      thumbnail: onu,
      avatar: "../assets/onu.jpg"
};

const sampleFeed =  {
      byId: {
            "post1": {
                  id: "post1", 
                  handle: "28thsly", 
                  artwork: cardImage, 
                  thumbnail: sly,  
                  //hits: 12, 
                  text: "My jaaaaam!!!!!", 
                  ago: "5 days ago" ,
                  comments: ["comment1","comment2"],
                  hits: ["user1", "user2", "user3", "user4"]
            },
            "post2": { 
                  id: "post2",
                  handle: "onubrooks", 
                  artwork: onu, 
                  thumbnail: onu, 
                  //hits: 4, 
                  text: "love this though!", 
                  ago: "5 days ago",
                  comments: ["comment3"],
                  hits: ["user1", "user3", "user4"]
            },
            "post3": { 
                  id: "post3",
                  handle: "28thsly", 
                  artwork: sly, 
                  thumbnail: cardImage,
                  //hits: 1, 
                  text: "jaming!!!!!", 
                  ago: "5H" ,
                  comments: ["comment4", "comment5"],
                  hits: ["user1", "user0", "user4"]
            },
            "post4": { 
                  id: "post4",
                  handle: "28thsly", 
                  artwork: cardImage, 
                  thumbnail: sly, 
                  // hits: 12, 
                  text: "My jaaaaam!!!!!", 
                  comments: [],
                  ago: "5 days ago",
                  hits: ["user1", "user0", "user4"]
            }
      },
      allIds: ["post1", "post2", "post3", "post4"],
      loading: false,
      updated: true,
      lastUpdated: 2 // Date.now()
};

const sampleComments = {
        byId : {
            "comment1" : {
                id : "comment1",
                author : "user2",
                comment : ".....",
            },
            "comment2" : {
                id : "comment2",
                author : "user3",
                comment : ".....",
            },
            "comment3" : {
                id : "comment3",
                author : "user3",
                comment : ".....",
            },
            "comment4" : {
                id : "comment4",
                author : "user1",
                comment : ".....",
            },
            "comment5" : {
                id : "comment5",
                author : "user3",
                comment : ".....",
            },
        },
        allIds : ["comment1", "comment2", "comment3", "commment4", "comment5"]
};
const sampleUsers =  {
        byId : {
            "user1" : {
                username : "user1",
                name : "User 1",
            },
            "user2" : {
                username : "user2",
                name : "User 2",
            },
            "user3" : {
                username : "user3",
                name : "User 3",
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