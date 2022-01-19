import { Ionicons, AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export function ListBodyComponent(props) {
  const navigation = useNavigation();

  return (
    <View style={stylesheet.body}>
      <View style={{}} />
      <FlatList
        data={props.value}
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
                  uri: item.image,
                }}
              />
            </View>

            <View style={{ marginLeft: 20, flexDirection: "column", flex: 1 }}>
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
                    DATA2: props.value,
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
  );
}
const stylesheet = StyleSheet.create({
  body: { flex: 6, alignItems: "center" },

  logotext: {
    fontSize: 14,
  },
  tinyLogo: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
});
