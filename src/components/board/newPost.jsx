import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  pickImage,
  getPhotoPermission,
} from "../../components/common/communityImage";
import { writePost, updatePost } from "../../server/board";
import { writeCouncilPost } from "../../server/notice";

export default function NewPost({
  isVisible,
  onClose,
  boardId,
  onPostSubmit,
  council,
  onSuccess,
  post,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState([]);
  const [existedImage, setExistedImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeTitle = (inputTitle) => {
    setTitle(inputTitle);
  };
  const onChangeContent = (inputContent) => {
    setContent(inputContent);
  };

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
  };

  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);

  // 키보드 내리는 함수
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleClose = () => {
    if (!title && !content) {
      setTitle("");
      setContent("");
      setImage([]);
      setIsTitleFocused(false);
      setIsContentFocused(false);
      setIsLoading(false);
      onClose();
      return;
    }
    Alert.alert(
      "작성을 취소하시겠습니까?",
      "",
      [
        {
          text: "네",
          onPress: () => {
            setTitle("");
            setContent("");
            setImage([]);
            setIsTitleFocused(false);
            setIsContentFocused(false);
            setIsLoading(false);
            onClose();
          },
        },
        { text: "아니오", style: "cancel" },
      ],
      { cancelable: false }
    );
  };

  const handleSubmit = async () => {
    if (image.length + existedImage.length >= 5) {
      Alert.alert("5개 이상의 사진은 업로드가 불가능합니다!");
      return;
    }
    Alert.alert("업로드 하시겠습니까?", "", [
      { text: "아니오", style: "cancel" },
      {
        text: "네",
        onPress: async () => {
          setIsLoading(true);
          const formData = new FormData();

          // 사진, 제목, 내용을 FormData에 추가
          if (image) {
            image.forEach((img) => {
              formData.append("images", {
                uri: img.uri,
                type: img.mimeType,
                name: img.uri.split("/").pop(),
              });
            });
          }
          formData.append("title", title);
          formData.append("body", content);

          let result;
          try {
            if (council === "true") {
              result = await writeCouncilPost(formData);
              if (result.success) {
                console.log("자율회 게시글이 성공적으로 작성되었습니다.");
                setTitle("");
                setContent("");
                setImage([]);
                onClose();
                onSuccess();
                setIsLoading(false);
              } else {
                console.error("자율회 게시글 작성에 실패했습니다:", result);
                Alert.alert(
                  "오류",
                  "자율회 게시글 작성에 실패했습니다. 다시 시도해주세요."
                );
              }
            } else {
              result = await writePost(boardId, formData);
              if (result.success) {
                Alert.alert("게시글이 작성되었습니다.");
                setTitle("");
                setContent("");
                setImage([]);
                onClose();
                onPostSubmit();
                setIsLoading(false);
              } else {
                console.error("게시글 작성에 실패했습니다:");
                Alert.alert(
                  "오류",
                  "게시글 작성에 실패했습니다. 다시 시도해주세요."
                );
                setIsLoading(false);
              }
            }
          } catch (error) {
            Alert.alert(
              "오류",
              "게시글 작성에 실패했습니다. 다시 시도해주세요."
            );
            setIsLoading(false);

            // 스택 추적 로깅
            if (error.stack) {
              console.error("Stack trace:", error.stack);
            }

            // 오류 메시지를 Alert로 표시
            Alert.alert(
              "오류",
              error.message || "게시글 전송 중 오류가 발생했습니다."
            );
          }
        },
      },
    ]);
  };

  const handleUpdateSubmit = async () => {
    Alert.alert("수정하시겠습니까?", "", [
      { text: "아니오", style: "cancel" },
      {
        text: "네",
        onPress: async () => {
          setIsLoading(true);
          const formData = new FormData();

          // 제목과 내용 추가
          formData.append("title", title);
          formData.append("body", content);

          // 삭제된 이미지 추가
          if (deletedImages.length > 0) {
            // console.log("deleted", deletedImages);
            // formData.append("deleted_images", deletedImages);
            deletedImages.forEach((imgId) => {
              console.log(imgId);
              formData.append("deleted_images", imgId);
            });
          }

          // 새로운 이미지 파일 추가
          if (image) {
            console.log(image);
            image.forEach((img) => {
              formData.append("images", {
                uri: img.uri,
                type: img.mimeType,
                name: img.uri,
              });
            });
          }

          try {
            const result = await updatePost(post.id, formData);
            if (result && result.success) {
              Alert.alert("게시글이 성공적으로 수정되었습니다.");
              onClose();
              onPostSubmit();
              setIsLoading(false);
            } else {
              console.error(
                "게시글 작성에 실패했습니다:",
                result ? result.data : "Unknown error"
              );
              Alert.alert(
                "오류",
                "게시글 작성에 실패했습니다. 다시 시도해주세요."
              );
              setIsLoading(false);
            }
          } catch (error) {
            Alert.alert(
              "오류",
              "게시글 작성에 실패했습니다. 다시 시도해주세요."
            );
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.body);
      setExistedImage(post.post_image || []);
      setIsLoading(false);
      console.log("existed", existedImage);
    } else {
      setTitle("");
      setContent("");
      setImage([]);
      setIsLoading(false);
    }
  }, [post]);

  // 완료 버튼 활성화 조건 변경
  const isButtonDisabled = title === "" || content === "";

  const [deletedImages, setDeletedImages] = useState([]);

  const handleRemoveImage = (imgId, indexToRemove) => {
    Alert.alert(
      "이미지 삭제",
      "해당 이미지를 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "예",
          onPress: () => {
            setDeletedImages((prev) => [...prev, imgId]);
            setExistedImage((currentImages) =>
              currentImages.filter((_, index) => index !== indexToRemove)
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleRemoveNewImage = (indexToRemove) => {
    Alert.alert(
      "이미지 삭제",
      "해당 이미지를 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "예",
          onPress: () => {
            setImage((currentImages) =>
              currentImages.filter((_, index) => index !== indexToRemove)
            );
          },
        },
      ],
      { cancelable: false }
    );
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
              <Text style={styles.headerText}>
                {post ? "게시글 수정" : "새 글 작성"}
              </Text>
            </View>
            {/* 제목 */}
            <TextInput
              style={
                isTitleFocused ? styles.titleFocused : styles.titleNotFocused
              }
              spellCheck={false}
              autoCorrect={false}
              onFocus={() => setIsTitleFocused(true)}
              onBlur={() => setIsTitleFocused(false)}
              selectionColor="#ffa551dc"
              onChangeText={onChangeTitle}
              value={title}
              placeholder={"제목"}
              placeholderTextColor={"#959595"}
              multiline={true}
            />
            {/* 내용 */}
            <TextInput
              spellCheck={false}
              autoCorrect={false}
              style={isContentFocused ? styles.focused : styles.inputContent}
              onFocus={() => setIsContentFocused(true)}
              onBlur={() => setIsContentFocused(false)}
              selectionColor="#ffa551dc"
              onChangeText={onChangeContent}
              value={content}
              placeholder={"내용"}
              placeholderTextColor={"#959595"}
              multiline={true}
            />
            {/* 카메라, 완료버튼 */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onPressPhoto}>
                <Entypo name="camera" style={styles.camera} />
              </TouchableOpacity>

              <TouchableOpacity
                disabled={isButtonDisabled || isLoading}
                style={styles.button}
                onPress={post ? handleUpdateSubmit : handleSubmit}
              >
                {isLoading ? (
                  <ActivityIndicator color="crimson" />
                ) : (
                  <Text style={styles.buttonText}>완료</Text>
                )}
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.imagePreviewContainer}
            >
              {existedImage.length > 0 &&
                existedImage.map((img, index) => (
                  <View key={index} style={styles.imagePreviewWrapper}>
                    <Image
                      source={{
                        uri: img.image_url,
                      }}
                      style={styles.imagePreview}
                    />
                    <TouchableOpacity
                      onPress={() => handleRemoveImage(img.id, index)}
                    >
                      <AntDesign name="closecircleo" size={17} color="gray" />
                    </TouchableOpacity>
                  </View>
                ))}
              {image.map((img, index) => (
                <View key={index} style={styles.imagePreviewWrapper}>
                  <Image
                    source={{
                      uri: img.uri,
                    }}
                    style={styles.imagePreview}
                  />
                  <TouchableOpacity onPress={() => handleRemoveNewImage(index)}>
                    <AntDesign name="closecircleo" size={17} color="gray" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  );
}

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
  borderColor: "#86868645",
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
  borderColor: "#86868645",
  textAlignVertical: "top",
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
    borderColor: "#ff910097",
  },
  // 제목
  titleNotFocused: {
    ...baseInput,
  },
  // 내용 작성시
  focused: {
    ...baseInputContent,
    borderColor: "#ff910097",
  },
  // 내용
  inputContent: {
    ...baseInputContent,
  },
  // 완료 버튼
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 15,
    backgroundColor: "#ffa451",
    width: 90,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
  // 카메라 아이콘
  camera: {
    marginHorizontal: 10,
    marginTop: 3,
    fontSize: 33,
    color: "#686868",
  },
  imagePreviewContainer: {
    marginRight: 10,
    flexDirection: "row",
    gap: 10,
  },
  imagePreviewWrapper: {
    marginRight: 10,
    flexDirection: "row",
  },
  imagePreview: {
    flexDirection: "row",
    width: 70,
    height: 70,
    borderRadius: 10,
    marginTop: 5,
  },
  // 헤더
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  headerText: {
    textAlign: "center",
    flex: 1,
    paddingRight: 25,
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",
  },
});
