var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useEffect, useCallback } from "react";
import PostDetail from "../../../components/board/postDetail";
import { getPostDetail } from "../../../server/board";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
export default function GeneralDetail({ navigation }) {
    const [data, setData] = useState({});
    const route = useRoute();
    const { postId } = route.params;
    const reloadData = () => __awaiter(this, void 0, void 0, function* () {
        const result = yield getPostDetail(postId);
        if (result.success && !result.data.is_blocked && !result.data.is_deleted) {
            // console.log(result);
            setData(result.data);
        }
        else {
            Alert.alert("삭제되거나 차단 조치된 게시물입니다.");
            navigation.pop();
        }
    });
    useFocusEffect(useCallback(() => {
        reloadData();
    }, [postId]));
    return <PostDetail data={data} reloadData={reloadData} postId={postId}/>;
}
