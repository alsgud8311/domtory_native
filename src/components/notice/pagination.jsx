import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useColorStore } from "../../store/colorstore";
import { useMemo } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];
  const maxPageNumWindow = 5;
  let startPage =
    Math.floor((currentPage - 1) / maxPageNumWindow) * maxPageNumWindow + 1;
  let endPage = Math.min(startPage + maxPageNumWindow - 1, totalPages);

  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // 현재 페이지가 마지막 페이지 그룹에 속하는지 확인
  const isLastPageGroup = endPage === totalPages;

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        disabled={currentPage === 1}
        onPress={() => onPageChange(startPage - maxPageNumWindow)}
      >
        <AntDesign name="doubleleft" style={styles.pageArrow} />
      </TouchableOpacity>

      <TouchableOpacity
        disabled={currentPage === 1}
        onPress={() => onPageChange(currentPage - 1)}
      >
        <AntDesign name="left" style={styles.pageArrow} />
      </TouchableOpacity>

      {pageNumbers.map((number) => (
        <TouchableOpacity
          key={number}
          onPress={() => onPageChange(number)}
          style={currentPage === number ? styles.pageNumActive : styles.pageNum}
        >
          <Text style={styles.SeperatePageNum}>{number}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        disabled={currentPage === totalPages}
        onPress={() => onPageChange(currentPage + 1)}
      >
        <AntDesign name="right" style={styles.pageArrow} />
      </TouchableOpacity>

      <TouchableOpacity
        disabled={isLastPageGroup}
        onPress={() => onPageChange(startPage + maxPageNumWindow)}
      >
        <AntDesign name="doubleright" style={styles.pageArrow} />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (darkmode) => {
  return StyleSheet.create({
    paginationContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 10,
    },
    pageArrow: {
      margin: 8,
      paddingVertical: 10,
      paddingHorizontal: 5,
      fontSize: 17,
      fontWeight: "300",
      color: darkmode ? "white" : "black",
    },
    pageNum: {
      margin: 3,
      paddingVertical: 8,
      height: 35,
      width: 35,
      justifyContent: "center",
      alignItems: "center",
    },
    pageNumActive: {
      margin: 3,
      paddingVertical: 9,
      borderRadius: 50,
      backgroundColor: "rgba(255, 164, 81, 1)",
      height: 35,
      width: 35,
      justifyContent: "center",
      alignItems: "center",
    },
    SeperatePageNum: {
      color: darkmode ? "white" : "black",
    },
  });
};

export default Pagination;
