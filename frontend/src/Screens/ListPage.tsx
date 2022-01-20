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
  Touchable,
} from "react-native";

import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Svg, Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { DetailPage } from "./DetailPage";
import SearchBar from "react-native-dynamic-search-bar";
import "localstorage-polyfill";

import { Button, Menu, Divider, Provider, List } from "react-native-paper";
import {
  ListPageHeader,
  ListPageHeaderComponent,
} from "../Components/ListPageHeaderComponent";
import { BorderLine } from "../Components/BorderLineComponent";
import { SearchBarComponent } from "../Components/SearchBarComponent";
import { ListBodyComponent } from "../Components/ListBodyComponent";
import { ListFooterComponent } from "../Components/ListFooterComponent";

// 메인 flatlist에 사용 되는 json
let im = [];

// 검색에 활용되는 임시 json
let im2 = [];
let im3 = [];

export function ListPage({ navigation }) {
  const isFocused = useIsFocused();

  //login access_token from localstorage
  var token = localStorage.getItem("access_token");

  //props from expocamerapage's didupload
  //const didupload = props.didupload;

  //image json update state
  const [updatedata, setupdatedata] = useState(im);

  // text 변경 확인 state
  const [filterText, SetfilterText] = useState(filterText);

  // not completed - deletebutton , 삭제 api 연동 필요
  var deletebutton = async (index, id) => {
    var le = im.length;

    setupdatedata(im.splice(index, 1));
    console.log("delete button pushed!!!");
    console.log("im_length " + im.length);
    console.log("im_index " + index);
    console.log("im_id " + id);

    var sid = id.toString();

    console.log(sid);
    console.log(typeof sid);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);
    myHeaders.append("Content-Type", "multipart/form-data");

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(`https://backend.deepmush.io/images/${sid}/`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  // 텍스트 검색 state 서버 작업 완료시 로컬 데이터인 DATA2에서 im으로 변경필요
  async function searchData() {
    await console.log("searchbutton pushed !!!");

    var imlength = await Object.keys(im).length;

    console.log("imlength : " + imlength + "\n");
    console.log("filterText : " + filterText + "\n");

    var check = 0;

    im2 = [];

    im3 = [];

    // 리스트에 들어있는 값만큼 filltertext와 비교해서 imagelist에 검색된 값을 넣어준다

    if (filterText !== "") {
      for (let i = 0; i < imlength; i++) {
        //console.log(im[i].id + " " + typeof im[i].id);
        //console.log(typeof im[i].id.toString());
        console.log(i);
        //데이터 검색 if 문
        if (filterText === im[i].id.toString()) {
          im2.push(im[i]);

          console.log("searchmatchd!!");

          check++;
        }
      }

      if (check == 0) im2 = [];

      im3 = im2;

      setupdatedata(im3);

      check = 0;
    } else {
      im3 = im;

      setupdatedata(im3);
    }
  }

  // listpage 동작시 useEffect 작동 -> get Method 실행해서 이미지 리스트들을 받아오고 im state에 결과값을 저장한다
  useEffect(() => {
    //get method - fetch
    async function fetchAndSetList() {
      var myHeaders = await new Headers();
      await myHeaders.append("Authorization", `Token ${token}`);
      await myHeaders.append("Content-Type", "multipart/form-data");

      var requestOptions = await {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch("https://backend.deepmush.io/images/", requestOptions)
        .then((response) => response.json())
        .then((result) => (im = result.images))
        .catch((error) => console.log("error", error));

      //await console.log("this is im inference result" + im[0].inference.result);
      //await console.log("this is im inference result" + im[1].inference.result);
      //await console.log("this is im inference result" + im[2].inference.result);
      //await console.log("this is im inference result" + im[3].inference.result);
      //await console.log("this is im inference result" + im[0].inference.result);

      for (let i = 0; i < im.length; i++) {
        var count = 0;
        for await (const element of im[i].inference.result) {
          count++;
        }

        if (count == 0) {
          await console.log("result is empty");
          im[i].inference.result = [{ prob: "0", label_name: "empty" }];

          console.log("[empty]" + im[i].inference.result[0].prob);
        } else {
          await console.log("result is not empty");
        }
      }

      im3 = im;

      await setupdatedata(im);

      //console.log(im);
    }
    fetchAndSetList();
  }, [isFocused]);

  return (
    <View style={stylesheet.container}>
      <ListPageHeaderComponent />

      <BorderLine />

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
      <View style={stylesheet.body}>
        <View style={{}} />
        <FlatList
          data={im3}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <View
              style={{
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                marginBottom: 9,
                height: 105,

                width: 319,

                backgroundColor: index % 2 == 0 ? "#BDE39F" : "#BDE37F",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  flex: 1,
                }}
              >
                <Image
                  style={stylesheet.tinyLogo}
                  source={{
                    uri: item.inference.result_image,
                  }}
                />
              </View>

              <View
                style={{ marginLeft: 20, flexDirection: "column", flex: 1 }}
              >
                <View>
                  <Text
                    style={{
                      color: "white",
                      alignItems: "flex-end",
                      marginTop: 5,
                      marginBottom: 10,
                      fontSize: 12,
                      maxWidth: 65,
                      maxHeight: 12,
                    }}
                  >
                    {item.created_at}
                  </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 15,
                      fontSize: 20,
                    }}
                  >
                    {item.inference.result[0].label_name}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 19,
                      fontSize: 15,
                      maxWidth: 30,
                      maxHeight: 15,
                    }}
                  ></Text>

                  <Text
                    style={{
                      color: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 19,
                      fontSize: 15,
                      maxWidth: 48,
                      maxHeight: 15,
                    }}
                  >
                    {item.inference.result[0].prob}%
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                  marginTop: 40,
                }}
              >
                <Ionicons
                  style={{ marginRight: 5 }}
                  name="search"
                  size={24}
                  color="blue"
                  onPress={() =>
                    navigation.navigate("DetailPage", {
                      index: index,
                      DATA2: im3,
                    })
                  }
                />
                <View style={{ marginLeft: 30 }}>
                  <Text style={{ fontSize: 10, color: "white" }}>상세보기</Text>
                </View>
              </View>

              <View
                style={{
                  flex: 0.5,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AntDesign
                    name="closesquare"
                    size={24}
                    color="white"
                    onPress={() => deletebutton(index, item.id)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <BorderLine />
      <ListFooterComponent />
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
    width: 80,
    height: 80,
    borderRadius: 12,
  },
});
