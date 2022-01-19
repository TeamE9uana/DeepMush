import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useNavigation } from "@react-navigation/native";

export function ListPageHeaderComponent() {
  const navigation = useNavigation();

  return (
    <View style={stylesheet.header}>
      <View>
        <Text style={stylesheet.logotext}>🍄deepmush</Text>
      </View>
      <View>
        <Text style={{ marginRight: 25, fontSize: 16 }}>목록</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserInfoPage")}
          style={{ marginRight: 5 }}
        >
          <AntDesign name="user" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const stylesheet = StyleSheet.create({
  header: {
    marginTop: getStatusBarHeight(),

    flex: 0.5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  logotext: {
    fontSize: 14,
  },
});
