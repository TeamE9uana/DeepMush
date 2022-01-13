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

import { NavigationContainer } from "@react-navigation/native";
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

/*
let DATA2 = [
  {
    uri: "https://e9ana-s3-bucket.s3.ap-northeast-2.amazonaws.com/usr/이구하나.jpg",
    uri2: "https://e9ana-s3-bucket.s3.ap-northeast-2.amazonaws.com/usr/이구하나.jpg",

    lat: "",
    long: "",
    created_at: "2022/01/1",
    description:
      "식감 자체는 생각보다 평범하다. 새송이버섯을 썰어서 입에 넣었을 때 느껴지는 아작아작함을 생각하면 된다. 양송이버섯이나 새송이버섯은 송이버섯의 양산형이 아니라 아예 다른 종이다. 자세한 것은 양송이버섯과 새송이버섯 문서 참조. 갓 부분은 평범한 버섯의 식감이며, 익히면 말캉말캉해진다. 하지만 향의 차원으로 넘어가면 다른 버섯과는 비교를 불허한다. 신선한 송이는 익히지 않은 상태에서도 특유의 송이향을 느낄 수 있다. 송이 향은 곧 솔 향이다.",

    id: "송이버섯",
    percent: 100,
  },
  {
    uri: "../images/mush2.jpeg",
    uri2: "https://e9ana-s3-bucket.s3.ap-northeast-2.amazonaws.com/usr/이구하나.jpg",

    lat: "",
    long: "",
    created_at: "2022/01/2",
    description: "hi",
    id: "목이버섯",
    percent: 80,
  },
  {
    uri: "../images/mush3.jpeg",
    uri2: "https://e9ana-s3-bucket.s3.ap-northeast-2.amazonaws.com/usr/이구하나.jpg",
    lat: "",
    long: "",
    created_at: "2022/01/3",
    description: "hi",
    id: "팽이버섯",
    percent: 55,
  },

  {
    uri: "../images/mush4.jpeg",
    uri2: "https://e9ana-s3-bucket.s3.ap-northeast-2.amazonaws.com/usr/이구하나.jpg",

    lat: "",
    long: "",
    created_at: "2022/01/4",
    description: "hi",
    id: "노루궁뎅이버섯",
    percent: 63,
  },
  {
    uri: "../images/mush4.jpeg",
    uri2: "https://e9ana-s3-bucket.s3.ap-northeast-2.amazonaws.com/usr/이구하나.jpg",

    lat: "",
    long: "",
    created_at: "2022/01/5",
    description: "hi",
    id: "느타리버섯",
    percent: 100,
  },

  {
    uri: "../images/mush4.jpeg",
    uri2: "https://e9ana-s3-bucket.s3.ap-northeast-2.amazonaws.com/usr/이구하나.jpg",

    lat: "",
    long: "",
    created_at: "2022/01/6",
    description: "hi",
    id: "팽이버섯",
    percent: 63,
  },

  {
    uri: "../images/mush4.jpeg",
    uri2: "https://e9ana-s3-bucket.s3.ap-northeast-2.amazonaws.com/usr/이구하나.jpg",

    lat: "",
    long: "",
    created_at: "2022/01/7",
    description: "hi",
    id: "양송이버섯",
    percent: 63,
  },
];
*/

let DATA2 = {
  success: true,
  images: [
    {
      id: 31,
      lat: null,
      lng: null,
      inference: null,
      image:
        "https://e9ana-s3-bucket.s3.amazonaws.com/DeepMush/mush.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVN5SPPTHXFLHDMBX%2F20220112%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220112T135844Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8f0c6a9b9dcf9e40e2daade3e30538d5a4dca646a0d2084b60bbdfd89b358cad",
      created_at: "2022-01-12T17:50:29.215370+09:00",
      description: "",
      made_by: 1,
    },
    {
      id: 32,
      lat: null,
      lng: null,
      inference: null,
      image:
        "https://e9ana-s3-bucket.s3.amazonaws.com/DeepMush/mush.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVN5SPPTHXFLHDMBX%2F20220112%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220112T135844Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8f0c6a9b9dcf9e40e2daade3e30538d5a4dca646a0d2084b60bbdfd89b358cad",
      created_at: "2022-01-12T17:50:29.215370+09:02",
      description: "",
      made_by: 2,
    },

    {
      id: 33,
      lat: null,
      lng: null,
      inference: null,
      image:
        "https://e9ana-s3-bucket.s3.amazonaws.com/DeepMush/mush.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVN5SPPTHXFLHDMBX%2F20220112%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220112T135844Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8f0c6a9b9dcf9e40e2daade3e30538d5a4dca646a0d2084b60bbdfd89b358cad",
      created_at: "2022-01-12T17:50:29.215370+09:01",
      description: "",
      made_by: 2,
    },

    {
      id: 33,
      lat: null,
      lng: null,
      inference: null,
      image:
        "https://e9ana-s3-bucket.s3.amazonaws.com/DeepMush/mush.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVN5SPPTHXFLHDMBX%2F20220112%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220112T135844Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8f0c6a9b9dcf9e40e2daade3e30538d5a4dca646a0d2084b60bbdfd89b358cad",
      created_at: "2022-01-12T17:50:29.215370+09:03",
      description: "",
      made_by: 2,
    },

    {
      id: 33,
      lat: null,
      lng: null,
      inference: null,
      image:
        "https://e9ana-s3-bucket.s3.amazonaws.com/DeepMush/mush.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVN5SPPTHXFLHDMBX%2F20220112%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220112T135844Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8f0c6a9b9dcf9e40e2daade3e30538d5a4dca646a0d2084b60bbdfd89b358cad",
      created_at: "2022-01-12T17:50:29.215370+09:06",
      description: "",
      made_by: 2,
    },

    {
      id: 33,
      lat: null,
      lng: null,
      inference: null,
      image:
        "https://e9ana-s3-bucket.s3.amazonaws.com/DeepMush/mush.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVN5SPPTHXFLHDMBX%2F20220112%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220112T135844Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8f0c6a9b9dcf9e40e2daade3e30538d5a4dca646a0d2084b60bbdfd89b358cad",
      created_at: "2022-01-12T17:50:29.215370+09:05",
      description: "",
      made_by: 2,
    },
    {
      id: 33,
      lat: null,
      lng: null,
      inference: null,
      image:
        "https://e9ana-s3-bucket.s3.amazonaws.com/DeepMush/mush.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVN5SPPTHXFLHDMBX%2F20220112%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220112T135844Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8f0c6a9b9dcf9e40e2daade3e30538d5a4dca646a0d2084b60bbdfd89b358cad",
      created_at: "2022-01-12T17:50:29.215370+09:07",
      description: "",
      made_by: 2,
    },
    {
      id: 33,
      lat: null,
      lng: null,
      inference: null,
      image:
        "https://e9ana-s3-bucket.s3.amazonaws.com/DeepMush/mush.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVN5SPPTHXFLHDMBX%2F20220112%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220112T135844Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8f0c6a9b9dcf9e40e2daade3e30538d5a4dca646a0d2084b60bbdfd89b358cad",
      created_at: "2022-01-12T17:50:29.215370+09:08",
      description: "",
      made_by: 2,
    },

    {
      id: 32,
      lat: null,
      lng: null,
      inference: null,
      image:
        "https://e9ana-s3-bucket.s3.amazonaws.com/DeepMush/mush.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVN5SPPTHXFLHDMBX%2F20220112%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220112T135844Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8f0c6a9b9dcf9e40e2daade3e30538d5a4dca646a0d2084b60bbdfd89b358cad",
      created_at: "2022-01-12T17:50:29.215370+09:06",
      description: "",
      made_by: 2,
    },

    {
      id: 32,
      lat: null,
      lng: null,
      inference: null,
      image:
        "https://e9ana-s3-bucket.s3.amazonaws.com/DeepMush/mush.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVN5SPPTHXFLHDMBX%2F20220112%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220112T135844Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8f0c6a9b9dcf9e40e2daade3e30538d5a4dca646a0d2084b60bbdfd89b358cad",
      created_at: "2022-01-12T17:50:29.215370+09:05",
      description: "",
      made_by: 2,
    },
    {
      id: 32,
      lat: null,
      lng: null,
      inference: null,
      image:
        "https://e9ana-s3-bucket.s3.amazonaws.com/DeepMush/mush.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVN5SPPTHXFLHDMBX%2F20220112%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220112T135844Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8f0c6a9b9dcf9e40e2daade3e30538d5a4dca646a0d2084b60bbdfd89b358cad",
      created_at: "2022-01-12T17:50:29.215370+09:07",
      description: "",
      made_by: 2,
    },
  ],
};

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

let im = [];
let im2 = [];

// delete DATA2 with deletebutton
export function ListPage({ navigation }: any) {
  const [updatedata, setupdatedata] = useState(im);
  var token = localStorage.getItem("access_token");

  var deletebutton = (index: any) => {
    var le = DATA2.length;

    setupdatedata(DATA2.splice(index, 1));
    console.log("delete button pushed123");
    console.log("DATA2_length" + DATA2.length);
  };

  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.

    async function fetchAndSetList() {
      var myHeaders = await new Headers();
      await myHeaders.append("Authorization", `Token ${token}`);
      await myHeaders.append("Content-Type", "multipart/form-data");

      var requestOptions = await {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch("http://backend.deepmush.io/images/", requestOptions)
        .then((response) => response.json())
        .then((result) => (im = result.images))
        .catch((error) => console.log("error", error));

      await setupdatedata(im);
    }
    fetchAndSetList();
  }, []);

  const [filterText, SetfilterText] = useState(filterText);

  async function searchData() {
    await console.log("searchbutton pushed !!!");
    var imlength = await Object.keys(DATA2.images).length;

    //console.log("imlength : " + imlength + "\n");
    //console.log("filterText : " + filterText + "\n");

    var check = 0;
    for (let i = 0; i < imlength; i++) {
      //console.log(DATA2.images[i].id + " " + typeof DATA2.images[i].id);
      //console.log(typeof DATA2.images[i].id.toString());

      if (filterText === DATA2.images[i].id.toString()) {
        im2.push(DATA2.images[i]);
        //console.log("searchmatchd!!");
        im = im2;
        check++;
      }
    }
    if (check == 0) {
      im = [];
    }
    im2 = [];
    console.log(im);

    setupdatedata(im);

    check = 0;
  }

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

      <View>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
            marginBottom: 9,
          }}
        />
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
          data={im}
          keyExtractor={(item) => String(item.created_at)}
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

                backgroundColor: index % 2 == 0 ? "#BDE39F" : "#286053",
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
                    uri: item.image,
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
                      marginTop: 15,
                      marginBottom: 10,
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
                      marginTop: 10,
                      fontSize: 20,
                    }}
                  >
                    {item.id}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 11,
                      fontSize: 15,
                    }}
                  >
                    &nbsp;{item.percent}%
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
                      DATA2: im,
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
                    onPress={() => deletebutton(index)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <View>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        />
      </View>

      <View style={stylesheet.footer}>
        <View>
          <SimpleLineIcons name="folder" size={30} color="blue" />
        </View>
        <View>
          <SimpleLineIcons
            name="camera"
            size={30}
            color="black"
            onPress={() => navigation.navigate("ExpoCameraPage")}
          />
        </View>
        <View>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={30}
            color="black"
            onPress={() => navigation.navigate("MapPage")}
          />
        </View>
      </View>
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
