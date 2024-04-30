var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialIcons, FontAwesome5, FontAwesome, } from "@expo/vector-icons";
import { useAuth } from "../../store/AuthContext";
import { openBrowserAsync } from "expo-web-browser";
export default function MypageCard({ navigation }) {
    const { onLogout, onWithdrawal, authState } = useAuth();
    const logout = () => __awaiter(this, void 0, void 0, function* () {
        const { success } = yield onLogout();
        if (success) {
            return;
        }
        else {
            Alert.alert("로그아웃 과정에서 오류가 발생했습니다.");
        }
    });
    const onPressLogout = () => {
        Alert.alert("로그아웃 하시나요?", "", [
            { text: "아니요", style: "cancel" },
            { text: "넹", onPress: logout },
        ]);
    };
    const withdrawal = () => __awaiter(this, void 0, void 0, function* () {
        const { success, data } = yield onWithdrawal();
        if (success) {
            Alert.alert("회원 탈퇴가 완료되었습니다.");
            yield onLogout();
        }
        else {
            Alert.alert("회원 탈퇴 과정에서 오류가 발생했습니다.");
        }
    });
    const onPressWithdraw = () => {
        Alert.alert("회원탈퇴를 하시겠습니까? 회원탈퇴를 하게 되면 저장된 개인정보는 모두 폐기처리되며, 이후 재가입이 불가능합니다.", "", [
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
        ]);
    };
    return (<View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("비밀번호 변경")}>
          <AntDesign name="lock" size={24} color="black"/>
          <Text style={styles.cardText}>비밀번호 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("알림 설정")}>
          <MaterialIcons name="notifications-on" size={24} color="black"/>
          <Text style={styles.cardText}>알림 설정</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.card} onPress={() => openBrowserAsync("https://luxurious-share-af6.notion.site/9ed580ee5cc242cab12a1131a9da8b97?pvs=4")}>
          <FontAwesome name="book" size={24} color="black"/>
          <Text style={styles.cardText}>이용 약관</Text>
        </TouchableOpacity>
      </View>
      <View style={{ borderBottomWidth: 1, borderColor: "gray" }}>
        <TouchableOpacity style={styles.card} onPress={() => openBrowserAsync("https://luxurious-share-af6.notion.site/e58b04065f63441f8a1f00c1519353e7?pvs=4")}>
          <FontAwesome name="address-book" size={24} color="black"/>
          <Text style={styles.cardText}>개인정보 처리방침</Text>
        </TouchableOpacity>
      </View>
      <View style={{ borderBottomWidth: 1, borderColor: "gray" }}>
        <TouchableOpacity style={styles.card} onPress={onPressLogout}>
          <AntDesign name="unlock" size={24} color="black"/>
          <Text style={styles.cardText}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={onPressWithdraw}>
          <FontAwesome5 name="sad-tear" size={24} color="black"/>
          <Text style={styles.cardText}>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
    </View>);
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 20,
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
        fontSize: 17,
    },
});
