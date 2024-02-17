import React, { useState, useRef } from "react";
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity, View, Modal, StyleSheet, Text, Animated, Easing, TouchableWithoutFeedback, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { handleReport } from "../board/postDetail";

const PopupMenu = () => {
    const route = useRoute();
    const { postId } = route.params;

    const [visible, setVisible] = useState(false);
    const scale = useRef(new Animated.Value(0)).current;
    const options = [
        {
            title: '게시글 수정',
            action: () => Alert.alert(
                '게시글 수정',
                '게시글을 수정하시겠습니까?',
                [
                    {
                        text: '취소',
                        style: 'cancel',
                    },
                    {
                        text: '예', onPress: () => console.log('게시글 수정 시작')
                    },
                ],
                { cancelable: false } // Android에서 백 버튼을 눌렀을 때 대화 상자가 닫히지 않도록 설정
            ),
        },
        {
            title: '게시글 신고',
            action: () => Alert.alert(
                '게시글 신고',
                '게시글을 신고하시겠습니까?',
                [
                    {
                        text: '취소',
                        style: 'cancel',
                    },
                    {
                        text: '예', onPress: () => handleReport('post', postId)
                    },
                ],
                { cancelable: false }
            ),
        },
    ];
    function resizeBox(to) {
        to === 1 && setVisible(true);
        Animated.timing(scale, {
            toValue: to,
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear,
        }).start(() => to === 0 && setVisible(false));
    }
    return (
        <>
            <TouchableOpacity onPress={() => resizeBox(1)}>
                <Entypo name="dots-three-vertical" size={20} color="black" />
            </TouchableOpacity>
            <Modal transparent visible={visible}>
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Animated.View style={[styles.popup, { transform: [{ scale }] }]}>
                            {options.map((op, i) => (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => {
                                        op.action();
                                        setVisible(false); // 옵션 선택 시 모달 닫기 추가
                                    }}
                                    style={{
                                        borderBottomWidth: i === options.length - 1 ? 0 : 1,
                                        borderBottomColor: '#d9d9d9',
                                        padding: 7,
                                        paddingHorizontal: 15,
                                    }}
                                >
                                    <Text style={styles.title}>{op.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    popup: {
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        position: 'absolute',
        top: 45,
        right: 20,
        // iOS용 그림자 스타일
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Android용 그림자 스타일
        elevation: 5,
    },
    title: {
        fontSize: 14,
    }
})

export default PopupMenu;