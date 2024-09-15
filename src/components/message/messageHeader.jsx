import { Feather, FontAwesome, Octicons } from "@expo/vector-icons";
import { useColorStore } from "../../store/colorstore";
import { Alert, View } from "react-native";
import { report } from "../../server/board";
import { blockMessage } from "../../server/message";
import { useAuth } from "../../store/AuthContext";

export function MessageHeader({ navigation, route }) {
  const darkmode = useColorStore((state) => state.darkmode);
  const { authState } = useAuth();
  const { messageId, senderId } = route.params;

  const onPressReport = () => {
    Alert.alert("신고", "해당 쪽지를 보낸 사람을 신고할까요?", [
      { onPress: messageReport, text: "네" },
      { style: "cancel", text: "취소" },
    ]);
  };

  const onPressBlock = () => {
    Alert.alert("차단", "해당 쪽지를 보낸 사람을 차단할까요?", [
      { onPress: messageBlock, text: "네" },
      { style: "cancel", text: "취소" },
    ]);
  };

  const messageReport = async () => {
    const { success, data } = await report("message", messageId);
    if (success) {
      Alert.alert("신고가 접수되었어요.");
      await messageBlock();
      navigation.pop();
    } else {
      Alert.alert("신고 중 오류가 발생했어요!");
    }
  };
  const messageBlock = async () => {
    const { success } = await blockMessage(messageId, authState.id, senderId);
    if (success) {
      Alert.alert("차단이 완료되었어요");
      navigation.pop();
    } else {
      Alert.alert("차단 중 오류가 발생했어요!");
    }
  };
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
      <FontAwesome
        name="ban"
        size={24}
        color="crimson"
        onPress={onPressBlock}
      />
      <Octicons name="report" size={24} color="black" onPress={onPressReport} />
      <Feather
        onPress={() => navigation.setParams({ showModal: true })}
        name="send"
        size={24}
        color={darkmode ? "white" : "black"}
      />
    </View>
  );
}
