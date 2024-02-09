import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from "react-native";


const renderItem = ({ item }) => {
    return (
        <TouchableOpacity>
            <View style={styles.item}>
                <View style={{ flexDirection: 'column', marginBottom: 5 }}>
                    {/* 유저, 작성일 */}
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Text style={styles.user}>{item.user}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                    </View>
                    {/* 제목, 내용 */}
                    <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.content}>{item.content}</Text>
                    </View>
                </View>
                {/* 사진 */}
                {item.img && <Image source={{ uri: item.img }} style={styles.image} />}
            </View>
        </TouchableOpacity>
    );
};

export default function Board() {
    const data = [
        {
            'id': 1,
            'title': '멋사 어떰?',
            'content': '멋사 지원하려고 하는데 해본 사람',
            'date': '2024-02-07',
            'user': 'umji',
            'img': 'https://logo-resources.thevc.kr/products/200x200/866610da5e81de066cc925768458dedabbfdf41916e6b7143094e4362b9370f5_1619092921783967.jpg',
        },
        {
            'id': 2,
            'title': '멋사 어떰?',
            'content': '멋사 지원하려고 하는데 해본 사람',
            'date': '2024-02-07',
            'user': 'umji',
            'img': '',
        },
        {
            'id': 3,
            'title': '멋사 어떰?',
            'content': '멋사 지원하려고 하는데 해본 사람',
            'date': '2024-02-07',
            'user': 'umji',
            'img': '',
        },
        {
            'id': 4,
            'title': '멋사 어떰?',
            'content': '멋사 지원하려고 하는데 해본 사람',
            'date': '2024-02-07',
            'user': 'umji',
            'img': 'https://logo-resources.thevc.kr/products/200x200/866610da5e81de066cc925768458dedabbfdf41916e6b7143094e4362b9370f5_1619092921783967.jpg',
        },
        {
            'id': 5,
            'title': '멋사 어떰?',
            'content': '멋사 지원하려고 하는데 해본 사람',
            'date': '2024-02-07',
            'user': 'umji',
            'img': '',
        },
        {
            'id': 6,
            'title': '멋사 어떰?',
            'content': '멋사 지원하려고 하는데 해본 사람',
            'date': '2024-02-07',
            'user': 'umji',
            'img': '',
        },
        {
            'id': 7,
            'title': '멋사 어떰?',
            'content': '멋사 지원하려고 하는데 해본 사람',
            'date': '2024-02-07',
            'user': 'umji',
            'img': 'https://logo-resources.thevc.kr/products/200x200/866610da5e81de066cc925768458dedabbfdf41916e6b7143094e4362b9370f5_1619092921783967.jpg',
        },
        {
            'id': 8,
            'title': '멋사 어떰?',
            'content': '멋사 지원하려고 하는데 해본 사람',
            'date': '2024-02-07',
            'user': 'umji',
            'img': '',
        },
        {
            'id': 9,
            'title': '멋사 어떰?',
            'content': '멋사 지원하려고 하는데 해본 사람',
            'date': '2024-02-07',
            'user': 'umji',
            'img': '',
        },
        {
            'id': 10,
            'title': '멋사 어떰?',
            'content': '멋사 지원하려고 하는데 해본 사람',
            'date': '2024-02-07',
            'user': 'umji',
            'img': 'https://logo-resources.thevc.kr/products/200x200/866610da5e81de066cc925768458dedabbfdf41916e6b7143094e4362b9370f5_1619092921783967.jpg',
        },
        {
            'id': 11,
            'title': '멋사 어떰?',
            'content': '멋사 지원하려고 하는데 해본 사람',
            'date': '2024-02-07',
            'user': 'umji',
            'img': '',
        },
        {
            'id': 12,
            'title': '멋사 어떰?',
            'content': '멋사 지원하려고 하는데 해본 사람',
            'date': '2024-02-07',
            'user': 'umji',
            'img': '',
        },
    ]

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingVertical: 20 }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fff",
        flex: 1,
    },
    item: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        padding: 15,
        marginVertical: 6,
        marginHorizontal: 10,
        shadowColor: "#5a5a5a",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.13,
        shadowRadius: 8,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    date: {
        fontSize: 10,
    },
    user: {
        fontSize: 10,
        marginRight: 5
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 2.5
    },
    content: {
        fontSize: 14,
    },
    image: {
        width: 60, // 이미지 너비 설정.
        height: 60,
        borderRadius: 5
    }
});