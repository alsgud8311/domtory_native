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

// export const pickImage = async () => {
//     console.log("이미지 선택");
//     let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         quality: 1,
//         allowsMultipleSelection: true,
//     });

//     if (!result.canceled && result.assets) {
//         const formData = new FormData();

//         console.log(result.assets)

//         result.assets.forEach((asset, index) => {
//             const uri = asset.uri;
//             const fileName = asset.uri.split('/').pop();
//             const fileType = asset.mimeType;
//             formData.append("images", {
//                 uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
//                 type: fileType,
//                 name: fileName,
//             });
//         });
//         console.log(formData);

//         return formData;
//     }

//     return null;
// };

//이미지 선택
export const pickImage = async () => {
    console.log("이미지 선택");
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        allowsMultipleSelection: true,
    });

    console.log(result.assets);
    if (!result.canceled) {
        return result.assets;
    }

    return ImageData;
};
