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
import * as Location from "expo-location";
import { nameToKor, 빈결과검출 } from "../Components/functionComponent";
import Spinner from "react-native-loading-spinner-overlay";

// 메인 flatlist에 사용 되는 json
let im = [];

// 검색에 활용되는 임시 json
let im2 = [];
let im3 = [];

export function ListPage({
  // route,
  navigation,
}) {
  const [location, setLocation] = useState(null);
  const isFocused = useIsFocused();
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const expoLocation = async () => {
    await setLoading(true);

    //expo-location 권한요청
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    //현재위치데이터 받아오기
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    //위도 경도 콘솔
    await console.log(location.coords.latitude);
    await console.log(location.coords.longitude);

    await setLoading(false);
  };
  // const { didupload } = route.params;

  //login access_token from localstorage
  var token = localStorage.getItem("access_token");

  //props from expocamerapage's didupload
  // const didupload = props.didupload;

  //image json update state
  const [updatedata, setupdatedata] = useState(im);

  // text 변경 확인 state
  const [filterText, SetfilterText] = useState(filterText);

  // not completed - deletebutton , 삭제 api 연동 필요
  var deletebutton = async (index, id) => {
    await setLoading(true);
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

    await setLoading(false);
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
        if (filterText === nameToKor(im[i].inference.result[0].label_name)) {
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
      await setLoading(true);

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

      await 빈결과검출(im, im3);

      im3 = im;

      await setupdatedata(im);
      await setLoading(false);

      if (location == null) {
        expoLocation();
      }

      //console.log(im);
    }
    fetchAndSetList();
  }, [isFocused]);

  return (
    <View style={stylesheet.container}>
      <Spinner visible={loading} textContent={"Loading..."} />

      <View style={stylesheet.header}>
        <View>
          <Text style={stylesheet.logotext}>🍄deepmush</Text>
        </View>
        <View>
          <Text style={{ marginRight: 25, fontSize: 16 }}>목록</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <AntDesign
            style={{ marginRight: 15 }}
            name="user"
            size={23}
            color="black"
            onPress={() => navigation.navigate("UserInfoPage")}
          />
        </View>
      </View>
      <View>
        <View>
          <BorderLine />
        </View>

        <SearchBar
          style={stylesheet.serachbar}
          fontColor="#c6c6c6"
          iconColor="#3DD598"
          shadowColor="#282828"
          cancelIconColor="#3DD598"
          placeholder="Search here"
          onChangeText={(text) => SetfilterText(text)}
          onSearchPress={() => searchData()}
          onClearPress={() => SetfilterText("")}
        />
      </View>
      <View style={stylesheet.body}>
        <FlatList
          data={im3}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <View style={stylesheet.flatlist}>
              <View style={stylesheet.flatcontainer}>
                <Image
                  style={stylesheet.tinyLogo}
                  source={{
                    uri: item.inference.result_image,
                  }}
                />
              </View>
              <View style={stylesheet.flattextcontainer}>
                <View>
                  <Text style={stylesheet.createdat}>
                    {item.created_at.substring(0, 10)}
                  </Text>
                </View>

                <Text style={stylesheet.resulttext}>
                  {nameToKor(item.inference.result[0].label_name)}
                  {/* {item.inference.result[0].label_name} */}
                </Text>
              </View>

              <View style={stylesheet.detailcontainer}>
                <Ionicons
                  style={{ marginRight: 5 }}
                  name="search"
                  size={24}
                  color="#3DD598"
                  onPress={() =>
                    navigation.navigate("DetailPage", {
                      index: index,
                      DATA2: im,
                    })
                  }
                />

                <View style={{ marginLeft: 30 }}>
                  <Text style={{ fontSize: 10, color: "black" }}>상세보기</Text>
                </View>
              </View>

              <TouchableOpacity style={stylesheet.deletecontainer}>
                <AntDesign
                  name="closesquare"
                  size={24}
                  color="#3DD598"
                  onPress={() => deletebutton(index, item.id)}
                  style={stylesheet.deleteicon}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View>
        <BorderLine />
      </View>
      <View style={stylesheet.footer}>
        <View>
          <SimpleLineIcons name="folder" size={30} color="#3DD598" />
        </View>
        <View>
          <SimpleLineIcons
            name="camera"
            size={30}
            color="#989898"
            onPress={() => navigation.navigate("ExpoCameraPage")}
          />
        </View>
        <View>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={30}
            color="#989898"
            onPress={() =>
              navigation.navigate("MapPage", {
                listData: im,
                currentLocation: location,
              })
            }
          />
        </View>
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    backgroundColor: "#FCFCFC",
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
    backgroundColor: "#FFFFFF",
  },

  logotext: {
    fontSize: 14,
    marginLeft: 10,
  },
  tinyLogo: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginLeft: 15,
    marginTop: 3,
  },

  serachbar: { marginBottom: 20, marginTop: 10, width: 320 },

  flatlist: {
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 13,
    height: 105,
    borderColor: "#989898",
    borderWidth: 0.2,
    width: 320,
    backgroundColor: "#FFFFFF",
    shadowColor: "#C0C0C0",
    shadowOpacity: 0.4,
    elevation: 50,
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 3 },
    marginRight: 20,
    marginLeft: 20,
  },

  flatcontainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    flex: 1,
  },

  flattextcontainer: {
    marginLeft: 20,
    flexDirection: "column",
    flex: 1,
  },

  createdat: {
    color: "black",
    alignItems: "flex-end",
    marginTop: 15,
    marginBottom: 0,
    fontSize: 12,
    maxWidth: 80,
    maxHeight: 12,
  },

  resulttext: {
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    fontSize: 20,
  },

  detailcontainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 40,
  },

  deletecontainer: { alignItems: "center", justifyContent: "center" },

  deleteicon: { marginTop: 5, marginRight: 5, borderRadius: 12 },
});
