var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useFocusEffect, useNavigation, useRoute, } from "@react-navigation/native";
import { Alert, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View, } from "react-native";
import { pushRenderItems } from "../../components/common/pushlistrender";
import { useCallback, useState } from "react";
import { getNotificationList, pushDelete } from "../../server/notifications";
import { SwipeListView } from "react-native-swipe-list-view";
import { EvilIcons } from "@expo/vector-icons";
export default function NotificationList() {
    const hiddenPushListRender = ({ item }) => {
        const handleDelete = () => {
            Alert.alert("해당 알림을 삭제하시겠습니까?", "", [
                { text: "아니오", style: "cancel" },
                {
                    text: "네",
                    onPress: () => __awaiter(this, void 0, void 0, function* () {
                        console.log("슈웃", item.memberId, item.pushedAt);
                        const { success } = yield pushDelete(item.memberId, item.pushedAt);
                        if (success) {
                            getData();
                        }
                    }),
                },
            ]);
        };
        return (<View style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-end",
            }}>
        <TouchableOpacity style={{
                width: 70,
                height: 100,
                backgroundColor: "crimson",
                alignItems: "center",
                justifyContent: "center",
            }} onPress={handleDelete}>
          <EvilIcons name="trash" size={40} color="white"/>
        </TouchableOpacity>
      </View>);
    };
    const [data, setData] = useState(null);
    const navigation = useNavigation();
    const getData = () => __awaiter(this, void 0, void 0, function* () {
        const { success, data } = yield getNotificationList();
        if (success) {
            setData(data);
            console.log(data);
        }
    });
    const renderItem = ({ item }) => {
        // navigation을 renderItem 함수에 전달
        return pushRenderItems({ item, navigation });
    };
    useFocusEffect(useCallback(() => {
        getData();
    }, []));
    return (<SafeAreaView style={{ width: "100%", marginBottom: 80, backgroundColor: "white" }}>
      <SwipeListView data={data} renderItem={renderItem} renderHiddenItem={hiddenPushListRender} rightOpenValue={-70}/>
    </SafeAreaView>);
}
