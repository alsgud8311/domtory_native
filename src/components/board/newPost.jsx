import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { pickImage, getPhotoPermission } from '../../components/common/communityImage';
import { writePost } from '../../server/board'

export default function NewPost({ isVisible, onClose, boardId, onPostSubmit }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')
    const [image, setImage] = useState([]);

    const onChangeTitle = (inputTitle) => {
        setTitle(inputTitle);
    }
    const onChangeContent = (inputContent) => {
        setContent(inputContent);
    }

    const onPressPhoto = async () => {
        const permission = await getPhotoPermission();
        if (!permission) {
            Alert.alert(
                "사진을 업로드하기 위해서는 사진 접근 권한을 허용해야 합니다"
            );
            return;
        }
        const imageData = await pickImage();
        if (!imageData) {
            console.log("Image picking was failed");
            return;
        }
        setImage(imageData);
        //\\console.log(image);
    };

    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isContentFocused, setIsContentFocused] = useState(false);

    const isButtonDisabled = title.trim() === '' || content.trim() === '';

    // 키보드 내리는 함수
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleClose = () => {
        Alert.alert(
            "작성을 취소하시겠습니까?",
            "",
            [{
                text: "네", onPress: () => {
                    setTitle('');
                    setContent('');
                    setIsTitleFocused(false);
                    setIsContentFocused(false);
                    onClose();
                },
            },
            { text: "아니오", style: "cancel", },
            ],
            { cancelable: false }
        );
    };

    const handleSubmit = async () => {
        const formData = new FormData();
    
        // 제목과 내용을 FormData에 추가
        formData.append("title", title);
        formData.append("content", content);
    
        // 이미지 리스트 처리
        image.forEach((img, index) => {
            formData.append("images", {
                uri: img.uri,
                type: img.mimeType,
                name: img.fileName || `image_${index}.jpg`,
            });
        });
    
        try {
            const result = await writePost(boardId, formData);
    
            if (result.success) {
                console.log('게시글이 성공적으로 작성되었습니다.');
                // 상태 초기화 및 성공 처리
            } else {
                console.error('게시글 작성에 실패했습니다:', result.data);
                Alert.alert('오류', '게시글 작성에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('Error submitting post:', error);
            Alert.alert('오류', '게시글 전송 중 오류가 발생했습니다.');
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={handleClose}
        >
            <SafeAreaView style={styles.safeArea}>
                <TouchableWithoutFeedback onPress={dismissKeyboard}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={handleClose}>
                                <AntDesign name="close" size={22} />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>새 글 작성</Text>
                        </View>
                        {/* 제목 */}
                        <TextInput
                            style={isTitleFocused ? styles.titleFocused : styles.titleNotFocused}
                            onFocus={() => setIsTitleFocused(true)}
                            onBlur={() => setIsTitleFocused(false)}
                            selectionColor='#ffa551dc'
                            onChangeText={onChangeTitle}
                            value={title}
                            placeholder={'제목'}
                            placeholderTextColor={"#959595"}
                            multiline={true}
                        />
                        {/* 내용 */}
                        <TextInput
                            style={isContentFocused ? styles.focused : styles.inputContent}
                            onFocus={() => setIsContentFocused(true)}
                            onBlur={() => setIsContentFocused(false)}
                            selectionColor='#ffa551dc'
                            onChangeText={onChangeContent}
                            value={content}
                            placeholder={'내용'}
                            placeholderTextColor={"#959595"}
                            multiline={true}
                        />
                        {/* 카메라, 완료버튼 */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={onPressPhoto}>
                                <Entypo name="camera" style={styles.camera} />
                            </TouchableOpacity>
                            <TouchableOpacity disabled={isButtonDisabled} style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>완료</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </Modal>
    );
};

// 공통 스타일
const baseInput = {
    margin: 10,
    marginBottom: 6,
    padding: 12,
    paddingTop: 10,
    borderWidth: 2.5,
    borderRadius: 15,
    minHeight: 42,
    fontSize: 16,
    borderColor: '#86868645'
};

const baseInputContent = {
    margin: 10,
    marginTop: 0,
    padding: 12,
    paddingTop: 14,
    borderWidth: 2.5,
    borderRadius: 20,
    minHeight: 350,
    fontSize: 16,
    borderColor: '#86868645',
    textAlignVertical: 'top'
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
    // 제목 작성시
    titleFocused: {
        ...baseInput,
        borderColor: '#ff910097',
    },
    // 제목
    titleNotFocused: {
        ...baseInput,
    },
    // 내용 작성시
    focused: {
        ...baseInputContent,
        borderColor: '#ff910097',
    },
    // 내용
    inputContent: {
        ...baseInputContent,
    },
    // 완료 버튼
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
        fontSize: 17,
        fontWeight: '700',
        color: '#fff'
    },
    // 카메라 아이콘
    camera: {
        marginHorizontal: 10,
        marginTop: 3,
        fontSize: 33,
        color: '#686868'
    },
    // 헤더
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 15
    },
    headerText: {
        textAlign: 'center',
        flex: 1,
        paddingRight: 25,
        fontSize: 18,
        fontWeight: '700',
        color: '#333333'
    },
});