import { useState } from "react";

import * as React from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import axios from "axios";

import { WebView } from "react-native-webview";

import { getStatusBarHeight } from "react-native-status-bar-height";

import { Constants } from "expo-camera";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "localstorage-polyfill";

export function WebSee({ route, navigation }: any) {
  //const [Title, setTitle] = useState("");

  //url params from LoginPage
  const { url } = route.params;

  // webview 실행시 바로 실행될 자바스크립트 html의 pre에 들어있는 json(token,id,email) 값을 불러온다
  const INJECTED_JAVASCRIPT =
    '(function() {if(window.document.getElementsByTagName("pre").length>0){window.document.getElementsByTagName("pre")[0].style.display = "none";window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();';

  let result;

  //웹뷰에 삽입한 자바스크립트 실행시 실행되는 handlemessage 펑션 받아온 토큰을 로컬스토리지에 저장하고 목록화면으로 이동한다
  const _handleMessage = async (event: any) => {
    result = await JSON.parse(event.nativeEvent.data);
    await console.log("testing " + url);
    await console.log(result);
    await console.log(result.profile.id);
    await console.log(result.profile.name);
    await console.log(result.profile.email);

    await localStorage.setItem("access_token", result.access_token);
    await localStorage.setItem("name", result.profile.name);
    await localStorage.setItem("email", result.profile.email);
    await localStorage.setItem("id", result.profile.id);

    await console.log(localStorage.getItem("access_token"));

    await navigation.navigate("ListPage");
  };

  return (
    <WebView
      style={stylesheet.container}
      userAgent="Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko; googleweblight) Chrome/38.0.1025.166 Mobile Safari/535.19"
      source={{ uri: url }}
      //ref={(ref) => (webview = ref)}
      //onNavigationStateChange={handleWebViewNavigationStateChange}
      sharedCookiesEnabled={true}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      onMessage={_handleMessage}
      thirdPartyCookiesEnabled={true}
    ></WebView>
  );
}
const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
});
