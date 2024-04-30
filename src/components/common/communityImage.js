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
export const pickImage = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("이미지 선택");
    let result = yield ImagePicker.launchImageLibraryAsync({
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
});
