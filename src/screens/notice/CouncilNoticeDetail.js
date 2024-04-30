var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { getPostDetail } from "../../server/board";
import kingDomtory from "../../assets/council_domtory.png";
import Hyperlink from "react-native-hyperlink";
export default function CouncilNoticeDetail() {
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
    }, [postId]);
    if (!data) {
        return (<View style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}>
        <ActivityIndicator size="large" color="orange"/>
      </View>);
    }
    return (<ScrollView style={{ width: "100%", backgroundColor: "white", padding: 20 }}>
      <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
        <Image source={kingDomtory} style={{
            width: 50,
            height: 50,
            backgroundColor: "#fff5d3",
            borderRadius: 15,
        }}/>
        <View>
          <Text style={{ fontSize: 18, paddingLeft: 10 }}>자율회 도토리</Text>
          <Text style={{ fontSize: 13, paddingLeft: 10, color: "gray" }}>
            {data.date}
          </Text>
        </View>
      </View>
      <View style={{ width: "100%", padding: 20, marginBottom: 80 }}>
        <Text style={{ fontSize: 20, paddingBottom: 20 }}>{data.title}</Text>
        <Hyperlink linkDefault={true} linkStyle={{ color: "mediumblue" }}>
          <Text style={{ fontSize: 17 }}>{data.body}</Text>
        </Hyperlink>
      </View>
    </ScrollView>);
}
