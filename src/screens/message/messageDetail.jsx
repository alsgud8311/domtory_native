import React, { useEffect, useState } from "react";
import { ImageBackground, View, StyleSheet, Text, SafeAreaView, FlatList, Dimensions, 
    RefreshControl, Platform, Modal } from "react-native";
import { getMessageDetail, patchReadMessage, getMessageInfo } from "../../server/message";
import img from '../../assets/messageBackground.png';
import SendMessage from "../../components/message/sendMessage"

export default function MessageDetail({ route, navigation }) {
    const { messageId, showModal } = route.params || {};
    const [messageDetail, setMessageDetail] = useState([]);
    const [messageInfo, setMessageInfo] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    console.log(messageId)

    const [isModalVisible, setModalVisible] = useState(showModal || false);    
    useEffect(() => {
        if (showModal) {
            setModalVisible(true);
            navigation.setParams({ showModal: false });
        }
    }, [showModal]);

    const handleCloseNewPost = () => {
        setModalVisible(false);
        fetchMessageDetail();
    };

    const fetchMessageDetail = async () => {
        try {
            const response = await getMessageDetail(messageId);
            if (response.success) {
                setMessageDetail(response.data);
                console.log(response.data);
            } else {
                console.error("Failed to fetch message list:", response.data);
            }
        } catch (error) {
            console.error("Failed to fetch message list:", error);
        } finally {
            setRefreshing(false);
        }
    };

    const fetchMessageInfo = async () => {
        try {
            const response = await getMessageInfo(messageId);
            if (response.success) {
                setMessageInfo(response.data);
                console.log(response.data);
            } else {
                console.error("Failed to fetch message list:", response.data);
            }
        } catch (error) {
            console.error("Failed to fetch message list:", error);
        } finally {
            setRefreshing(false);
        }
    };

    console.log(messageInfo)

    useEffect(() => {
        fetchMessageDetail();
        fetchMessageInfo();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchMessageDetail();
    };

    useEffect(() => {
        patchReadMessage(9)
            .then(response => {
                if (response.success) {
                    console.log("메시지 읽음 처리 성공");
                } else {
                    console.error("메시지 읽음 처리 실패:", response.data);
                }
            })
            .catch(error => {
                console.error("메시지 읽음 처리 오류:", error);
            });
    }, [messageId]);

    const renderItem = ({ item }) => (
        <>
            {!item.is_received && (
                <View style={styles.sentContainer}>
                    <View style={styles.timestampContainer}>
                        <Text style={styles.readStatus}>{item.is_read ? '' : '안 읽음'}</Text>
                        <Text style={styles.timestamp}>{item.created_at}</Text>
                    </View>
                    <View style={styles.sentBubble}>
                        <Text style={styles.message}>{item.body}</Text>
                    </View>
                </View>
            )}
            {item.is_received && (
                <View style={styles.receivedContainer}>
                    <View style={styles.receivedBubble}>
                        <Text style={styles.message}>{item.body}</Text>
                    </View>
                    <Text style={styles.timestamp}>{item.created_at}</Text>
                </View>
            )}
        </>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={img} resizeMode="cover" style={styles.image}>
                <View style={styles.info}>
                    <Text style={styles.infoText}>해당 쪽지는 {messageInfo.board}의 "{messageInfo.post_title}" 이라는 글에서 시작된 쪽지입니다.</Text>
                </View>
                <FlatList
                    data={messageDetail}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
                />
            </ImageBackground>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={handleCloseNewPost}
            >
                <View style={styles.modalView}>
                    <SendMessage onClose={handleCloseNewPost} roomId={messageId}/>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#f8f8f8",
        flex: 1,
        marginBottom: 65,
        paddingTop: 10,
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    info: {
        marginHorizontal: 25,
        marginBottom: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#9b9b9bdc'
    },
    infoText: {
        color: '#797979dc',
        paddingHorizontal: 4
    },
    receivedContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'flex-end',
        paddingHorizontal: 15,
        paddingVertical: 11,
    },
    sentContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 15,
        paddingVertical: 11,
    },
    receivedBubble: {
        backgroundColor: "#eff1f5d5",
        borderRadius: 15,
        padding: 9,
        marginRight: 3,
        maxWidth: windowWidth * 0.6,
    },
    sentBubble: {
        backgroundColor: "#ffd1a6a0",
        borderRadius: 15,
        padding: 9,
        marginLeft: 3,
        maxWidth: windowWidth * 0.7,
    },
    message: {
        fontSize: 13
    },
    timestamp: {
        fontSize: 10,
        color: '#999999',
        marginTop: 3
    },
    readStatus: {
        fontSize: 11,
        color: '#999999',
        marginTop: 3
    },
    sendMessage: {
        flexDirection: "row",
        backgroundColor: "#f8f8f8",
        width: "100%",
        marginBottom: 10,
    },
    inputBox: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#f8f8f8",
        borderRadius: 15,
        backgroundColor: "#d1d1d16a",
        marginTop: 3,
        marginBottom: 5,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        alignItems: "center",
        gap: 10,
        flex: 1,
    },
    sendMessageText: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 15 : 0,
        paddingHorizontal: 10,
        paddingBottom: 1.5,
        minHeight: 45,
        fontSize: 14,
    },
    submitButton: {
        marginRight: 3,
    },
    modalView: {
        flex: 1,
    },
});