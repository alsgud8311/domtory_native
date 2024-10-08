import React, { useMemo, useState } from "react";
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { postMessage } from "../../server/message";
import { useColorStore } from "../../store/colorstore";

const SendMessage = ({ onClose, roomId }) => {
  const [content, setContent] = useState("");
  const [isContentFocused, setIsContentFocused] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode));
  console.log("쪽지 보내는 방 넘겨받은 룸아이디:", roomId);

  const onChangeContent = (inputContent) => {
    console.log(inputContent);
    setContent(inputContent);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleCancel = () => {
    Alert.alert(
      "쪽지 보내기",
      "쪽지 보내기를 취소하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: onClose,
        },
      ],
      { cancelable: false }
    );
  };

  const handleSending = () => {
    Alert.alert(
      "쪽지 보내기",
      "쪽지를 보내시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: handleSendMessage,
        },
      ],
      { cancelable: false }
    );
  };
  const handleSendMessage = async () => {
    try {
      setIsSending(true);
      const response = await postMessage(roomId, content);
      if (response.success) {
        console.log("메시지 전송 성공");
        onClose();
      } else {
        console.error("메시지 전송 실패:", response.data);
      }
    } catch (error) {
      console.error("메시지 전송 오류:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.modal}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
            <AntDesign
              name="close"
              size={22}
              style={{ color: darkmode ? "white" : "black" }}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>쪽지 보내기</Text>
          <Feather
            onPress={handleSending}
            name="send"
            style={styles.sendIcon}
            disabled={isSending}
          />
        </View>
        <TouchableWithoutFeedback
          onPress={dismissKeyboard}
          style={styles.contentContainer}
        >
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
        </TouchableWithoutFeedback>
        {isSending && <ActivityIndicator color={"orange"} size={"large"} />}
      </ScrollView>
    </View>
  );
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

const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      paddingTop: 50,
      backgroundColor: darkmode ? "black" : "white",
    },
    modal: {
      backgroundColor: darkmode ? "black" : "#fff",
      width: "100%",

      padding: 15,
      borderRadius: 10,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
      marginBottom: 15,
      marginHorizontal: 5,
    },
    headerText: {
      textAlign: "center",
      flex: 1,
      fontSize: 18,
      fontWeight: "700",
      color: darkmode ? "white" : "#333333",
    },
    sendIcon: {
      fontSize: 24,
      paddingTop: 10,
      color: darkmode ? "white" : "black",
    },
    contentContainer: {
      marginTop: 10,
    },
    focused: {
      ...baseInputContent,
      borderColor: "#ff910097",
      color: darkmode ? "white" : "black",
    },
    inputContent: {
      ...baseInputContent,
      color: darkmode ? "white" : "black",
    },
  });
};

export default SendMessage;
