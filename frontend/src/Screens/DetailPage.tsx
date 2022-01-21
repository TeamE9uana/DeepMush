import React, { Component, useState } from "react";
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
import { SimpleLineIcons } from "@expo/vector-icons";
import { useEffect } from "react";

export function DetailPage({ route, navigation }) {
  // imagelist(json) , json index params from ListPage
  const { index, DATA2 } = route.params;

  function nameToKor(name: string) {
    if (name === "enoki") {
      return "팽이버섯";
    } else if (name === "shitake") {
      return "표고버섯";
    } else if (name === "songi") {
      return "새송이버섯";
    } else if (name === "yellowegg") {
      return "노란달걀버섯";
    } else if (name === "woodear") {
      return "목이버섯";
    } else if (name === "neungi") {
      return "능이버섯";
    } else if (name === "noru") {
      return "노루궁뎅이버섯";
    } else if (name === "songe") {
      return "송이버섯";
    } else if (name === "youngji") {
      return "영지버섯";
    }
  }

  return (
    <View style={stylesheet.container}>
      <View>
        <View
          style={{
            marginBottom: 5,
            borderBottomColor: "black",
            borderBottomWidth: 0.3,
          }}
        />
      </View>
      <View style={stylesheet.body}>
        <View style={{ flex: 5 }}>
          <Image
            style={stylesheet.tinyLogo}
            source={{ uri: DATA2[index].image }}
          />
          <View>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 0.3,
                marginTop: 5,
              }}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,

            flexDirection: "row",
            backgroundColor: "#FFFFFF",
            width: "95%",
          }}
        >
          <View
            style={{
              flex: 8,
              marginRight: 20,

              justifyContent: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 13, marginLeft: 5 }}>
                {DATA2[index].created_at.substring(0, 10)}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 5,
                  marginTop: 3,
                }}
              >
                {nameToKor(DATA2[index].inference.result[0].label_name)}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 2.5,
              backgroundColor: "#3DD598",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetailMapPage", {
                  mapData: DATA2[index],
                })
              }
            >
              <MaterialCommunityIcons
                name="map-marker"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginTop: 5,
            }}
          />
        </View>
        <View
          style={{
            flex: 4,

            marginLeft: 20,
            marginTop: 2,
            width: "95%",
            marginRight: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Description</Text>

          <ScrollView style={{ marginTop: 20 }}>
            <Text>{DATA2[index].description}</Text>
          </ScrollView>
        </View>
      </View>

      <View style={stylesheet.footer}></View>
    </View>
  );
}

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
  },
  body: { flex: 6, alignItems: "center" },

  footer: {
    flex: 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  logotext: {
    fontSize: 14,
  },
  tinyLogo: {
    width: 393,
    height: 304,
  },
});

export default DetailPage;
