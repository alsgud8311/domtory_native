import React from 'react';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stackscreenOptions } from '../../constants/screenoptions';
import Message from './message';
import MessageDetail from './messageDetail';
import { Feather } from "@expo/vector-icons";

const MessageStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="쪽지" screenOptions={stackscreenOptions}>
            <Stack.Screen name="쪽지" component={Message} />
            <Stack.Screen 
                name="쪽지방" 
                component={MessageDetail} 
                options={({ navigation }) => ({
                    headerBackVisible: true,
                    headerRight: () => (
                        <Feather onPress={() => navigation.setParams({ showModal: true })} 
                        name="send" size={24} style={{ paddingTop: 8, paddingRight: 5 }} />
                    ),
                })}
            />
        </Stack.Navigator>
    );
};

export default MessageStack;