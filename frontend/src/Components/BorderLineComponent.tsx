import React from "react";
import { View } from "react-native";

export function BorderLine() {
  return (
    <View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          marginBottom: 9,
        }}
      />
    </View>
  );
}
