var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Platform } from "react-native";
//라이브러리 권한 요청
export const getPhotoPermission = () => __awaiter(void 0, void 0, void 0, function* () {
    if (Platform.OS !== "web") {
        // is web or mobile?
        const { status } = yield ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            return false;
        }
        else {
            return true;
        }
    }
});
//이미지 선택
export const pickImage = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("이미지 선택");
    let result = yield ImagePicker.launchImageLibraryAsync({
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
});
