import * as Location from "expo-location";

export function nameToKor(name: string) {
  if (name === "enoki") {
    return "팽이버섯";
  } else if (name === "shitake") {
    return "표고버섯";
  } else if (name === "songi") {
    return "새송이버섯";
  } else if (name === "yellowegg") {
    return "노란달걀버섯";
  } else if (name === "woodear") {
    return "목이버섯";
  } else if (name === "neungi") {
    return "능이버섯";
  } else if (name === "noru") {
    return "노루궁뎅이버섯";
  } else if (name === "songe") {
    return "송이버섯";
  } else if (name === "youngji") {
    return "영지버섯";
  } else {
    return "버섯없음";
  }
}

export const expoLocation = async () => {
  //expo-location 권한요청
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }

  //현재위치데이터 받아오기
  var location = await Location.getCurrentPositionAsync({});

  //위도 경도 콘솔
  await console.log("this is latitude : " + location.coords.latitude);
  await console.log("this is longitude : " + location.coords.longitude);

  return location;
};

export const 빈결과검출 = async (im, im3) => {
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
};
