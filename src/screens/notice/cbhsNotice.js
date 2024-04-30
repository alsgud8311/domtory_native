import React from "react";
import { View } from "react-native";
import Noticebox from "../../components/notice/noticebox";
export default function CbhsNotice({ route, navigation }) {
    const { div } = route.params;
    return <Noticebox div={div} navigation={navigation}/>;
}
