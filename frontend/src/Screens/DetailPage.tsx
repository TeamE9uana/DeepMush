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
import { nameToKor } from "../Components/functionComponent";
import { BorderLine } from "../Components/BorderLineComponent";

export function DetailPage({ route, navigation }) {
  // imagelist(json) , json index params from ListPage
  const { index, DATA2 } = route.params;

  return (
    <View style={stylesheet.container}>
      <BorderLine />

      <View style={stylesheet.body}>
        <View style={{ flex: 5 }}>
          <Image
            style={stylesheet.tinyLogo}
            source={{ uri: DATA2[index].inference.result_image }}
          />
          <BorderLine />
        </View>

        <View style={stylesheet.textcontainer}>
          <View style={stylesheet.infocontainer}>
            <View>
              <Text style={{ fontSize: 13, marginLeft: 5 }}>
                {DATA2[index].created_at.substring(0, 10)}
              </Text>
            </View>
            <View>
              <Text style={stylesheet.label_name}>
                {nameToKor(DATA2[index].inference.result[0].label_name)}
              </Text>
            </View>
          </View>

          <View style={stylesheet.percentcontainer}>
            <Text style={{ fontSize: 20 }}>
              {DATA2[index].inference.result[0].prob == 0
                ? DATA2[index].inference.result[0].prob
                : DATA2[index].inference.result[0].prob
                    .toString()
                    .substring(2, 4)}
              %
            </Text>
          </View>

          <View style={stylesheet.icon_container}>
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

        <BorderLine />

        <View style={stylesheet.description_container}>
          <Text style={stylesheet.description_textcontainer}>Description</Text>

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

  textcontainer: {
    flex: 1,

    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    width: "95%",
  },

  infocontainer: {
    flex: 5,
    marginRight: 20,
    justifyContent: "center",
  },

  label_name: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: 3,
  },

  percentcontainer: {
    flex: 5,
    justifyContent: "center",
  },

  icon_container: {
    flex: 3,
    backgroundColor: "#3DD598",
    alignItems: "center",
    justifyContent: "center",
  },

  description_container: {
    flex: 4,
    marginLeft: 20,
    marginTop: 2,
    width: "95%",
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  description_textcontainer: { fontSize: 17, fontWeight: "bold" },
});

export default DetailPage;
