import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, View, Text, Image, Dimensions, StyleSheet, ScrollView,
    KeyboardAvoidingView, TextInput, Platform, TouchableOpacity
} from 'react-native';
import { Octicons, FontAwesome, Feather } from '@expo/vector-icons';
import domtory from '../../assets/icon.png';
import { postComment } from '../../server/board'

export default function PostDetail({ data, reloadData, postId }) {
    if (!data) {
        return <View><Text>Loading...</Text></View>; // 데이터가 아직 로드되지 않았을 때 로딩 표시
    }

    // 각 이미지의 높이를 저장할 배열 상태
    const [imageHeights, setImageHeights] = useState([]);
    const screenWidth = Dimensions.get('window').width - 40;
    useEffect(() => {
        if (data && data.post_image) {
            const heights = data.post_image.map(() => 0); // 초기 높이는 0으로 설정
            data.post_image.forEach((img, index) => {
                if (!img.is_deleted) {
                    Image.getSize(img.image_url, (width, height) => {
                        const scaleFactor = width / screenWidth;
                        const imageHeight = height / scaleFactor;
                        heights[index] = imageHeight; // 계산된 높이를 저장
                        setImageHeights([...heights]); // 상태 업데이트
                    });
                }
            });
        }
    }, [data]);

    // 작성 댓글
    const [comment, setComment] = useState('');
    //const [anonymous, setAnonymous] = useState(false);

    const onChangeComment = (inputComment) => {
        setComment(inputComment);
    }

    const handleSubmit = async () => {
        const result = await postComment(postId, comment);

        if (result.success) {
            console.log('댓글이 성공적으로 작성되었습니다.');
            setComment('');
            reloadData();
        } else {
            console.error('댓글 작성에 실패했습니다:', data);
            Alert.alert('오류', '댓글 작성에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* 글내용 */}
                <View style={styles.header}>
                    <Image source={domtory} style={{ width: 45, height: 45, borderRadius: 10 }} />
                    <View style={{ flexDirection: 'column', marginLeft: 8 }}>
                        <Text style={styles.user}>{data.member}</Text>
                        <Text style={styles.date}>{data.created_at}</Text>
                    </View>
                </View>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.content}>{data.body}</Text>
                {/* 사진 */}
                {data && data.post_image && data.post_image.map((img, index) => {
                    if (!img.is_deleted) {
                        return (
                            <Image
                                key={img.id}
                                source={{ uri: img.image_url }}
                                style={{
                                    width: screenWidth,
                                    height: imageHeights[index], // 각 이미지의 높이 사용
                                    resizeMode: 'contain',
                                    borderRadius: 3,
                                    marginBottom: 10,
                                }}
                            />
                        );
                    }
                })}
                <View style={styles.comment}>
                    <Octicons name="comment" style={styles.commentIcon} />
                    <Text style={styles.commentNum}>{data.comment_cnt}</Text>
                </View>
                {/* 댓글 */}
                {data.comment && data.comment.length > 0 && (
                    <View style={styles.commentSection}>
                        {data.comment.map((comment, index) => (
                            <View key={index} style={styles.commentContainer}>
                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                    <Text style={styles.commentMember}>{comment.member}</Text>
                                    <View style={styles.commentOption}>
                                        <Octicons name="comment-discussion" style={styles.commnetReply} />
                                        <Octicons name="trash" style={styles.commnetDelete} />
                                        <Octicons name="stop" style={styles.commnetReport} />
                                    </View>
                                </View>
                                <Text style={styles.commentContent}>{comment.body}</Text>
                                <Text style={styles.commentDate}>{comment.created_at}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* 댓글 작성 */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeComment}
            >
                <View style={styles.inputBox}>
                    {/* 익명 체크박스
                    <TouchableOpacity style={styles.anonymousCheck} onPress={() => setAnonymous(!anonymous)}>
                        {anonymous ? (
                            <FontAwesome name="check-square-o" size={17} color='#ffa451' />
                        ) : (
                            <FontAwesome name="square-o" size={17} color='#848484' />
                        )}
                        <Text style={[styles.checkboxLabel, anonymous && { color: '#ffa451' }]}>익명</Text>
                    </TouchableOpacity> */}
                    {/* 댓글 입력 */}
                    <TextInput
                        placeholder="댓글을 입력하세요"
                        placeholderTextColor={'#848484'}
                        multiline={true}
                        scrollEnabled={true}
                        onChangeText={onChangeComment}
                        value={comment}
                        style={styles.commentInput}
                    />
                    {/* 작성 버튼 */}
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Feather name="edit-3" size={23} color='#ffa451' />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        marginHorizontal: 20,
        marginTop: 25,
        marginBottom: 5,
        flex: 1
    },
    // 내용
    header: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center'
    },
    user: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 2
    },
    date: {
        fontSize: 12,
        color: 'grey',
    },
    image: {
        borderRadius: 3,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 5
    },
    content: {
        fontSize: 15,
        marginBottom: 13,
    },

    // 댓글
    comment: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 3,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
    },
    commentIcon: {
        fontSize: 17,
        marginRight: 5,
        color: '#666666'
    },
    commentNum: {
        fontSize: 15,
        color: '#666666'
    },
    commentSection: {
        marginTop: 10,
    },
    commentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        paddingBottom: 8,
        marginBottom: 8,
    },
    commentMember: {
        fontSize: 16,
        fontWeight: '700'
    },
    commentContent: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    commentDate: {
        fontSize: 13,
        color: '#666666'
    },
    commentOption: {
        flexDirection: 'row',
        padding: 4,
        borderRadius: 10,
        backgroundColor: '#e0e0e06a'
    },
    commnetReply: {
        fontSize: 14,
        color: '#66666675',
        paddingHorizontal: 13,
        borderRightWidth: 1,
        borderRightColor: '#6666665e'
    },
    commnetDelete: {
        fontSize: 14,
        color: '#66666675',
        paddingHorizontal: 13,
        borderRightWidth: 1,
        borderRightColor: '#6666665e'
    },
    commnetReport: {
        fontSize: 13,
        color: '#66666675',
        paddingHorizontal: 15
    },

    // 댓글 작성
    writeComment: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%',
        paddingBottom: 70
    },
    inputBox: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15,
        backgroundColor: '#d8d8d853',
        marginTop: 3,
        marginBottom: 7,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        flex: 1,
    },
    commentInput: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 1.5,
        minHeight: 45,
        fontSize: 14,
    },
    anonymousCheck: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkboxLabel: {
        color: '#848484',
        marginBottom: 3,
        marginLeft: 4
    },
    submitButton: {
        marginRight: 3
    },
});