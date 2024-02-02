import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

//나중에 사용할 수도 있는 모달이라 일단은 보관용
const TestScreen = (isModalVisible, setIsModalVisible) => {
  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" visible={isModalVisible} transparent={true}>
        <View style={styles.modalView}>
          <View>
            <Text style={styles.modalTextStyle}>
              Modal이 출력되는 영역입니다.
            </Text>
          </View>
          <Pressable onPress={onPressModalClose}>
            <Text>Modal Close!</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};
export default TestScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },

  /**
   * 일반 화면 영역
   */
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 400,
  },

  /**
   * 모달 화면 영역
   */
  modalView: {
    marginTop: 230,
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextStyle: {
    color: "#17191c",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
});
