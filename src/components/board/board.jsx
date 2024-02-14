import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import NewPost from './newPost';
import { AntDesign } from '@expo/vector-icons';
//import { getCommunityListData } from '../../server/board';
import { getPostList } from '../../server/board';

const renderItem = ({ item }) => {
    return (
        <TouchableOpacity>
            <View style={styles.item}>
                <View style={{ flexDirection: 'column', marginBottom: 5 }}>
                    {/* 유저, 작성일 */}
                    <View style={{ flexDirection: 'row', marginBottom: 3 }}>
                        <Text style={styles.user}>{item.member}</Text>
                        <Text style={styles.date}>{item.created_at}</Text>
                    </View>
                    {/* 제목, 내용 */}
                    <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.content}>{item.content}</Text>
                    </View>
                </View>
                {/* 사진 */}
                {item.thumbnail_url && <Image source={{ uri: item.thumbnail_url }} style={styles.image} />}
            </View>
        </TouchableOpacity>
    );
};

export default function Board({ boardId }) {
    const [data, setData] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPostList(boardId);
                console.log(result);
                setData(result.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [boardId]);

    const handleOpenNewPost = () => {
        setModalVisible(true);
    };

    const handleCloseNewPost = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingVertical: 20 }}
            />
            <TouchableOpacity onPress={handleOpenNewPost} style={styles.writeButton}>
                <AntDesign name="form" size={24} color={'#fff'} />
            </TouchableOpacity>

            <NewPost isVisible={isModalVisible} onClose={handleCloseNewPost} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fff",
        flex: 1,
        paddingBottom: 65
    },
    // 글 박스
    item: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        padding: 15,
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
    date: {
        fontSize: 11,
        color: '#5a5a5a'
    },
    user: {
        fontSize: 12,
        marginRight: 5,
        color: '#5a5a5a'
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
    // 글쓰기 버튼
    writeButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 50,
        height: 50,
        borderRadius: 28,
        backgroundColor: '#ffa451',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#5a5a5a',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
});