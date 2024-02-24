import { useEffect, useState } from "react";
import FixPost from "../../components/board/fixpost";
import { useRoute } from "@react-navigation/native";
import { getPostDetail } from "../../server/board";
import { ActivityIndicator, View } from "react-native";

export default function PostFix({ navigation }) {
  const [data, setData] = useState(null);
  const route = useRoute();
  const { postId } = route.params;

  const reloadData = async () => {
    try {
      const result = await getPostDetail(postId);
      console.log(result);
      setData(result.data);
    } catch (error) {
      console.error("Failed to reload data:", error);
    }
  };

  useEffect(() => {
    reloadData();
  }, []);

  if (!data) {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color="orange" size="large" />
      </View>
    );
  }

  return <FixPost navigation={navigation} post={data} />;
}
