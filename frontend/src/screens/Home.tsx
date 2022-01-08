import React from "react";
import { Button } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  align-items: center;
`;
const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Home = ({ navigation }: any) => {
  return (
    <Container>
      <StyledText>Home</StyledText>
      <Button
        title="go to the Detail screen"
        onPress={() => navigation.navigate("Detail")}
      />
    </Container>
  );
};

export default Home;
