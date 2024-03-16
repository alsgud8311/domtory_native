import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform } from "react-native";

export const checkApplticationPermission = async () => {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: "돔토리 알림 허용",
          message:
            "돔토리 식단 및 커뮤니티 알림을 위해서는 알림 허용이 필요합니다.",
        }
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("안드로이드 알림 허용 상태");
      } else {
        console.log("안드로이드 알림 비허용 상태");
      }
    } catch (error) {}
  }
};
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
    return { AuthorizationSuccess: authStatus };
  } else {
    console.log("Authorization failed");
    return { AuthorizationSuccess: authStatus };
  }
};
