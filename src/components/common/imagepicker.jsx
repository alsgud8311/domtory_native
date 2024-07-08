import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Platform } from "react-native";

//라이브러리 권한 요청
export const getPhotoPermission = async () => {
  if (Platform.OS !== "web") {
    // is web or mobile?
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return false;
    } else {
      return true;
    }
  }
};

//이미지 선택
export const pickImage = async () => {
  console.log("이미지 선택");
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    aspect: [4, 4],
    //사진 수정허용
    allowsEditing: true,
    // //현재 용량 줄이고 높이기
    // quality: 1,
    //여러개 사진 선택 허용 여부
    allowsMultipleSelection: false,
  });

  if (!result.canceled) {
    console.log(result);
    const fileName = result.assets[0].uri.split("/").pop();
    const fileType = result.assets[0].mimeType;
    const uri = result.assets[0].uri;
    console.log(fileName, fileType, uri);
    return { fileName: fileName, fileType: fileType, uri: uri };
  }

  return ImageData;
};
