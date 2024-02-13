import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import Pagination from '../../components/notice/pagination';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';


const API_URL = "http://api.domtory.site/notice/";

export default function Noticebox() {
    const councilData = [
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
    ]
    const [cbhsData, setCbhsData] = useState([]);
    const [data, setData] = useState('');
    const [category, setCategory] = useState('cbhs');

    useEffect(() => {
        if (category === 'cbhs') {
            setData(cbhsData);
            setCurrentPage(1);
        }
    }, [cbhsData, category]);

    // 카테고리 변경 함수
    const onCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setData(newCategory === 'cbhs' ? cbhsData : councilData);
        setCurrentPage(1);
    };

    // // 페이지네이션
    // const PAGE_SIZE = 10; // 페이지당 표시할 아이템의 수
    // const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    // const [loading, setLoading] = useState(false); // 데이터 로딩 상태

    // //총 페이지 수 계산
    // const totalPages = Math.ceil(data.length / PAGE_SIZE);

    // // 현재 페이지에 따라 표시할 데이터의 부분 집합 계산
    // const pageData = data.slice(
    //     (currentPage - 1) * PAGE_SIZE,
    //     currentPage * PAGE_SIZE
    // );

    // // 페이지 변경 함수
    // const onPageChange = (newPage) => {
    //     setCurrentPage(newPage);
    // };

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPosts(currentPage);
    }, []);

    // 페이지 데이터를 불러오는 함수
    const fetchPosts = (page) => {
        setLoading(true);
        axios.get(`${API_URL}?page=${page}`)
            .then((response) => {
                setCbhsData(response.data.postList);
                setData(cbhsData);
                setCurrentPage(response.data.curPage);
                setTotalPages(response.data.pageCnt);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // 페이지 변경 함수
    const onPageChange = (newPage) => {
        fetchPosts(newPage);
    };

    return (
        <View style={styles.container}>
            <View style={select.select}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => onCategoryChange('cbhs')}>
                        <Text style={category === 'cbhs' ? select.active : select.inactive}>학사</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onCategoryChange('council')}>
                        <Text style={category === 'council' ? select.active : select.inactive}>자율회</Text>
                    </TouchableOpacity>
                </View>
                {category === 'council' && (
                    <AntDesign name="form" style={select.writeText} />
                )}
            </View>

            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <ListItem bottomDivider>
                        <ListItem.Content style={list.content} onPress={() => navigateToDetailPage(item.id)}>
                            <ListItem.Subtitle style={list.number}>{item.id}</ListItem.Subtitle>
                            <ListItem.Title style={list.title}>{item.title}</ListItem.Title>
                            <ListItem.Subtitle style={list.date}>{item.date}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={loading ? <ActivityIndicator /> : null}
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
        //backgroundColor: '#ffa451',
    },
});

const list = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 30
    },
    number: {
        flex: 0.5,
        fontSize: 13,
    },
    title: {
        flex: 4,
        fontSize: 13,
        marginRight: 15
    },
    date: {
        flex: 1,
        fontSize: 11
    },
})

const select = StyleSheet.create({
    select: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingBottom: 0,
        borderBottomWidth: 1.5,
        borderBottomColor: 'rgba(211, 211, 211, 0.7)',
    },
    active: {
        padding: 10,
        paddingHorizontal: 30,
        fontSize: 15,
        fontWeight: '600',
        borderBottomWidth: 2,
        borderBottomColor: '#ffa451',
        color: '#ffa451',

    },
    inactive: {
        padding: 10,
        paddingHorizontal: 30,
        fontSize: 15,
        fontWeight: '400',
    },
    writeText: {
        padding: 10,
        paddingHorizontal: 20,
        fontSize: 20,

    }
})