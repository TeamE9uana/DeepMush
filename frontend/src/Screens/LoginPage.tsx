import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import axios from "axios";

import { getStatusBarHeight } from "react-native-status-bar-height";
import { GoogleLogin } from "react-google-login";
import { ListPage } from "./ListPage";

export const LoginPage = ({ navigation }: any) => {
  const ResponseGoogle = (response: any) => {
    console.log(response);
  };
  return (
    <View style={stylesheet.container}>
      <View style={stylesheet.header}>
        <Text style={stylesheet.headertext}>🍄deepmush</Text>
      </View>
      <View style={stylesheet.body}>
        <Image
          style={stylesheet._image_1}
          source={require("../images/mainImage.jpeg")}
        ></Image>
      </View>

      <View style={stylesheet.footer}>
        <View style={stylesheet.logincontainer}>
          <TouchableOpacity
            style={[stylesheet.buttonContainer, stylesheet.googleButton]}
            onPress={() =>
              navigation.navigate("Websee", {
                url: "https://backend.deepmush.io/accounts/google/login/",
              })
            }
          >
            <View style={stylesheet.socialButtonContent}>
              <Image
                style={stylesheet.icon}
                source={require("../images/googleIcon.png")}
              />
              <Text style={{ color: "#4079DF" }}>Sign in with Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[stylesheet.buttonContainer, stylesheet.kakaoButton]}
            onPress={() =>
              navigation.navigate("Websee", {
                url: "http://backend.deepmush.io/accounts/kakao/login/",
              })
            }
          >
            <View style={stylesheet.socialButtonContent}>
              <Image
                style={stylesheet.icon}
                source={require("../images/kakaoIcon.png")}
              />
              <Text style={stylesheet.loginText}>카카오 계정 로그인</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const stylesheet = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },

  header: {
    flex: 0.6,
    alignItems: "center",
    marginTop: getStatusBarHeight(),
  },

  headertext: {
    paddingTop: "20%",
    fontSize: 25,
  },

  body: {
    flex: 1.5,
    backgroundColor: "#FFFFFF",
  },

  footer: {
    flex: 1.4,
  },

  _image_1: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 0,
    opacity: 1,
    right: "auto",
    top: 0,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "#FFFFFF",
  },

  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
  },
  loginButton: {
    backgroundColor: "#3498db",
  },
  googleButton: {
    borderColor: "black",
    borderWidth: 0,
    backgroundColor: "#FFFFFF",
    shadowColor: "#C0C0C0",
    shadowOpacity: 0.8,
    elevation: 50,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 5 },
  },
  kakaoButton: {
    borderColor: "black",
    borderWidth: 0,
    backgroundColor: "#FFEB32",
    shadowColor: "#C0C0C0",
    shadowOpacity: 0.8,
    elevation: 1,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 5 },
  },

  loginText: {
    color: "#3F1800",
  },
  restoreButtonContainer: {
    width: 250,
    marginBottom: 15,
    alignItems: "flex-end",
  },
  socialButtonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    color: "#FFFFFF",
    marginRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },

  logincontainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
