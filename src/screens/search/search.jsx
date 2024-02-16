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

    const Boardname = {
        1 : "자유 게시판",
        2 : "중고거래 게시판",
        3 : "취준생 게시판",
        4 : "번개 게시판",
        5 : "분실물 게시판",
        6 : "자율회 공지사항"
    }

    return (
        <TouchableOpacity >
            <View style={styles.item}>
                <View style={{ flexDirection: 'column', marginBottom: 5 }}>
                    <View>
                        <Text style={styles.board}>{Boardname[item.board]}</Text>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.content}>{item.body}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 7, height: 15 }}>
                        <Text style={styles.user}>{item.member}</Text>
                        <Text style={styles.date}>{item.created_at}</Text>
                    </View>
                </View>
                {item.thumbnail_url && <Image source={{ uri: item.thumbnail_url }} style={styles.image} />}
            </View>
        </TouchableOpacity>
    )
};


export default function Search({route}) {

    const { board } = route.params;

    const Boardname = {
        "전체": 0,
        "자유 게시판": 1,
        "중고거래 게시판": 2,
        "취준생 게시판": 3,
        "번개 게시판": 4,
        "분실물 게시판": 5,
    }

    const [inputText, setInputText] = useState('')
    const [inputList, setInputList] = useState([])

    const handleInputChange = (text) => {
        setInputText(text)
        const list = text.split(' ');
        // console.log(list)
        setInputList(list);  
    };

    const hideKeyboard = () => {
        Keyboard.dismiss();
        setInputText('');
    };

    const [data, setData] = useState(null)

    const handleSearch = async () => {
        try {
            const searchData = await getSearhedData(inputList, Boardname[board]);
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
                    onSubmitEditing={() => handleSearch()}
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
    item: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        padding: 15,
        paddingBottom: 10,
        marginVertical: 6,
        marginHorizontal: 10,
        shadowColor: "#5a5a5a",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.13,
        shadowRadius: 8,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    board: {
        fontSize: 13,
        color: "orange",
        paddingBottom: 5,
    },
    date: {
        fontSize: 11,
        color: '#5a5a5a'
    },
    user: {
        fontSize: 12,
        marginRight: 5,
        paddingRight: 5,
        color: '#5a5a5a',
        borderRightWidth: 1,
        borderRightColor: '#5a5a5abf'
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 2.5
    },
    content: {
        fontSize: 14,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5
    },
});

