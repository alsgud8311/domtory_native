import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
        pageNumbers.push(i);
    }

    return (
        <View style={styles.paginationContainer}>
            <TouchableOpacity
                disabled={currentPage === 1}
                onPress={() => onPageChange(1)}
            >
                <Text style={styles.pageArrow}>&laquo;</Text>
            </TouchableOpacity>
            <TouchableOpacity
                disabled={currentPage === 1}
                onPress={() => onPageChange(currentPage - 1)}
            >
                <Text style={styles.pageArrow}>&lt;</Text>
            </TouchableOpacity>
            {pageNumbers.map(number => (
                <TouchableOpacity
                    key={number}
                    onPress={() => onPageChange(number)}
                    style={currentPage === number ? styles.pageNumActive : styles.pageNum}
                >
                    <Text>{number}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity
                disabled={currentPage === totalPages}
                onPress={() => onPageChange(currentPage + 1)}
            >
                <Text style={styles.pageArrow}>&gt;</Text>
            </TouchableOpacity>
            <TouchableOpacity
                disabled={currentPage === totalPages}
                onPress={() => onPageChange(totalPages)}
            >
                <Text style={styles.pageArrow}>&raquo;</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageArrow: {
        margin: 8,
        paddingVertical: 10,
        paddingHorizontal: 5,
        fontSize: 25,
        fontWeight: '300'
    },
    pageNum: {
        margin: 3,
        paddingVertical: 8,
        paddingHorizontal: 13,
        height: 40,
        width: 40,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    pageNumActive: {
        margin: 3,
        paddingVertical: 9,
        paddingHorizontal: 13,
        borderRadius: 50,
        backgroundColor: 'rgba(182, 182, 182, 0.6)',
        height: 42,
        width: 42,
        justifyContent: 'center', 
        alignItems: 'center',
    },
});

export default Pagination;
