var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from "react";
import FixPost from "../../components/board/fixpost";
import { useRoute } from "@react-navigation/native";
import { getPostDetail } from "../../server/board";
import { ActivityIndicator, View } from "react-native";
export default function PostFix({ navigation }) {
    const [data, setData] = useState(null);
    const route = useRoute();
    const { postId } = route.params;
    const reloadData = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield getPostDetail(postId);
            console.log(result);
            setData(result.data);
        }
        catch (error) {
            console.error("Failed to reload data:", error);
        }
    });
    useEffect(() => {
        reloadData();
    }, []);
    if (!data) {
        return (<View style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
            }}>
        <ActivityIndicator color="orange" size="large"/>
      </View>);
    }
    return <FixPost navigation={navigation} post={data}/>;
}
