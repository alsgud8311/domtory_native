import { apiBe } from ".";

//내가 쓴 댓글이 들어있는 글 리스트
export const getMyCommentList = async () => {
  try {
    const { data } = await apiBe.get(`/board/mypage/comment/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

//내가 쓴 글 리스트
export const getMyPostList = async () => {
  try {
    const { data } = await apiBe.get(`/board/mypage/post/`);
    console.log;
    if (data) {
      return { success: true, postData: data };
    }
    return {
      success: false,
      postData: "정보를 가져오는 중에 오류가 발생했습니다",
    };
  } catch (error) {
    return { success: false, postData: error.response.data };
  }
};
