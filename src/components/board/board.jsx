import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import NewPost from './newPost';
import { AntDesign } from '@expo/vector-icons';
import { getPostList } from '../../server/board';


export default function Board({ boardId, navigation }) {
    const [data, setData] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [refreshFlag, setRefreshFlag] = useState(false);

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
    }, [boardId, refreshFlag]);

    const handleOpenNewPost = () => {
        setModalVisible(true);
    };

    const handleCloseNewPost = () => {
        setModalVisible(false);
    };

    const handleNewPostSubmit = () => {
        setRefreshFlag(!refreshFlag);
    };

    const renderItem = ({ item }) => {
        const navigateToDetailScreen = () => {
            let screenName;
            switch (boardId) {
                case 1:
                    screenName = "자유 게시판";
                    break;
                case 2:
                    screenName = "중고거래게시판";
                    break;
                case 3:
                    screenName = "취준생게시판";
                    break;
                case 4:
                    screenName = "번개모임게시판";
                    break;
                case 5:
                    screenName = "분실물게시판";
                    break;
                default:
                    screenName = "일치하는 게시판 없음";
            }

            if (screenName !== "일치하는 게시판 없음") {
                navigation.navigate(screenName, { postId: item.id });
            } else {
                // 게시판이 일치하지 않는 경우의 처리 로직
            }
        }

        return (
            <TouchableOpacity onPress={navigateToDetailScreen}>
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

            <NewPost isVisible={isModalVisible} onClose={handleCloseNewPost} boardId={boardId} onPostSubmit={handleNewPostSubmit} />
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
        bottom: 90,
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