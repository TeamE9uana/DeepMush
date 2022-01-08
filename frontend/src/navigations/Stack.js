import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import MapPage from "../screens/MapPage";
import DetailPage from "../screens/DetailPage";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={DetailPage} />
      <Stack.Screen name="Map" component={MapPage} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
