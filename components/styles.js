const React = require("react-native");
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const primaryColor = "#006E8C";

const { StyleSheet } = React;

export default {
  container: {
    backgroundColor: "#FFFFFF"
  },
  header: {
    //marginTop: 24,
    backgroundColor: primaryColor
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontStyle: "italic",
    fontFamily: "space-mono"
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  primaryText: {
    color: primaryColor
  },
  buttonBordered: {
    borderColor: primaryColor
  },
  buttonBlock: {
    backgroundColor: primaryColor
  },
  noBorder: {
    borderColor: "white"
  },
  mb: {
    marginBottom: 15
  },
  // ig handle text style
  handle: {
    fontWeight: "bold"
  },
  comment_handle: {
    fontSize: 14
  },
  // note text, eg 5 days ago
  note: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 3
  },
  // hits
  hits: {
    fontSize: 12
  },
  pc: {
    // profile container
    maxHeight: 100,
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: "white"
  },
  pc_col1: {
    // profile container column 1
    width: 130,
    height: 150
  },
  pc_col2: {
    // profile container column 1
    height: 100,
    marginLeft: 20
  },
  pff_num: {
    // posts, followers, following section number above
    marginHorizontal: 18
  },
  pff_text: {
    // posts, followers, following section text below
  },
  // image gallery styles
  gal_container: {
    flex: 1,
    flexDirection: "row"
  },
  gallery: {
    flexDirection: "row"
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#333",
    padding: 20
  },
  tab: {
    flex: 1
  },
  icon: {
    textAlign: "center"
  },
  item: {
    //flex: 1,
    flexDirection: "row"
  },
  photo: {
    //flex: 1
  }
};
