import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./navigations/Stack";

const MainPage = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default MainPage;
