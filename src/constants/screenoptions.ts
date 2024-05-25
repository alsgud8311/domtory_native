import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Platform } from "react-native";

export const stackscreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: "white",
    ...Platform.select({
      android: {
        elevation: 0,
      },
    }),
  },
  headerTintColor: "black",
};

export const stackScreenOptionsWithTitle: NativeStackNavigationOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: "white",
    ...Platform.select({
      android: {
        elevation: 0,
      },
    }),
  },
  headerTintColor: "black",
};
