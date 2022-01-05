import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Marker } from "react-native-maps";
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

export default function MapPage() {
  //   const [pointList, setPointList] = useState([]);
  // [
  //   {
  //     name
  //     latitude
  //     longitude
  //   },
  //   {
  //     name
  //     latitude
  //     longitude
  //   },
  //   {
  //     name
  //     latitude
  //     longitude
  //   },
  // ]

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
        <Marker coordinate={sample2} />
        <Marker coordinate={myhouse} />
        <Marker coordinate={sample1} />
      </MapView>
    </View>
  );
}

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
});
