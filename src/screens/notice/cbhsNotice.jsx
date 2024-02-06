import React from 'react';
import { View } from "react-native";
import Pagination from '../../components/notice/pagination';
import Noticebox from '../../components/notice/noticebox';

export default function CbhsNotice() {
  return (
    <View >
      <Noticebox/>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </View>
  );
}