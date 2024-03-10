import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const SettingView = () => {
  const [setting, setSetting] = useState({
    meal: {
      breakfast: false,
      lunch: false,
      dinner: false,
    },
    impromptu: false,
    comment: false,
  });
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>식단 알림</Text>
        <Text style={styles.subtitle}>
          매일 아침, 점심, 저녁 식단을 알려드려요
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    padding: 20,
  },
  card: {
    width: "100%",
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
  },
  selectCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SettingView;
