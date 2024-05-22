import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity, Dimensions, RefreshControl, Alert } from "react-native";
import { getMessageList, deleteMessage, blockMessage } from "../../server/message";
import Swipeable from "react-native-swipeable-row";

export default function MessageList({ navigation }) {
    const [messageDetail, setMessageDetail] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    // useEffect(() => {
    //     fetchMessageDetail();
    // }, []);

    // const fetchMessageDetail = async () => {
    //     try {
    //         const response = await getMessageDetail();
    //         if (response.success) {
    //             setMessageDetail(response.data);
    //         } else {
    //             console.error("Failed to fetch message list:", response.data);
    //         }
    //     } catch (error) {
    //         console.error("Failed to fetch message list:", error);
    //     } finally {
    //         setRefreshing(false);
    //     }
    // };

    // const handleRefresh = () => {
    //     setRefreshing(true);
    //     fetchMessageDetail();
    // };

    const dummyData = [
        {
            id: '1',
            send_id: 242,
            recv_id: 1,
            body: '안녕하세요.zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
            created_at: '24/04/30 09:00',
            is_read: false,
            is_received: true,
            message_cnt: 1
        },
        {
            id: '2',
            send_id: 242,
            recv_id: 1,
            body: '하이',
            created_at: '24/04/30 09:10',
            is_read: true,
            is_received: false
        },
        {
            id: '3',
            send_id: 242,
            recv_id: 1,
            body: '안녕안녕ㅇㅇㅇㅇ',
            created_at: '24/04/30 09:20',
            is_read: false,
            is_received: true,
            message_cnt: 2
        },
        {
            id: '4',
            send_id: 242,
            recv_id: 1,
            body: '반갑',
            created_at: '24/04/30 09:20',
            is_read: false,
            is_received: false
        }
    ];

    const renderItem = ({ item }) => {
        return (
            <Swipeable
                rightButtons={[
                    <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
                        <Text style={styles.buttonText}>삭제</Text>
                    </TouchableOpacity>,
                    <TouchableOpacity style={styles.blockButton} onPress={() => confirmBlock(item.id, item.send_id, item.recv_id)}>
                        <Text style={styles.buttonText}>차단</Text>
                    </TouchableOpacity>
                ]}
            >
                <TouchableOpacity style={styles.listItem} onPress={() => {
                    navigation.navigate('쪽지방', { messageId: item.id });
                }}>
                    <View>
                        <Text style={styles.name}>익명의 도토리</Text>
                        <Text style={styles.content} ellipsizeMode="tail" numberOfLines={1}>
                            {item.body}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.timestamp}>{item.created_at}</Text>
                        {item.is_received && !item.is_read && (
                            <Text style={styles.unreadMessageCnt}>+ {item.message_cnt}</Text>
                        )}
                    </View>
                </TouchableOpacity>
            </Swipeable>
        )
    };

    const confirmDelete = (id) => {
        Alert.alert(
            "쪽지 삭제",
            "쪽지를 삭제하시겠습니까?",
            [
                {
                    text: "취소",
                    style: "cancel",
                },
                {
                    text: "예",
                    onPress: () => handleDelete(id),
                },
            ],
            { cancelable: false }
        );
    };

    const handleDelete = async (id) => {
        const { success } = await deleteMessage(id);
        if (success) {
            Alert.alert("쪽지가 삭제되었습니다.");
            reloadData();
        } else {
            console.error("쪽지 삭제에 실패했습니다:", result.data);
            Alert.alert("쪽지 삭제에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const confirmBlock = (id, req_id, tar_id) => {
        Alert.alert(
            "상대방 차단",
            "해당 쪽지의 상대방을 차단하시겠습니까?",
            [
                {
                    text: "취소",
                    style: "cancel",
                },
                {
                    text: "예",
                    onPress: () => handleBlock(id, req_id, tar_id),
                },
            ],
            { cancelable: false }
        );
    };

    const handleBlock = async (id, req_id, tar_id) => {
        const { success } = await blockMessage(id, req_id, tar_id);
        if (success) {
            Alert.alert("해당 쪽지 상대방이 차단되었습니다.");
        } else {
            console.error("차단에 실패했습니다:", result.data);
            Alert.alert("차단에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={dummyData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            // refreshControl={
            //     <RefreshControl
            //         refreshing={refreshing}
            //         onRefresh={handleRefresh}
            //     />
            // }
            />
        </SafeAreaView>
    );
}

const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "white",
        flex: 1,
        marginBottom: 65
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc8b',
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 13,
        marginTop: 5,
        width: windowWidth * 0.63,
    },
    timestamp: {
        fontSize: 11,
        color: '#999999',
        marginTop: 5,
    },
    unreadMessageCnt: {
        backgroundColor: '#ffb46e',
        color: '#fff',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#fff',
        marginTop: 4,
        paddingHorizontal: 8
    },
    deleteButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff5f5f',
        width: windowWidth * 0.2,
    },
    blockButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cacaca',
        width: windowWidth * 0.2,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
    },
});