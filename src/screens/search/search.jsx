import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    Keyboard,
    Image,
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { getSearhedData } from "../../server/search";


const renderItem = ({ item }) => {
    return (
        <View style={styles.postbox}>
            <View>
                <Text style={styles.board}>자유게시판</Text>
                <Text style={styles.name}>익명 | {item.created_at}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.comment}>
                    <View style={styles.commenticon}>
                        <FontAwesomeIcon size={15} color="#ffcc99" paddingTop='10' icon={faComment} />
                    </View>
                    <Text>3</Text>
                </View>
            </View>
            <Image
                source={{uri: item.thumbnail_url}} // Replace with the path to your image
                style={styles.image}
            />
        </View>
    )
};


export default function Search() {

    const [inputText, setInputText] = useState('');

    const handleInputChange = (text) => {
        setInputText(text);
    };

    const hideKeyboard = () => {
        Keyboard.dismiss();
        setInputText('');
    };

    const [data, setData] = useState(null)

    const handleSearch = async () => {
        try {
            const searchData = await getSearhedData(0);
            setData(searchData);
            console.log(searchData);
        } catch (error) {
            console.error('Error occurred while fetching data:', error);
        }
    };



    return (
        <View style={styles.container}>
            <View style={styles.searchcontainer}>
                <TextInput
                    style={styles.searchbox}
                    placeholder="검색어를 입력하세요."
                    onChangeText={handleInputChange}
                    value={inputText}
                    onSubmitEditing={() => handleSearch("lostandfound")}
                />
                <TouchableOpacity onPress={hideKeyboard}>
                    <Text style={styles.canceltext}>취소</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
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
        borderBottomColor: "#f0f0f0",
        borderStyle: "solid",
        borderBottomWidth: 1,
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
    postbox: {
        borderBottomColor: "#f0f0f0",
        borderStyle: "solid",
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    board: {
        color: "orange",
    },
    name: {
        fontSize: 13,
        paddingTop: 5,
    },
    title: {
        fontSize: 15,
        paddingTop: 3,
    },
    comment: {
        flexDirection: "row",
        paddingTop: 5,
    },
    commenticon: {
        paddingTop: 1,
        paddingRight: 4,
    },
    image: {
        width: 100,
        height: "100%",
        borderRadius: 5,
    }
});
