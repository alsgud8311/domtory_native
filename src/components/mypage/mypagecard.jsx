import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../../store/AuthContext";

export default function MypageCard({ navigation }) {
  const { onLogout, onWithdrawal, authState } = useAuth();
  const logout = async () => {
    const { success } = await onLogout();
    if (success) {
      return;
    } else {
      Alert.alert("로그아웃 과정에서 오류가 발생했습니다.");
    }
  };
  const onPressLogout = () => {
    Alert.alert("로그아웃 하시나요?", "", [
      { text: "아니요", style: "cancel" },
      { text: "넹", onPress: () => logout(authState.pushToken) },
    ]);
  };

  const withdrawal = async () => {
    const { success, data } = await onWithdrawal();
    if (success) {
      Alert.alert("회원 탈퇴가 완료되었습니다.");
      await onLogout();
    } else {
      Alert.alert("회원 탈퇴 과정에서 오류가 발생했습니다.");
    }
  };
  const onPressWithdraw = () => {
    Alert.alert(
      "회원탈퇴를 하시겠습니까? 회원탈퇴를 하게 되면 저장된 개인정보는 모두 폐기처리되며, 이후 재가입이 불가능합니다.",
      "",
      [
        { text: "아니오", style: "cancel" },
        {
          text: "예",
          onPress: () => {
            Alert.alert("정말 회원탈퇴를 진행하시겠습니까?", "", [
              { text: "아니오", style: "cancel" },
              {
                text: "예",
                onPress: withdrawal,
              },
            ]);
          },
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("비밀번호 변경")}
        >
          <AntDesign name="lock" size={24} color="black" />
          <Text style={styles.cardText}>비밀번호 변경</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.card} onPress={onPressLogout}>
          <AntDesign name="unlock" size={24} color="black" />
          <Text style={styles.cardText}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={onPressWithdraw}>
          <FontAwesome5 name="sad-tear" size={24} color="black" />
          <Text style={styles.cardText}>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
  },
  wrapper: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: "gray",
    borderTopColor: "gray",
  },
  card: {
    padding: 20,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  cardText: {
    fontSize: 20,
  },
});
