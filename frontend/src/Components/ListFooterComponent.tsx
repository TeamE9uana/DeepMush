import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

export function ListFooterComponent() {
  const navigation = useNavigation();

  return (
    <View style={stylesheet.footer}>
      <View>
        <SimpleLineIcons name="folder" size={30} color="blue" />
      </View>
      <View>
        <SimpleLineIcons
          name="camera"
          size={30}
          color="black"
          onPress={() => navigation.navigate("ExpoCameraPage")}
        />
      </View>
      <View>
        <MaterialCommunityIcons
          name="map-marker-outline"
          size={30}
          color="black"
          onPress={() => navigation.navsetigate("MapPage")}
        />
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  footer: {
    flex: 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
