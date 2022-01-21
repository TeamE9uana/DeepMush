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
import { Marker, Callout } from "react-native-maps";
import { useLayoutEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { SimpleLineIcons } from "@expo/vector-icons";

type Coordinate = {
  latitude: number;
  longitude: number;
};

type MapMarker = Coordinate & {
  name: string;
};

const sampleData: MapMarker[] = [
  {
    name: "sample1",
    latitude: 37.36957273223395,
    longitude: -122.02391041565818,
  },
  {
    name: "sample2",
    latitude: 37.366730031441506,
    longitude: -122.03164481984454,
  },
  {
    name: "sample3",
    latitude: 37.367875874475885,
    longitude: -122.03762870058752,
  },
];

const getLocation = (sampleData: MapMarker[]): Coordinate => {
  return sampleData.reduce(
    (cur, next) => {
      return {
        latitude: cur.latitude + next.latitude,
        longitude: cur.longitude + next.longitude,
      };
    },
    { latitude: 0, longitude: 0 }
  );
};

const initiaLocation = getLocation(sampleData);

const midLocation: Coordinate = {
  latitude: initiaLocation.latitude / sampleData.length,
  longitude: initiaLocation.longitude / sampleData.length,
};

export const MapPage = ({ route, navigation }) => {
  const { listData, currentLocation } = route.params;
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
  const [markers, setMarkers] = useState(listData);

  return (
    console.log(listData[0]),
    (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={"google"}
          initialRegion={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.04,
          }}
        >
          {markers.map((props, index) => (
            <>
              <Marker
                key={index}
                coordinate={{ latitude: props.lat, longitude: props.lng }}
                onPress={(evt) => setClicked(!clicked)}
                description={props.name}
              />
            </>
          ))}

          <Marker
            coordinate={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }}
            description="currentLocation"
            pinColor={"#21C583"}
          >
            <Callout tooltip></Callout>
          </Marker>

          <TouchableOpacity
            style={styles.touchableOpacityStyle}
          ></TouchableOpacity>
        </MapView>
        <View style={stylesheet.footer}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("ListPage")}>
              <SimpleLineIcons name="folder" size={30} color="#989898" />
            </TouchableOpacity>
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
              color="#3DD598"
              // onPress={() => navigation.navigate("MapPage")}
            />
          </View>
        </View>
      </View>
    )
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
