import { createSelector } from 'reselect'

const getFeed = (state) => state.feed
//const getUser = (state) => state.user

export const getCurrentFeed = createSelector(
  [ getFeed ],
  (feed) => feed
);