import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
        pageNumbers.push(i);
    }

    return (
        <View style={styles.paginationContainer}>
            <TouchableOpacity disabled={currentPage === 1} onPress={() => onPageChange(1)}>
                <AntDesign name="doubleleft" style={styles.pageArrow} />
            </TouchableOpacity>

            <TouchableOpacity disabled={currentPage === 1} onPress={() => onPageChange(currentPage - 1)}>
                <AntDesign name="left" style={styles.pageArrow} />
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

            <TouchableOpacity disabled={currentPage === totalPages} onPress={() => onPageChange(currentPage + 1)}>
                <AntDesign name="right" style={styles.pageArrow} />
            </TouchableOpacity>

            <TouchableOpacity disabled={currentPage === totalPages} onPress={() => onPageChange(totalPages)}>
                <AntDesign name="doubleright" style={styles.pageArrow} />
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
        fontSize: 17,
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
