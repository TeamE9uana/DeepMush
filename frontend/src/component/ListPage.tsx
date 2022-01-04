import React, { Component } from "react";
import {
  View,
  ViewBase,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  LayoutAnimation,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { AntDesign } from "@expo/vector-icons";

let DATA2 = [
  {
    uri: "",
    lat: "",
    long: "",
    created_at: "2022/01/12",
    description: "hi",
    id: "송이버섯",
  },
  {
    uri: "",
    lat: "",
    long: "",
    created_at: "2022/01/12",
    description: "hi",
    id: "목이버섯",
  },
  {
    uri: "",
    lat: "",
    long: "",
    created_at: "2022/01/12",
    description: "hi",
    id: "팽이버섯",
  },

  {
    uri: "",
    lat: "",
    long: "",
    created_at: "2022/01/12",
    description: "hi",
    id: "양송이버섯",
  },
];

export const Listpage = () => {
  return (
    <View style={stylesheet.container}>
      <View style={stylesheet.header}>
        <View>
          <Text style={stylesheet.logotext}>🍄deepmush</Text>
        </View>
        <View>
          <Text style={{ marginRight: 25, fontSize: 16 }}>목록</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Ionicons name="search" size={24} color="black" />
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
        </View>
      </View>
      <View style={stylesheet.body}>
        <FlatList
          data={DATA2}
          renderItem={({ item }) => (
            <View
              style={{
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "5%",
                height: 150,

                backgroundColor: "green",
              }}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  style={stylesheet.tinyLogo}
                  source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
                />
                <Text
                  style={{
                    color: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "green",
                  }}
                >
                  {item.id}
                </Text>

                <Text
                  style={{
                    color: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "green",
                  }}
                >
                  {item.description}
                </Text>
                <Text
                  style={{
                    color: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "green",
                  }}
                >
                  {item.created_at}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.9,
                  alignItems: "flex-end",
                  marginLeft: "20%",
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AntDesign name="closesquare" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <View style={stylesheet.footer}></View>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: getStatusBarHeight(),

    flex: 0.5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "green",
  },
  body: { flex: 5, backgroundColor: "gray" },

  footer: { flex: 1, backgroundColor: "blue" },

  logotext: {
    fontSize: 14,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

export default Listpage;
