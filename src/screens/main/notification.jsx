import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import { pushRenderItems } from "../../components/common/pushlistrender";
import { useCallback, useState } from "react";
import { getNotificationList } from "../../server/notifications";

export default function NotificationList() {
  const [data, setData] = useState(null);
  const navigation = useNavigation();
  const getData = async () => {
    const { success, data } = await getNotificationList();
    if (success) {
      setData(data);
      console.log(data);
    }
  };
  const renderItem = ({ item }) => {
    // navigation을 renderItem 함수에 전달
    return pushRenderItems({ item, navigation });
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  return (
    <SafeAreaView
      style={{ width: "100%", marginBottom: 80, backgroundColor: "white" }}
    >
      <FlatList data={data} renderItem={renderItem} />
    </SafeAreaView>
  );
}
