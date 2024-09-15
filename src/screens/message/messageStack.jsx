import React from "react";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { stackscreenOptions } from "../../constants/screenoptions";
import Message from "./message";
import MessageDetail from "./messageDetail";
import { Feather, FontAwesome, Octicons } from "@expo/vector-icons";
import { useColorStore } from "../../store/colorstore";
import { MessageHeader } from "../../components/message/messageHeader";

const MessageStack = () => {
  const Stack = createNativeStackNavigator();
  const darkmode = useColorStore((state) => state.darkmode);

  return (
    <Stack.Navigator
      initialRouteName="쪽지"
      screenOptions={stackscreenOptions(darkmode)}
    >
      <Stack.Screen name="쪽지" component={Message} />
      <Stack.Screen
        name="쪽지방"
        component={MessageDetail}
        options={({ navigation, route }) => ({
          headerBackVisible: true,
          headerRight: () => {
            return <MessageHeader navigation={navigation} route={route} />;
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default MessageStack;
