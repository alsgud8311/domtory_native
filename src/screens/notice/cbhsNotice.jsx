import React from 'react';
import { View } from "react-native";
import Noticebox from '../../components/notice/noticebox';

export default function CbhsNotice({navigation}) {
  return (
      <Noticebox navigation={navigation}/>
  );
}