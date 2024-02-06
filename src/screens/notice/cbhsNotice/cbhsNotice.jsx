import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import Pagination from '../../../components/notice/pagination';
import axios from 'axios';

export default function CbhsNotice() {
  const data = [
    {
      "id": 1,
      "post_id": "227926",
      "title": "충북학사 동서울관 이동신청자에 대한 공지",
      "date": "2019-12-31",
      "content": "충북학사 서서울관에 입사하여 n재사중인 학생 중에서동서울관으로이동 신청한 학생들에",
      "images": ""
    },
    {
      "id": 2,
      "post_id": "227927",
      "title": "충북학사 동서울관 이동신청자에 대한 두 번째 공지",
      "date": "2019-12-31",
      "content": "두 번째 공지사항 내용...",
      "images": ""
    },
    {
      "id": 3,
      "post_id": "227928",
      "title": "충북학사 동서울관 이동신청자에 대한 세 번째 공지",
      "date": "2019-12-31",
      "content": "세 번째 공지사항 내용...",
      "images": ""
    },
    {
      "id": 4,
      "post_id": "227926",
      "title": "충북학사 동서울관 이동신청자에 대한 공지",
      "date": "2019-12-31",
      "content": "충북학사 서서울관에 입사하여 n재사중인 학생 중에서동서울관으로이동 신청한 학생들에",
      "images": ""
    },
    {
      "id": 5,
      "post_id": "227927",
      "title": "충북학사 동서울관 이동신청자에 대한 두 번째 공지",
      "date": "2019-12-31",
      "content": "두 번째 공지사항 내용...",
      "images": ""
    },
    {
      "id": 6,
      "post_id": "227928",
      "title": "충북학사 동서울관 이동신청자에 대한 세 번째 공지",
      "date": "2019-12-31",
      "content": "세 번째 공지사항 내용...",
      "images": ""
    },
    {
      "id": 7,
      "post_id": "227926",
      "title": "충북학사 동서울관 이동신청자에 대한 공지",
      "date": "2019-12-31",
      "content": "충북학사 서서울관에 입사하여 n재사중인 학생 중에서동서울관으로이동 신청한 학생들에",
      "images": ""
    },
    {
      "id": 8,
      "post_id": "227927",
      "title": "충북학사 동서울관 이동신청자에 대한 두 번째 공지",
      "date": "2019-12-31",
      "content": "두 번째 공지사항 내용...",
      "images": ""
    },
    {
      "id": 9,
      "post_id": "227928",
      "title": "충북학사 동서울관 이동신청자에 대한 세 번째 공지",
      "date": "2019-12-31",
      "content": "세 번째 공지사항 내용...",
      "images": ""
    },
    {
      "id": 10,
      "post_id": "227926",
      "title": "충북학사 동서울관 이동신청자에 대한 공지",
      "date": "2019-12-31",
      "content": "충북학사 서서울관에 입사하여 n재사중인 학생 중에서동서울관으로이동 신청한 학생들에",
      "images": ""
    },
    {
      "id": 11,
      "post_id": "227926",
      "title": "충북학사 동서울관 이동신청자에 대한 공지",
      "date": "2019-12-31",
      "content": "충북학사 서서울관에 입사하여 n재사중인 학생 중에서동서울관으로이동 신청한 학생들에",
      "images": ""
    },
    {
      "id": 12,
      "post_id": "227926",
      "title": "충북학사 동서울관 이동신청자에 대한 공지",
      "date": "2019-12-31",
      "content": "충북학사 서서울관에 입사하여 n재사중인 학생 중에서동서울관으로이동 신청한 학생들에",
      "images": ""
    },
    {
      "id": 13,
      "post_id": "227926",
      "title": "충북학사 동서울관 이동신청자에 대한 공지",
      "date": "2019-12-31",
      "content": "충북학사 서서울관에 입사하여 n재사중인 학생 중에서동서울관으로이동 신청한 학생들에",
      "images": ""
    },
    {
      "id": 14,
      "post_id": "227926",
      "title": "24년 1학기 국가고시 및 국가자격시험 준비 계속재사생 선발",
      "date": "2019-12-31",
      "content": "충북학사 서서울관에 입사하여 n재사중인 학생 중에서동서울관으로이동 신청한 학생들에",
      "images": ""
    },
    {
      "id": 15,
      "post_id": "227926",
      "title": "2월 사실 및 공동구역 방역소독 실시",
      "date": "2019-12-31",
      "content": "충북학사 서서울관에 입사하여 n재사중인 학생 중에서동서울관으로이동 신청한 학생들에",
      "images": ""
    },
  ];

  // const [data, setData] = useState([]);
  // const [searchKeyword, setSearchKeyword] = useState("");
  // const [filteredData, setFilteredData] = useState([]);
  // const [sortedData, setSortedData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get("https://api.domtory.site/notice/")
  //     .then((response) => {
  //       setData(response.data);
  //       setIsLoading(false);
  //       console.log(data)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  // // 날짜 기준으로 내림차순 정렬
  // useEffect(() => {
  //   const sorted = [...filteredData].sort(
  //     (a, b) => new Date(b.date) - new Date(a.date)
  //   );
  //   setSortedData(sorted);
  // }, [filteredData]);

  const PAGE_SIZE = 10; // 페이지당 표시할 아이템의 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [loading, setLoading] = useState(false); // 데이터 로딩 상태

  //총 페이지 수 계산
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  // 현재 페이지에 따라 표시할 데이터의 부분 집합 계산
  const currentData = data.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // 페이지 변경 함수
  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <View style={styles.number}><Text>No.</Text></View>
        <View style={styles.title}><Text>제목</Text></View>
        <View style={styles.date}><Text>작성일</Text></View>
      </View>
      <FlatList
        data={currentData}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content style={list.content}>
              <ListItem.Subtitle style={list.number}>{item.id}</ListItem.Subtitle>
              <ListItem.Title style={list.title}>{item.title}</ListItem.Title>
              <ListItem.Subtitle style={list.date}>{item.date}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        scrollEnabled={false}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(221, 221, 221, 0.6)',
    borderTopWidth: 1,
    borderTopColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(192, 192, 192, 0.6)',
  },
  number: {
    flex: 0.4,
  },
  title: {
    flex: 4,
  },
  date: {
    flex: 1,
  },
});

const list = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 32
  },
  number: {
    flex: 0.4,
    fontSize: 13,
  },
  title: {
    flex: 4,
    fontSize: 14,
    marginRight: 15
  },
  date: {
    flex: 1,
    fontSize: 11
  },
})