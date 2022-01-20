// import * as React from "react";
// import { View, Text } from "react-native";

// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Ionicons from "react-native-vector-icons/Ionicons";

// import { MapPage } from "./Screens/MapPage";
// import { ListPage } from "./Screens/ListPage";
// import { ExpoCameraPage } from "./Screens/ExpoCameraPage";

// const cameraName = "카메라";
// const listName = "목록";
// const mapName = "지도";

// const Tab = createBottomTabNavigator();

// export default function MainContainer() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         initialRouteName={listName}
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             let rn = route.name;

//             if (rn === cameraName) {
//               iconName = focused ? "camera" : "camera-outline";
//             } else if (rn === listName) {
//               iconName = focused ? "list" : "list-outline";
//             } else if (rn === mapName) {
//               iconName = focused ? "map" : "map-outline";
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//       >
//         <Tab.Screen name={listName} component={ListPage} />
//         <Tab.Screen name={cameraName} component={ExpoCameraPage} />
//         <Tab.Screen name={mapName} component={MapPage} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
