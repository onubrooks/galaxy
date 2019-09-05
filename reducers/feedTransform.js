import { createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    let newInbound;
    if (inboundState.byId) {
      newInbound = {
        ...inboundState,
        byId: [...Object.keys(inboundState.byId).map(k => inboundState.byId[k])]
      };
    }

    return newInbound;
  },
  // transform state being rehydrated
  (outboundState, key) => {
    let newOutbound;
    if (outboundState.byId) {
      let data = outboundState.byId.slice(0, 10);
      let byId = {};
      for (let item of data) {
        byId = { [item.songId]: item, ...byId };
      }
      newOutbound = {
        ...outboundState,
        byId
      };
    }
    return newOutbound;
  }
  // define which reducers this transform gets called for.
  //{ whitelist: ["someReducer"] }
);

const persistConfig = {
  key: "root",
  storage,
  transforms: [SetTransform]
  //whitelist: ["feed", "user", "playlist"],
};

export default persistConfig;
