import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { getNotificationList } from "../../server/notifications";

export default function NotiIcon({ navigation }) {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(null);
  const getData = async () => {
    const { success, data } = await getNotificationList();
    if (success) {
      setData(data);
      const checkedCount = data.filter(
        (notification) => !notification.isChecked
      ).length;
      setCount(checkedCount);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  if (!data) {
    return <Ionicons name="notifications-sharp" size={30} color="orange" />;
  }
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", paddingRight: 5 }}
      onPress={() => navigation.navigate("알림")}
    >
      <Ionicons name="notifications-sharp" size={30} color="orange" />
      {count > 0 && (
        <View
          style={{
            zIndex: 100,
            position: "absolute",
            top: 0,
            right: 0,
            borderWidth: 3,
            borderRadius: 10,
            borderColor: "crimson",
            backgroundColor: "crimson",
          }}
        >
          <Text style={{ color: "white", fontSize: 12, fontWeight: 800 }}>
            {count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
