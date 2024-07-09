import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Platform } from "react-native";

export const stackscreenOptions = (
  darkmode: boolean
): NativeStackNavigationOptions => {
  return {
    headerShown: true,
    headerStyle: {
      backgroundColor: darkmode ? "black" : "white",
      ...Platform.select({
        android: {
          elevation: 0,
        },
      }),
    },
    headerTintColor: darkmode ? "white" : "black",
  };
};

export const stackScreenOptionsWithTitle = (
  darkmode: boolean
): NativeStackNavigationOptions => {
  return {
    headerShown: true,
    headerStyle: {
      backgroundColor: darkmode ? "black" : "white",
      ...Platform.select({
        android: {
          elevation: 0,
        },
      }),
    },
    headerTintColor: darkmode ? "white" : "black",
  };
};
