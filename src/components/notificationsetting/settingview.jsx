import { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { getPushDetail, putPushDetail } from "../../server/notifications";

const SettingView = ({ navigation }) => {
  const [setting, setSetting] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    lightningPost: false,
    comment: false,
    reply: false,
  });

  const getData = async () => {
    const { success, data } = await getPushDetail();
    if (success) {
      setSetting(data);
    } else {
      alert("정보를 가져오는 중 오류가 발생했습니다.");
      navigation.pop();
    }
  };

  const valueChange = (key, itemValue) =>
    setSetting((prev) => ({
      ...prev,
      [key]: itemValue === "true",
    }));

  const saveChanges = async () => {
    const { success } = await putPushDetail(setting);
    if (success) {
      alert("변경이 완료되었습니다!");
      navigation.pop();
    } else {
      alert("변경 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>식단 알림</Text>
        <Text style={styles.subtitle}>
          매일 아침, 점심, 저녁 식단을 알려드려요
        </Text>
        <View style={styles.selectCard}>
          <Text style={styles.sectiontitle}>아침</Text>
          <View style={styles.selectWrapper}>
            <RNPickerSelect
              style={pickerSelectStyles}
              value={setting.breakfast.toString()}
              fixAndroidTouchableBug={true}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              onValueChange={(itemValue) => valueChange("breakfast", itemValue)}
              items={[
                { label: "ON", value: "true" },
                { label: "OFF", value: "false" },
              ]}
            />
          </View>
        </View>
        <View style={styles.selectCard}>
          <Text style={styles.sectiontitle}>점심</Text>
          <View style={styles.selectWrapper}>
            <RNPickerSelect
              style={pickerSelectStyles}
              value={setting.lunch.toString()}
              fixAndroidTouchableBug={true}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              onValueChange={(itemValue) => valueChange("lunch", itemValue)}
              items={[
                { label: "ON", value: "true" },
                { label: "OFF", value: "false" },
              ]}
            />
          </View>
        </View>
        <View style={styles.selectCard}>
          <Text style={styles.sectiontitle}>저녁</Text>
          <View style={styles.selectWrapper}>
            <RNPickerSelect
              style={pickerSelectStyles}
              value={setting.dinner.toString()}
              fixAndroidTouchableBug={true}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              onValueChange={(itemValue) => valueChange("dinner", itemValue)}
              items={[
                { label: "ON", value: "true" },
                { label: "OFF", value: "false" },
              ]}
            />
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>번개게시판 알림</Text>
        <Text style={styles.subtitle}>
          번개모임이나 나눔, 배달음식 시킬 사람을 구하는 사람들의 글이 바로
          알림이 와요
        </Text>
        <View style={styles.selectCard}>
          <Text style={styles.sectiontitle}>알림</Text>
          <View style={styles.selectWrapper}>
            <RNPickerSelect
              style={pickerSelectStyles}
              value={setting.lightningPost.toString()}
              fixAndroidTouchableBug={true}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              onValueChange={(itemValue) =>
                valueChange("lightningPost", itemValue)
              }
              items={[
                { label: "ON", value: "true" },
                { label: "OFF", value: "false" },
              ]}
            />
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>댓글/대댓글 알림</Text>
        <Text style={styles.subtitle}>
          내가 쓴 글의 댓글/대댓글이나 내가 쓴 댓글의 대댓글에 알림이 와요
        </Text>
        <View style={styles.selectCard}>
          <Text style={styles.sectiontitle}>댓글 알림</Text>
          <View style={styles.selectWrapper}>
            <RNPickerSelect
              style={pickerSelectStyles}
              value={setting.comment.toString()}
              fixAndroidTouchableBug={true}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              onValueChange={(itemValue) => valueChange("comment", itemValue)}
              items={[
                { label: "ON", value: "true" },
                { label: "OFF", value: "false" },
              ]}
            />
          </View>
        </View>
        <View style={styles.selectCard}>
          <Text style={styles.sectiontitle}>대댓글 알림</Text>
          <View style={styles.selectWrapper}>
            <RNPickerSelect
              style={pickerSelectStyles}
              value={setting.reply.toString()}
              fixAndroidTouchableBug={true}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              onValueChange={(itemValue) => valueChange("reply", itemValue)}
              items={[
                { label: "ON", value: "true" },
                { label: "OFF", value: "false" },
              ]}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.savebutton} onPress={saveChanges}>
        <Text style={styles.buttonText}>저장하고 나가기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    gap: 30,
  },
  card: {
    width: "100%",
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 15,
  },
  selectCard: {
    fontSize: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  selectWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sectiontitle: {
    fontSize: 16,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  savebutton: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    marginBottom: 150,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "700",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 4,
    color: "black",
    paddingLeft: 100,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default SettingView;
