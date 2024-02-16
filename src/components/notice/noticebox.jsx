import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import Pagination from '../../components/notice/pagination';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import NewPost from '../board/newPost';

const API_URL = "http://api.domtory.site/notice/";

export default function Noticebox() {
    const [councilData, setCouncilData] = useState([]);
    const [cbhsData, setCbhsData] = useState([]);
    const [data, setData] = useState('');
    const [category, setCategory] = useState('cbhs');

    useEffect(() => {
        // 컴포넌트 마운트 시 또는 currentPage, category가 변경될 때마다 데이터 불러오기
        fetchPosts(currentPage);
    }, [currentPage, category]);

    // 카테고리 변경 함수
    const onCategoryChange = (newCategory) => {
        setCategory(newCategory);
        // 카테고리 변경 시 데이터를 즉시 불러옵니다.
        // 첫 페이지부터 불러오도록 설정
        fetchPosts(1);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [cbhsTotalPages, setCbhsTotalPages] = useState(0);
    const [councilTotalPages, setCouncilTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    // 페이지 데이터를 불러오는 함수
    const fetchPosts = (page) => {
        setLoading(true);
        let apiUrl = `${API_URL}?page=${page}`;
        // 카테고리에 따라 API URL을 조정
        if (category === 'council') {
            apiUrl = 'http://api.domtory.site/board/post/list/6/';
        }

        axios.get(apiUrl)
            .then((response) => {
                // 카테고리에 따라 적절한 상태를 설정
                if (category === 'cbhs') {
                    setCbhsData(response.data.postList);
                    setData(response.data.postList);
                    setCbhsTotalPages(response.data.pageCnt);
                } else if (category === 'council') {
                    setCouncilData(response.data.postList);
                    setData(response.data.postList);
                    setCouncilTotalPages(response.data.pageCnt);
                }
                setCurrentPage(response.data.curPage);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPosts(currentPage);
    }, []);

    // 페이지 변경 함수
    const onPageChange = (newPage) => {
        fetchPosts(newPage);
    };

    // 자율회 공지사항 글쓰기
    const [isModalVisible, setModalVisible] = useState(false);

    const handleOpenNewPost = () => {
        setModalVisible(true);
    };

    const handleCloseNewPost = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
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
                    <TouchableOpacity onPress={handleOpenNewPost}>
                        <AntDesign name="form" style={select.writeText} />
                    </TouchableOpacity>
                )}
            </View>

            <NewPost
                isVisible={isModalVisible}
                onClose={handleCloseNewPost}
                council= 'true'
            />

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
                totalPages={cbhsTotalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fff",
        flex: 1,
        paddingBottom: 60
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