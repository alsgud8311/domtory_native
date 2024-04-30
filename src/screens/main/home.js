var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import DailyMenuCard from "../../components/main/menucard";
import Shortcuts from "../../components/main/shortcuts";
import CommunityCard from "../../components/main/communitycard";
import NoticeCard from "../../components/main/noticecard";
import RecentPostCard from "../../components/main/recentcard";
import CouncilNoticeCard from "../../components/main/councilnoticecard";
import { useCallback, useEffect, useRef, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import React from "react";
import { apiBe } from "../../server";
import * as Notification from "expo-notifications";
import { useAuth } from "../../store/AuthContext";
import { requestUserPermission } from "../../utils/firebase/firebaseSetting";
import * as SecureStore from "expo-secure-store";
import { pushCheckUpdate } from "../../server/notifications";
import PopularPostCard from "../../components/main/popularpostcard";
// import * as SplashScreen from "expo-splash-screen";
Notification.setNotificationHandler({
    handleNotification: () => __awaiter(void 0, void 0, void 0, function* () {
        return ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        });
    }),
});
const board = {
    1: "자유 게시판",
    2: "중고거래게시판",
    3: "취준생게시판",
    4: "번개모임게시판",
    5: "분실물게시판",
};
export default function Home({ navigation }) {
    const { authState, setAuthState } = useAuth();
    let isMessageHandlerRegistered = false;
    //개별 알림이 사용가능한지 확인
    useEffect(() => {
        const notificationCheck = () => __awaiter(this, void 0, void 0, function* () {
            const { AuthorizationSuccess } = yield requestUserPermission();
            if (AuthorizationSuccess && authState.pushTokenActive === "NO") {
                const token = yield messaging().getToken();
                setAuthState((prev) => (Object.assign(Object.assign({}, prev), { pushToken: token })));
                yield SecureStore.setItemAsync("PUSH_TOKEN", token);
                if (token) {
                    console.log("Push Token: ", token);
                    try {
                        const data = {
                            pushToken: token,
                        };
                        yield apiBe.post("/push/token/", data);
                        yield SecureStore.setItemAsync("PUSHTOKEN_ACTIVE", "YES");
                    }
                    catch (error) {
                        console.log("Sending Push Token error", error);
                    }
                }
                else {
                    console.log("getToken Failed");
                }
            }
            else {
                console.log("already registered");
            }
        });
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            yield notificationCheck();
            messaging()
                .getInitialNotification()
                .then((remoteMessage) => __awaiter(this, void 0, void 0, function* () {
                if (remoteMessage && remoteMessage.data) {
                    const { postId, boardId, pushedAt } = remoteMessage.data;
                    if (postId && boardId && pushedAt) {
                        const { success } = yield pushCheckUpdate(authState.id, pushedAt);
                        if (success) {
                            navigation.navigate(board[boardId], { postId: postId });
                        }
                        else {
                            navigation.navigate(board[boardId], { postId: postId });
                        }
                    }
                    else {
                        console.log("푸시 알림 데이터가 부족합니다.");
                    }
                }
                else {
                    console.log("푸시 알림 데이터가 없습니다.");
                }
            }));
            messaging().onNotificationOpenedApp((remoteMessage) => __awaiter(this, void 0, void 0, function* () {
                if (remoteMessage && remoteMessage.data) {
                    const { postId, boardId, pushedAt } = remoteMessage.data;
                    if (postId && boardId && pushedAt) {
                        const { success } = yield pushCheckUpdate(authState.id, pushedAt);
                        if (success) {
                            navigation.navigate(board[boardId], { postId: postId });
                        }
                        else {
                            navigation.navigate(board[boardId], { postId: postId });
                        }
                    }
                    else {
                        console.log("푸시 알림 데이터가 부족합니다.");
                    }
                }
                else {
                    console.log("푸시 알림 데이터가 없습니다.");
                }
            }));
            messaging().setBackgroundMessageHandler((remoteMessage) => __awaiter(this, void 0, void 0, function* () {
                console.log("백그라운드 메세지 받기", remoteMessage);
            }));
        });
        fetchData();
        const unsubscribe = messaging().onMessage((remoteMessage) => __awaiter(this, void 0, void 0, function* () {
            console.log("포어그라운드", remoteMessage);
            if (remoteMessage && remoteMessage.data) {
                const { postId, boardId, pushedAt } = remoteMessage.data;
                if (postId && boardId && pushedAt) {
                    Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body, [
                        { text: "취소", style: "cancel" },
                        {
                            text: "보러가기",
                            onPress: () => __awaiter(this, void 0, void 0, function* () {
                                const { success } = yield pushCheckUpdate(authState.id, pushedAt);
                                if (success) {
                                    navigation.navigate(board[boardId], { postId: postId });
                                }
                                else {
                                    navigation.navigate(board[boardId], { postId: postId });
                                }
                            }),
                        },
                    ]);
                }
                else {
                    Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
                }
            }
            else {
                Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
            }
        }));
        return unsubscribe;
    }, []);
    return (<View>
      <ScrollView style={styles.container}>
        <DailyMenuCard navigation={navigation}/>
        <Shortcuts navigation={navigation}/>
        <RecentPostCard navigation={navigation}/>
        <CommunityCard navigation={navigation}/>
        <PopularPostCard navigation={navigation}/>
        <NoticeCard navigation={navigation}/>
        <CouncilNoticeCard navigation={navigation}/>
      </ScrollView>
    </View>);
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 20,
        marginBottom: 70,
    },
});
