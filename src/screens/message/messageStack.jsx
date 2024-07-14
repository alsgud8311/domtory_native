import React from "react";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { stackscreenOptions } from "../../constants/screenoptions";
import Message from "./message";
import MessageDetail from "./messageDetail";
import { Feather } from "@expo/vector-icons";
import { useColorStore } from "../../store/colorstore";

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
        options={({ navigation }) => ({
          headerBackVisible: true,
          headerRight: () => (
            <Feather
              onPress={() => navigation.setParams({ showModal: true })}
              name="send"
              size={24}
              color={darkmode ? "white" : "black"}
              style={{
                paddingTop: 8,
                paddingRight: 5,
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MessageStack;
