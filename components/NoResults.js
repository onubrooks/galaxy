import React from "react"
import { Container, Text } from "native-base"

export default NoResults = () => {
  return (
    <Container
      style={{
        marginTop: 50,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      <Text style={{ fontFamily: "Segoe UI Bold" }}>No Search Results </Text>
    </Container>
  );
};