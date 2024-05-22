import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Platform } from "react-native";

export const stackscreenOptions = {
  headerShowLabel: false,
  headerShown: true,
  headerStyle: {
    elevation: 0,
    shadowColor: "transparent",
  },
  headerTintColor: "black",
};

export const stackScreenOptionsWithTitle: NativeStackNavigationOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: "transparent",
    ...Platform.select({
      android: {
        elevation: 0,
      },
    }),
  },
  headerTintColor: "black",
};
