import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Button,
} from "react-native";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { getStatusBarHeight } from "react-native-status-bar-height";
import axios from "axios";
import "localstorage-polyfill";
import Spinner from "react-native-loading-spinner-overlay";
import { string } from "yargs";
import { ListPage } from "./ListPage";

import { ExifParserFactory } from "ts-exif-parser";
import * as Location from "expo-location";

let cameraFace = "back";

export const ExpoCameraPage = ({ navigation }: any) => {
  var token = localStorage.getItem("access_token");

  let camera: Camera;

  let location = null;
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [fMode, setFMode] = useState("off");
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);

  // expo-location
  const expoLocation = async () => {
    //expo-location 권한요청
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    //현재위치데이터 받아오기
    location = await Location.getCurrentPositionAsync({});

    //위도 경도 콘솔
    await console.log(location.coords.latitude);
    await console.log(location.coords.longitude);
  };

  // Gets permission from user to use camera
  const handleStartCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied. Camera requires user permission.");
    }
  };

  useEffect(() => {
    if (startCamera == false) {
      handleStartCamera();
    }
  });

  // Takes photo, saves it to variable, and opens preview
  const handleTakePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({ exif: true });
    console.log(JSON.stringify(photo));
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  // Saves the image to the file system
  const handleSaveImage = async () => {
    let newUri = "";
    let image = capturedImage.uri;
    const fileName = image.split("/").pop();
    newUri = FileSystem.documentDirectory + fileName;

    await expoLocation();

    try {
      await FileSystem.moveAsync({ from: image, to: newUri });
      setPreviewVisible(false);
      setCapturedImage(null);

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);
      myHeaders.append("Content-Type", "multipart/form-data");

      var formdata = new FormData();
      console.log(newUri);

      formdata.append("mushroom_image", {
        name: "mush01.jpg",
        type: "image/jpeg",
        uri: newUri,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      setLoading(true);

      await fetch("https://backend.deepmush.io/images/", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .then(void console.log("upload success!!"))
        .catch((error) => console.log("error", error));

      setLoading(false);

      await console.log(Data);
    } catch (err) {
      throw new Error("File could not be saved.");
    }
  };

  // Reset image and allow user to retake photo
  const handleRetakeImage = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  // Change flash on or off
  const handleFlashMode = () => {
    if (fMode === "off") {
      setFMode("on");
      setFlashMode(Camera.Constants.FlashMode.on);
    } else {
      setFMode("off");
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  // Switch between front and back cameras
  const handleSwitchCamera = () => {
    if (cameraFace === "back") {
      setCameraType(Camera.Constants.Type.front);
      cameraFace = "front";
    } else {
      setCameraType(Camera.Constants.Type.back);
      cameraFace = "back";
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowEditing: true,
      aspect: [1, 1],
      quality: 1,
      exif: true,
    });

    if (!result.cancelled) {
      //setImage(result.uri);
      // 현재 사용자가 불러온 이미지 리스트들 => 각각 폼데이터에 넣어준다.

      await expoLocation();

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);
      myHeaders.append("Content-Type", "multipart/form-data");

      var formdata = new FormData();
      console.log(result.uri);

      formdata.append("mushroom_image", {
        name: "mush1.jpg",
        type: "image/jpg",
        uri: result.uri,
        //uri: "/Users/gimjunhyeong/expo-practice/DeepMush/frontend/src/images/mush.jpeg", //local images 폴더안에 있는 경로 , expo로 모바일상의 경로는 file:// 로 시작한다 . 따라서 에러가 발생했었음 현재 서버가 쿠버네틱스로 옮겨지고 있기에 localhost에서는 테스트 불가능 ,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      setLoading(true);

      fetch("https://backend.deepmush.io/images/", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent={"Loading..."} />
      <View style={styles.cameraContainer}>
        {previewVisible && capturedImage ? (
          <CameraPreview
            photo={capturedImage}
            saveImage={handleSaveImage}
            retakeImage={handleRetakeImage}
          />
        ) : (
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={{ flex: 1 }}
            autoFocus="on"
            ref={(ref) => {
              camera = ref;
            }}
          >
            <View style={styles.cameraHeader}>
              <View style={{ marginTop: 0 }}>
                <Text style={styles.flashText}>{fMode}</Text>

                <TouchableOpacity
                  onPress={handleFlashMode}
                  style={styles.flashStyles}
                >
                  <Text style={{ fontSize: 15 }}>⚡️</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginLeft: 70,
                    marginRight: 70,
                  }}
                >
                  deepmush
                </Text>
              </View>

              <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: "white", fontSize: 20 }}>✖</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.cameraBtnContainer}>
              <View style={styles.pictureBtnContainer}>
                <View style={styles.pictureBtnWrapper}>
                  <View>
                    <TouchableOpacity
                      onPress={() => pickImage()}
                      style={previewStyles.albumContainer}
                    >
                      <Text style={previewStyles.btnText}>앨범</Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={handleTakePicture}
                      style={styles.pictureBtn}
                    />
                  </View>

                  <View style={{ marginBottom: 10 }}>
                    <TouchableOpacity
                      onPress={handleSwitchCamera}
                      style={styles.switchStyles}
                    >
                      <Text style={{ fontSize: 20 }}>↺</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Camera>
        )}
      </View>

      <StatusBar style="auto" />
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
  cameraContainer: {
    flex: 1,
    width: "100%",
  },
  cameraBtnContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  flashText: {
    color: "white",
    height: 8,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 8,
  },
  modeBtnContainer: {
    position: "absolute",
    left: "5%",
    top: "10%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  flashStyles: {
    borderRadius: 5,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  switchStyles: {
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 5,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  pictureBtnContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
  },
  pictureBtnWrapper: {
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pictureBtn: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    borderWidth: 12,
    backgroundColor: "#fff",
  },
  frontBtnContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  frontBtn: {
    width: 130,
    borderRadius: 4,
    backgroundColor: "#14274e",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  frontBtnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  cameraHeader: {
    marginTop: getStatusBarHeight(),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

// Image preview section
const CameraPreview = ({ photo, retakeImage, saveImage }: any) => {
  console.log(photo);

  return (
    <View style={previewStyles.container}>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={previewStyles.background}
      >
        <View style={previewStyles.imageView}>
          <View style={previewStyles.imageStyles}>
            <TouchableOpacity
              onPress={retakeImage}
              style={previewStyles.btnContainer}
            >
              <Text style={previewStyles.btnText}>다시 찍기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={saveImage}
              style={previewStyles.btnContainer}
            >
              <Text style={previewStyles.btnText}>버섯 검색</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const previewStyles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  background: {
    flex: 1,
  },
  imageView: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  imageStyles: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnContainer: {
    width: 90,
    height: 40,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(52, 52, 52, 0.8)",

    justifyContent: "center",
  },

  albumContainer: {
    width: 50,
    height: 40,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "rgba(52, 52, 52, 0.8)",

    justifyContent: "center",
  },

  btnText: {
    color: "white",
    fontSize: 15,
  },
});
