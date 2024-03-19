import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const SettingView = () => {
  const [setting, setSetting] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    lightning: false,
    comment: false,
    reply: false,
  });

  const handleMealChange = (key, value) => {
    setSetting((prev) => ({
      ...prev,
      meal: {
        ...prev.meal,
        [key]: value,
      },
    }));
  };

  useEffect(() => {
    // const getData = () => {
    //   {data} =
    // }
  }, [setting]);

  return (
    <View style={styles.container}>
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
              value={setting.meal.breakfast.toString()}
              fixAndroidTouchableBug={true}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              onValueChange={(itemValue) =>
                handleMealChange("breakfast", itemValue === "true")
              }
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
              value={setting.meal.lunch.toString()}
              fixAndroidTouchableBug={true}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              onValueChange={(itemValue) =>
                handleMealChange("lunch", itemValue === "true")
              }
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
              value={setting.meal.dinner.toString()}
              fixAndroidTouchableBug={true}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              onValueChange={(itemValue) =>
                handleMealChange("dinner", itemValue === "true")
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
              value={setting.impromptu.toString()}
              fixAndroidTouchableBug={true}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              onValueChange={(itemValue) =>
                setSetting((prev) => ({
                  ...prev,
                  impromptu: itemValue === "true",
                }))
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
          <Text style={styles.sectiontitle}>알림</Text>
          <View style={styles.selectWrapper}>
            <RNPickerSelect
              style={pickerSelectStyles}
              value={setting.comment.toString()}
              fixAndroidTouchableBug={true}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              onValueChange={(itemValue) =>
                setSetting((prev) => ({
                  ...prev,
                  comment: itemValue === "true",
                }))
              }
              items={[
                { label: "ON", value: "true" },
                { label: "OFF", value: "false" },
              ]}
            />
          </View>
        </View>
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
    gap: 20,
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
    marginBottom: 15,
  },
  selectCard: {
    fontSize: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
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
