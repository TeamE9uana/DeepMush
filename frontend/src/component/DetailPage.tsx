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

let DATA2 = [
  {
    uri: "../images/mush.jpeg",
    uri2: require("../images/mush.jpeg"),

    lat: "",
    long: "",
    created_at: "2022/01/1",
    description: "hi",
    id: "송이버섯",
    percent: 100,
  },
  {
    uri: "../images/mush2.jpeg",
    uri2: require("../images/mush2.jpeg"),

    lat: "",
    long: "",
    created_at: "2022/01/2",
    description: "hi",
    id: "목이버섯",
    percent: 80,
  },
  {
    uri: "../images/mush3.jpeg",
    uri2: require("../images/mush3.jpeg"),
    lat: "",
    long: "",
    created_at: "2022/01/3",
    description: "hi",
    id: "팽이버섯",
    percent: 55,
  },

  {
    uri: "../images/mush4.jpeg",
    uri2: require("../images/mush4.jpeg"),

    lat: "",
    long: "",
    created_at: "2022/01/4",
    description: "hi",
    id: "노루궁뎅이버섯",
    percent: 63,
  },
  {
    uri: "../images/mush4.jpeg",
    uri2: require("../images/mush4.jpeg"),

    lat: "",
    long: "",
    created_at: "2022/01/5",
    description: "hi",
    id: "느타리버섯",
    percent: 100,
  },

  {
    uri: "../images/mush4.jpeg",
    uri2: require("../images/mush4.jpeg"),

    lat: "",
    long: "",
    created_at: "2022/01/6",
    description: "hi",
    id: "팽이버섯",
    percent: 63,
  },

  {
    uri: "../images/mush4.jpeg",
    uri2: require("../images/mush4.jpeg"),

    lat: "",
    long: "",
    created_at: "2022/01/7",
    description: "hi",
    id: "양송이버섯",
    percent: 63,
  },
];

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
export const DetailPage = (index: any, DATA2: any) => {
  const [updatedata, setupdatedata] = useState(DATA2);

  var deletebutton = (index: any) => {
    var le = DATA2.length;

    setupdatedata(DATA2.splice(index, 1));
    console.log("delete button pushed123");
    console.log("DATA2_length" + DATA2.length);
  };
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
          }}
        >
          <View
            style={{
              flex: 4,

              justifyContent: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 13 }}>2021/02/14</Text>
            </View>
            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                mushroom id
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
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={30}
              color="black"
            />
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
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Discription</Text>

          <ScrollView style={{ marginTop: 20 }}>
            <Text>
              식감 자체는 생각보다 평범하다. 새송이버섯을 썰어서 입에 넣었을 때
              느껴지는 아작아작함을 생각하면 된다. 양송이버섯이나 새송이버섯은
              송이버섯의 양산형이 아니라 아예 다른 종이다. 자세한 것은
              양송이버섯과 새송이버섯 문서 참조. 갓 부분은 평범한 버섯의
              식감이며, 익히면 말캉말캉해진다. 하지만 향의 차원으로 넘어가면
              다른 버섯과는 비교를 불허한다. 신선한 송이는 익히지 않은
              상태에서도 특유의 송이향을 느낄 수 있다. 송이 향은 곧 솔 향이다.
              소나무에서 자라니 당연한 일이겠지만, 솔의 눈같은 어렴풋한 향이
              아니라 강하고 선명한 향이다. 익히면 향은 더 강해진다. 이 때문에
              술, 국, 볶음, 구이 등등에 송이가 조금만 들어가도 엄청난 향을 느낄
              수 있다. 약한 불에 살짝 구워서 소금장에 찍어먹으면 송이의 식감과
              향을 효과적으로 즐길 수 있다. 향이 매우 강한 된장국이나 인스턴트
              라면에 넣어도 고유의 향을 완전히 잃지 않을 정도인데 산지에서는
              잎이 펴진 송이나 먹고 남은 자투리 송이를 처분하기 위해 라면에 종종
              넣어 먹기도 한다[3]. 조금만 들어가도 향이 은은하게 올라오는데
              자투리 조각을 넣기만 해도 평범한 라면과는 차원을 달리 한다. 분명
              송이를 먹는 것은 이 향 때문이지만 솔향이라는 게 달리 보면 소나무
              씹는 맛이라, 이런 쪽으로 익숙하지 않은 사람들에겐 그저
              기피대상이다. 처음 먹는 사람들은 향이 진하다고만 들었지 송진 향이
              날 줄은 몰랐다며 당황하기도 한다. 고급 식재료라고는 해도 결국엔
              버섯이라는 점에서 호불호가 갈린다.
            </Text>
          </ScrollView>
        </View>
      </View>

      <View style={stylesheet.footer}></View>
    </View>
  );
};

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
