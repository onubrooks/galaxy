const React = require("react-native");
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const primaryColor = "#764BA2";// 'linear-gradient(178.78deg, #764BA2 0.59%, #6879E3 82.8%)' 
const secondaryColor = '#006E8C' 

export default {
  primaryColor,
  secondaryColor,
  container: {
    backgroundColor: "#FFFFFF"
  },
  whiteColor: {
    color: "#FFFFFF"
  },
  header: {
    // marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "grey"
  },
  header2: {
    // marginTop: 30
  },
  title: {
    color: "#555555",
    fontFamily: "segoeprb",
    fontSize: 30,
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
  },
  loadingIndicator: {
    justifyContent: "center",
    alignItems: "center"
  },
  // login screen styles
  pageContainer: {
    flex: 1,
    marginTop: 120,
    alignItems: "center",
    height: height
  },
  pageContainerSignup: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    height: height
  },
  leedder: {
    fontFamily: "segoeprb",
    fontSize: 30,
    lineHeight: 60,
    color: "#FAFAFA"
  },
  segoeprint: {
    fontFamily: "segoeprb"
  },
  item: {
    backgroundColor: "#B1BAF8",
    color: "white",
    borderRadius: 4,
    height: 40,
    width: 300,
    marginVertical: 6,
    marginLeft: 5
  },
  input: {
    color: "white"
  },
  submit: {
    backgroundColor: "#1CD9AD",
    borderRadius: 20,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  forgot: {
    fontSize: 12,
    textAlign: "center",
    color: "white"
  },
  forgotLink: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white"
  },
  // search screen styles
  segmentView: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  segmentButton: {
    borderColor: "#555555",
    borderRadius: 5,
  },
  segmentButtonText: {
    color: "#555555",
    fontFamily: "Segoe UI"
  }
};
