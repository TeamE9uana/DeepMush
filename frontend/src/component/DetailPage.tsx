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

/*
function deletebutton(title:any) =() =>{
  var le = this.state.DATA.length;
  for (var i = 0; i < le; i++) {
    if (this.state.DATA[i].title === title) {
      this.state.DATA.splice(i, 1);
      this.setState(this.state.DATA);

      break;
    }
  }
}
*/

// delete DATA2 with deletebutton
export function DetailPage({ route, navigation }) {
  const { index, DATA2 } = route.params;

  return (
    <View style={stylesheet.container}>
      <View>
        <View
          style={{
            marginBottom: 5,
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        />
      </View>
      <View style={stylesheet.body}>
        <View style={{ flex: 5 }}>
          <Image
            style={stylesheet.tinyLogo}
            source={require("../images/mush4.jpeg")}
          />
          <View>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 1,
                marginTop: 5,
              }}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,

            flexDirection: "row",
            marginLeft: 20,
            backgroundColor: "#BDE39F",
            width: "100%",
          }}
        >
          <View
            style={{
              flex: 4,

              justifyContent: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 13 }}>{DATA2[index].created_at}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {DATA2[index].id}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 2.5,
              backgroundColor: "skyblue",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailMapPage")}
            >
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={30}
                color="black"
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
            width: "100%",
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
