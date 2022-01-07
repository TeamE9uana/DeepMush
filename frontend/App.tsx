import React from "react";

import { LoginPage } from "./src/component/LoginPage";
import { ExpoCameraPage } from "./src/component/ExpoCameraPage";
import { ListPage } from "./src/component/ListPage";
import DetailPage from "./src/component/DetailPage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Header } from "react-native/Libraries/NewAppScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListPage" component={ListPage} />
        <Stack.Screen name="ExpoCameraPage" component={ExpoCameraPage} />
        <Stack.Screen name="DetailPage" component={DetailPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
