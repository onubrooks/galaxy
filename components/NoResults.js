import React from "react"
import { Container, Text } from "native-base"

export default NoResults = (props) => {
  let {route} = props
  return (
    <Container
      style={{
        marginTop: 50,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      <Text style={{ fontFamily: "Segoe UI Bold" }}>
        {route == "Profile" || route == "ViewProfile"
          ? "No songs to display"
          : "No Search Results"}{" "}
      </Text>
    </Container>
  );
};