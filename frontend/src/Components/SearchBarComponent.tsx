import React from "react";
import { View, StyleSheet } from "react-native";

import SearchBar from "react-native-dynamic-search-bar";

export function SearchBarComponent() {
  return (
    <View>
      <SearchBar
        style={{
          marginBottom: 9,
        }}
        fontColor="#c6c6c6"
        iconColor="#c6c6c6"
        shadowColor="#282828"
        cancelIconColor="#c6c6c6"
        placeholder="Search here"
        onChangeText={(text) => SetfilterText(text)}
        onSearchPress={() => searchData()}
        onClearPress={() => SetfilterText("")}
      />
    </View>
  );
}
