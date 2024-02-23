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

export const pickImage = async () => {
  console.log("이미지 선택");
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    aspect: [4, 4],
    quality: 1,
    allowsMultipleSelection: true,
  });

  if (!result.canceled && result.assets) {
    console.log(result.assets);
    return result.assets;
  }

  return null;
};
