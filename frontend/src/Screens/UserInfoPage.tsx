import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import "localstorage-polyfill";

export const UserInfoPage = ({ navigation }: any) => {
  const isFocused = useIsFocused();

  var userinfo = { name: "1234", id: 1234, email: "1234" };

  const [profile, setProfile] = useState(userinfo);

  var name = "";
  var id = 0;
  var email = "";

  userinfo.id = localStorage.getItem("id");
  userinfo.name = localStorage.getItem("name");
  userinfo.email = localStorage.getItem("email");

  console.log("this is local storage" + userinfo.id);
  console.log("1" + userinfo.name);
  console.log("2" + userinfo.email);

  return (
    <View style={stylesheet.container}>
      <View style={stylesheet.body}>
        <View
          style={{
            backgroundColor: "#F0FFFF",
            width: "90%%",
            height: 350,
            borderRadius: 15,
            borderColor: "black",
            borderWidth: 2,
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <AntDesign
              style={{ marginTop: 30 }}
              name="user"
              size={80}
              color="black"
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              marginBottom: 70,
            }}
          >
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 1,
                marginBottom: 9,
              }}
            ></View>

            <Text style={{ fontSize: 20, marginBottom: 5 }}>NAME</Text>
            <Text>{userinfo.name}</Text>

            <Text style={{ marginTop: 30, fontSize: 20, marginBottom: 5 }}>
              EMAIL
            </Text>

            <Text>{userinfo.email}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "blue",
  },
  body: {
    flex: 6,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },

  footer: {
    flex: 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "purple",
  },
});
