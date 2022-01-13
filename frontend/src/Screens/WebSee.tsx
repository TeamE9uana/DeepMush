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

  const { url } = route.params;

  const INJECTED_JAVASCRIPT =
    '(function() {if(window.document.getElementsByTagName("pre").length>0){window.document.getElementsByTagName("pre")[0].style.display = "none";window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();';
  /*
    const runFirst = `

  var pre = document.getElementsByTagName('body');
  window.ReactNativeWebView.postMessage(JSON.stringify(window.location));


  document.body.style.backgroundColor = 'red';



  setTimeout(function() { window.alert('hi') }, 2000);
  true; // note: this is required, or you'll sometimes get silent failures
`;
*/
  /*
  var webview: WebView<{
    style: { flex: number; marginTop: number };
    userAgent: "Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko; googleweblight) Chrome/38.0.1025.166 Mobile Safari/535.19";
    source: { uri: string };
    ref: unknown;
    onNavigationStateChange: (newNavState: { url: any }) => void;
    sharedCookiesEnabled: true;
    thirdPartyCookiesEnabled: true;
  }> | null = null;
*/
  /*
  var handleWebViewNavigationStateChange = (newNavState: { url: any }) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    if (!url) return;

    // handle certain doctypes
    if (url.includes("scope=email+profile")) {
      Alert.alert("hellothisisworld");
      console.log(url);
    }
  };
*/
  let result;

  const _handleMessage = async (event: any) => {
    result = await JSON.parse(event.nativeEvent.data);
    await console.log("testing " + url);
    await console.log(result);
    await console.log(result.access_token);
    await console.log(result.profile.id);
    await console.log(result.profile.name);
    await console.log(result.profile.email);

    await localStorage.setItem("access_token", result.access_token);
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
