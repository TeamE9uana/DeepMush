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

export const DetailMapPage = ({ route, navigation }) => {
  const { mapData } = route.params;
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
  const [markers, setMarkers] = useState(mapData);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={"google"}
        initialRegion={{
          latitude: mapData.lat,
          longitude: mapData.lng,
          latitudeDelta: 0.03,
          longitudeDelta: 0.04,
        }}
      >
        <Marker
          coordinate={{ latitude: mapData.lat, longitude: mapData.lng }}
          onPress={(evt) => setClicked(!clicked)}
          image={require("../images/mushIcon14.png")}
          description="버섯넘버"
        />
        <TouchableOpacity
          style={styles.touchableOpacityStyle}
        ></TouchableOpacity>
      </MapView>
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
    height: Dimensions.get("window").height,
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
