import React from "react";
import MyPostBoard from "../../../components/mypage/mypageandcommentboard";

export default function MyComment({ navigation }) {
  return <MyPostBoard post={"comment"} navigation={navigation} />;
}
