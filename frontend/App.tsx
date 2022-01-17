import React from "react";

import { LoginPage } from "./src/Screens/LoginPage";
import { ExpoCameraPage } from "./src/Screens/ExpoCameraPage";
import { ListPage } from "./src/Screens/ListPage";
import DetailPage from "./src/Screens/DetailPage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Header } from "react-native/Libraries/NewAppScreen";
import { WebSee } from "./src/Screens/WebSee";
import { WebView } from "react-native-webview";
import { MapPage } from "./src/Screens/MapPage";
import { DetailMapPage } from "./src/Screens/DetailMapPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ExpoCameraPage"
          component={ExpoCameraPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    /*
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginPage"
          component={LoginPage}
        />

        <Stack.Screen
          name="ListPage"
          component={ListPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExpoCameraPage"
          component={ExpoCameraPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="DetailPage" component={DetailPage} />
        <Stack.Screen name="Websee" component={WebSee} />
        <Stack.Screen
          name="MapPage"
          component={MapPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="DetailMapPage" component={DetailMapPage} />
      </Stack.Navigator>
    </NavigationContainer>
    */
  );
}
