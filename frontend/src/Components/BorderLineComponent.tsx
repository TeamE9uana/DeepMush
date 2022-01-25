import React from "react";
import { View } from "react-native";

export function BorderLine() {
  return (
    <View>
      <View
        style={{
          borderBottomColor: "grey",
          borderBottomWidth: 0.3,
          marginTop: 5,
        }}
      />
    </View>
  );
}
