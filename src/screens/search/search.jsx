import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    Keyboard,
    Image,
} from "react-native";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { getSearhedData } from "../../server/search";
import Searchbox from "../../components/search/searchbox"




export default function Search({ route, navigation }) {
    return (
        <ScrollView style={styles.container}>
            <Searchbox route={route} navigation={navigation}/>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: "100%",
        backgroundColor: "#f0f0f0",
    },
});
