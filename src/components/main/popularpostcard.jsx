import { StyleSheet, Text, View } from "react-native";

export default function PopularPostCard({ navigation }) {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.title}>🔥실시간 인기글</Text>
      <View style={styles.container}>
        <Text>PopularPostCard</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    paddingLeft: 10,
  },
});
