import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function CommunityCard() {
  const [communityData, setCommunityData] = useState(null);

  //   if (!menuData) {
  //     return (
  //       <View style={styles.container}>
  //         <Text>Loading...</Text>
  //       </View>
  //     );
  //   }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.menuList}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "30%",
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#ffcc99",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateText: {
    fontSize: 24,
    marginBottom: 5,
  },
  mealTypeText: {
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: "#ff9933",
    paddingBottom: 5,
  },
  menuList: {
    paddingTop: 10,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 2,
  },
});
