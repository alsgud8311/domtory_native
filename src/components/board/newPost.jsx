import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Feather, Entypo } from '@expo/vector-icons';

export default function Board() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')

    const onChangeTitle = (inputTitle) => {
        setTitle(inputTitle);
    }
    const onChangeContent = (inputContent) => {
        setContent(inputContent);
    }

    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isContentFocused, setIsContentFocused] = useState(false);

    const isButtonDisabled = title.trim() === '' || content.trim() === '';

    // 키보드 내리는 함수
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.container}>
                    <TextInput
                        style={isTitleFocused ? styles.inputFocused : styles.input}
                        onFocus={() => setIsTitleFocused(true)}
                        onBlur={() => setIsTitleFocused(false)}
                        selectionColor='#ffa551dc'
                        onChangeText={onChangeTitle}
                        value={title}
                        placeholder={'제목'}
                        multiline={true}
                    />
                    <TextInput
                        style={isContentFocused ? styles.focused : styles.inputContent}
                        onFocus={() => setIsContentFocused(true)}
                        onBlur={() => setIsContentFocused(false)}
                        selectionColor='#ffa551dc'
                        onChangeText={onChangeContent}
                        value={content}
                        placeholder={'내용'}
                        multiline={true}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity>
                            <Entypo name="camera" style={styles.camera} />
                        </TouchableOpacity>
                        <TouchableOpacity disabled={isButtonDisabled} style={styles.button} onPress={() => Alert.alert('Button pressed')}>
                            <Text style={styles.buttonText}>완료</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        padding: 15,
    },
    inputFocused: {
        margin: 10,
        marginBottom: 6,
        padding: 13,
        paddingTop: 10,
        borderWidth: 2.5,
        borderColor: '#ff910097',
        borderRadius: 15,
        minHeight: 42,
        fontSize: 18,
    },
    input: {
        margin: 10,
        marginBottom: 6,
        padding: 13,
        paddingTop: 10,
        borderWidth: 2.5,
        borderColor: '#86868645',
        borderRadius: 15,
        minHeight: 42,
        fontSize: 18,
    },
    focused: {
        margin: 10,
        marginTop: 0,
        padding: 13,
        paddingTop: 15,
        borderWidth: 2.5,
        borderColor: '#ff910097',
        borderRadius: 20,
        minHeight: 350,
        fontSize: 16,
        backgroundColor: "rgba(255, 255, 255, 0.041)",
    },
    inputContent: {
        margin: 10,
        marginTop: 0,
        padding: 13,
        paddingTop: 15,
        borderWidth: 2.5,
        borderColor: '#86868645',
        borderRadius: 20,
        minHeight: 350,
        fontSize: 16,
        backgroundColor: "rgba(255, 255, 255, 0.041)",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15,
        backgroundColor: '#ffa451',
        width: 90,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff'
    },
    camera: {
        marginHorizontal: 10,
        marginTop: 3,
        fontSize: 33,
        color: '#686868'
    }
});
