import React, { useState } from 'react';
import {
    View, TextInput, Button, TouchableWithoutFeedback,
    Keyboard, StyleSheet, TouchableOpacity, Text, ScrollView,
    Alert
} from 'react-native';
import { AntDesign, Feather } from "@expo/vector-icons";
import { postMessage } from '../../server/message';

const SendMessage = ({ onClose }) => {
    const [content, setContent] = useState("");
    const [isContentFocused, setIsContentFocused] = useState(false);

    const onChangeContent = (inputContent) => {
        setContent(inputContent);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleCancel = () => {
        Alert.alert(
            '쪽지 보내기',
            '쪽지 보내기를 취소하시겠습니까?',
            [
                {
                    text: '취소',
                    style: 'cancel',
                },
                {
                    text: '확인',
                    onPress: onClose,
                },
            ],
            { cancelable: false }
        );
    };

    // const handleSendMessage = async () => {
    //     try {
    //         const response = await postMessage(userId, { body: content });
    //         if (response.success) {
    //             console.log("메시지 전송 성공");
    //         } else {
    //             console.error("메시지 전송 실패:", response.data);
    //         }
    //     } catch (error) {
    //         console.error("메시지 전송 오류:", error);
    //     }
    // };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.modal}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleCancel}>
                        <AntDesign name="close" size={22} />
                    </TouchableOpacity>
                    <Text style={styles.headerText} 
                    //onPress={handleSendMessage}
                    >
                        쪽지 보내기
                    </Text>
                    <Feather name="send" style={styles.sendIcon} />
                </View>
                <TouchableWithoutFeedback onPress={dismissKeyboard} style={styles.contentContainer}>
                    <TextInput
                        spellCheck={false}
                        autoCorrect={false}
                        style={isContentFocused ? styles.focused : styles.inputContent}
                        onFocus={() => setIsContentFocused(true)}
                        onBlur={() => setIsContentFocused(false)}
                        selectionColor="#ffa551dc"
                        onChangeText={onChangeContent}
                        value={content}
                        placeholder={"내용"}
                        placeholderTextColor={"#959595"}
                        multiline={true}
                    />
                </TouchableWithoutFeedback>
            </ScrollView>
        </View>
    );
};

const baseInputContent = {
    margin: 10,
    marginTop: 0,
    padding: 12,
    paddingTop: 14,
    borderWidth: 2.5,
    borderRadius: 20,
    minHeight: 350,
    fontSize: 16,
    borderColor: "#86868645",
    textAlignVertical: "top",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    modal: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        padding: 15,
        borderRadius: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        marginBottom: 15,
        marginHorizontal: 5
    },
    headerText: {
        textAlign: "center",
        flex: 1,
        fontSize: 18,
        fontWeight: "700",
        color: "#333333",
    },
    sendIcon: {
        fontSize: 24,
        paddingTop: 10,
    },
    contentContainer: {
        marginTop: 10,
    },
    focused: {
        ...baseInputContent,
        borderColor: "#ff910097",
    },
    inputContent: {
        ...baseInputContent,
    },
});

export default SendMessage;
