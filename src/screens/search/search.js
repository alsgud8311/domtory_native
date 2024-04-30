import React, { useEffect, useState } from "react";
import { View, StyleSheet, } from "react-native";
import Searchbox from "../../components/search/searchbox";
export default function Search({ route, navigation }) {
    return (<View style={styles.container}>
            <Searchbox route={route} navigation={navigation}/>
        </View>);
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: "100%",
        backgroundColor: "#f0f0f0",
    },
});
