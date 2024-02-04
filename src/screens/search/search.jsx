import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from "react-native";

export default function Menu() {

    const [inputText, setInputText] = useState('');

    const handleInputChange = (text) => {
        setInputText(text);
    };

    const handleButtonPress = () => {
        Alert.alert('You entered: ' + inputText);
    };


    return (
        <View style={styles.container}>
            <View style={styles.searchcontainer}>
                <TextInput
                    style={styles.searchbox}
                    placeholder="검색어를 입력하세요."
                    onChangeText={handleInputChange}
                    value={inputText}
                />
                <Text style={styles.canceltext}>취소</Text>
            </View>
        </View>
    )
        ;
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    searchcontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    searchbox: {
        height: 40,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        width: "80%",
        margin: 10,
        padding: 5,
    },
    canceltext: {
        fontSize: 15,
        width: 40,
        height: 40,
        marginTop: 20,
        marginHorizontal: 10,
    },
});
