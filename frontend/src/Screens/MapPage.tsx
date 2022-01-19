import * as React from "react";
import { useState } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import { Marker } from "react-native-maps";
import { useLayoutEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { SimpleLineIcons } from "@expo/vector-icons";

type Markers = {
  name: string;
  latitude: number;
  longitude: number;
};

const sample2 = {
  latitude: 37.366730031441506,
  longitude: -122.03164481984454,
};
const sample1 = {
  latitude: 37.36957273223395,
  longitude: -122.02391041565818,
};
const myhouse = {
  latitude: 37.367875874475885,
  longitude: -122.03762870058752,
};
const initialregion = {
  latitude: (sample1.latitude + sample2.latitude + myhouse.latitude) / 3,
  longitude: (sample1.longitude + sample2.longitude + myhouse.longitude) / 3,
};

export const MapPage = ({ navigation }: any) => {
  //const im = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisivle: false,
      headerRight: () => (
        <MaterialCommunityIcons
          name="home-variant"
          size={30}
          style={{ marginRight: 11 }}
          onPress={() => navigation.navigate("ListPage")}
        />
      ),
    });
  });
  const [clicked, setClicked] = useState(false);
  const dataSet = [
    {
      name: "sample1",
      latitude: 37.3667300314415,
      longitude: -122.03164481984454,
    },
    {
      name: "sample2",
      latitude: 37.36957273223395,
      longitude: -122.02391041565818,
    },
    {
      name: "sample3",
      latitude: 37.367875874475885,
      longitude: -122.03762870058752,
    },

    {
      name: "sample4",
      latitude: 37.367875874475885,
      longitude: -122.03262870058752,
    },
    {
      name: "sample5",
      latitude: 37.367875874475885,
      longitude: -122.03562870058752,
    },
  ];
  const [markers, setMarkers] = useState(dataSet);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={"google"}
        initialRegion={{
          latitude:
            (sample1.latitude + sample2.latitude + myhouse.latitude) / 3,
          longitude:
            (sample1.longitude + sample2.longitude + myhouse.longitude) / 3,
          latitudeDelta: 0.03,
          longitudeDelta: 0.04,
        }}
      >
        {markers.map((props: Markers, index) => (
          <>
            <Marker
              key={index}
              coordinate={props}
              onPress={(evt) => setClicked(!clicked)}
              description="버섯넘버"
            ></Marker>
            {/* {clicked && index && <Text>{props.name}</Text>} */}
          </>
        ))}
        {/* <Marker coordinate={myhouse} onPress={(evt) => alert("asdf")} /> */}
        <TouchableOpacity
          style={styles.touchableOpacityStyle}
        ></TouchableOpacity>
      </MapView>
      <View style={stylesheet.footer}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("ListPage")}>
            <SimpleLineIcons name="folder" size={30} color="black" />
          </TouchableOpacity>
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
            color="blue"
            onPress={() => navigation.navigate("MapPage")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,

    flex: 7,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
});
const stylesheet = StyleSheet.create({
  footer: {
    width: "100%",
    flex: 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
