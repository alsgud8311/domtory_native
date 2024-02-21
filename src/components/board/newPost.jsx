import React, { useState, useEffect, useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import { openBrowserAsync } from "expo-web-browser";

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
    // if (image.length + existedImage.length >= 5) {
    //   Alert.alert("5개 이상의 사진은 업로드가 불가능합니다!");
    //   return;
    // }
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

  useFocusEffect(
    useCallback(() => {
      if (post) {
        setTitle(post.title);
        setContent(post.body);
        setExistedImage(post.post_image || []);
        setIsLoading(false);
      } else {
        setTitle("");
        setContent("");
        setImage([]);
        setIsLoading(false);
      }
      console.log("baaaam");
    }, [])
  );

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
          <ScrollView style={styles.container}>
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
            <ScrollView style={styles.rulewrapper}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: "gray",
                  marginBottom: 10,
                }}
              >
                돔토리 커뮤니티 이용 규칙
              </Text>
              <Text style={styles.ruleText}>
                돔토리는 학사 내 사생끼리 건강하고 기분좋게 소통할 수 있는
                커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고
                있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간
                제한될 수 있습니다.{"\n"}
              </Text>
              <Text style={styles.ruleText}>
                * 정치•사회 관련 행위 금지{"\n"}- 국가기관, 정치 관련 단체,
                언론, 시민단체에 대한 언급 혹은 이와 관련한 행위{"\n"} - ﻿﻿정책•
                외교 또는 정치·정파에 대한 의견, 주장 및 이념, 가치관을 드러내는
                행위{"\n"}- 성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적
                이슈에 대한 언급 혹은 이와 관련한 행위 {"\n"}- 위와 같은
                내용으로 유추될 수 있는 비유, 은어 사용 행위 {"\n"}
                {"\n"}* 홍보 및 판매 관련 행위 금지 {"\n"}- 영리 여부와 관계
                없이 사업체•기관•단체•개인에게 직간접적으로 영향을 줄 수 있는
                게시물 작성 행위{"\n"} - 위와 관련된 것으로 의심되거나 예상될 수
                있는 바이럴 홍보 및 명칭.{"\n"}
              </Text>
              <Text style={styles.ruleText}>
                * 불법촬영물 유통 금지 {"\n"}불법촬영물 등을 게재할 경우
                전기통신사업법에 따라 삭제 조치 및 서비스 이용이 영구적으로
                제한될 수 있으며 관련 법률에 따라 처벌받을 수 있습니다.{"\n"}
              </Text>
              <Text style={styles.ruleText}>
                * 그 밖에 규칙 위반 해위 {"\n"}- 타인의 권리를 침해하거나
                불쾌감을 주는 행위 {"\n"}- 범죄, 불법 행위 등 법령 위반 행위
                {"\n"}- 욕설, 비하, 차별, 혐오, 자살, 폭력 관련 게시물{"\n"}-
                음란물, 성적 수치심 유발 게시물{"\n"}- 스포일러, 공포, 놀라게
                하는 행위를 포함한 게시물{"\n"}
                {"\n"}커뮤니티 이용규칙 전문은 아래 버튼을 통해 볼 수 있습니다.
                {"\n"}
              </Text>
              <TouchableOpacity
                style={{
                  borderWidth: 3,
                  borderRadius: 10,
                  padding: 10,
                  borderColor: "orange",
                  backgroundColor: "orange",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: 800,
                  }}
                  onPress={() =>
                    openBrowserAsync(
                      "https://luxurious-share-af6.notion.site/ebd8c0c297574790921bea4d47d7b73f?pvs=4"
                    )
                  }
                >
                  커뮤니티 이용규칙 전문 보기
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </ScrollView>
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
  rulewrapper: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
  },
  ruleText: {
    fontSize: 15,
    color: "gray",
  },
});
