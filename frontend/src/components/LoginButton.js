import React from "react";
import { Button } from "react-native";
import styled from "styled-components/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  fagoogle,
} from "@fortawesome/free-solid-svg-icons";

library.add(fab, faCheckSquare, faCoffee);
const ButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #ffffff;
  height: 45px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 250px;
  border-radius: 30px;
  border-width: 1px;
`;

const Title = styled.Text`
  font-size: 15px;
  color: black;
`;

const LoginButton = (props) => {
  return (
    <ButtonContainer>
      <FontAwesomeIcon icon="coffee" margin={20} />
      <Title>Continue with {props.title}</Title>
    </ButtonContainer>
  );
};

export default LoginButton;
