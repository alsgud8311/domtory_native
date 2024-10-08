import axios from "axios";
import { apiBe } from ".";
import { Alert } from "react-native";

//게시글 작성
export const writePost = async (boardId, formData) => {
  try {
    const reponse = await apiBe.post(
      `/board/post/create/${boardId}/`,
      formData,
      {
        headers: { "content-type": "multipart/form-data" },
      }
    );
    return { success: true };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

//게시글 상세 정보 가져오기
export const getPostDetail = async (
  postId: number
): Promise<{ success: boolean; data?: PostDetailType }> => {
  try {
    const { data } = await apiBe.get(`/board/post/detail/${postId}/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

// 좋아요 POST
export const postLike = async (postId) => {
  try {
    const { data } = await apiBe.post(`/board/post/like/${postId}/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
  } catch (error) {
    Alert.alert(error.response.data.detail);
    return;
  }
};

// 북마크 POST
export const postBookmark = async (postId) => {
  try {
    const { data } = await apiBe.post(`/board/post/bookmark/${postId}/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

// 게시글 수정
export const updatePost = async (postId, formData) => {
  try {
    const response = await apiBe.patch(
      `/board/post/update/${postId}/`,
      formData,
      {
        headers: { "content-type": "multipart/form-data" },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error };
  }
};

//게시글 삭제
export const deletePost = async (postId) => {
  try {
    const response = await apiBe.delete(`/board/post/delete/${postId}/`);
    return { success: true };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

//특정 게시판 게시글 리스트 받기
export const getPostList = async (boardId, page) => {
  let boardUrl;
  switch (boardId) {
    case "bookmark":
      // 북마크
      boardUrl = `/board/post/bookmark/list/?page=${page}`;
      break;
    case "hot":
      // 핫도토리 게시판
      boardUrl = `/board/post/paged/list/popular/?page=${page}`;
      break;
    case "mypost":
      // 내가 쓴 글 게시판
      boardUrl = `/board/mypage/paged/post/?page=${page}`;
      break;
    case "mycomment":
      // 내가 댓글 쓴 글 게시판
      boardUrl = `/board/mypage/paged/comment/?page=${page}`;
      break;
    default:
      boardUrl = `/board/post/paged/list/${boardId}/?page=${page}`;
      break;
  }
  try {
    const { data } = await apiBe.get(boardUrl);
    if (data) {
      return { success: true, data: data };
    }
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};

//자율회 게시판 리스트 받기
export const getCouncilNoticeList = async (pageId) => {
  try {
    const { data } = await apiBe.get(`/board/post/list/6/?page=${pageId}`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

//특정 게시판의 최근 5개 게시글 가져오기
export const getLatestPosts = async (boardId) => {
  try {
    const { data } = await apiBe.get(`/board/post/latest/${boardId}/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
  } catch (error) {
    console.log(error);
    return { success: false, data: error.response.data };
  }
};

//특정 게시판의 게시글 검색
export const searchPost = async (boardId, wordList) => {
  const searchData = {
    word_list: wordList,
  };
  try {
    const { data } = await apiBe.post(
      `/board/post/search/${boardId}/`,
      searchData
    );
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "검색 중에 오류가 발생했습니다" };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

//댓글 작성
export const postComment = async (postId, comment) => {
  const commentData = {
    body: comment,
  };
  try {
    const response = await apiBe.post(
      `/board/comment/create/${postId}/`,
      commentData
    );
    return { success: true };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

//댓글 삭제
export const deleteComment = async (commentId) => {
  try {
    const response = await apiBe.delete(`/board/comment/delete/${commentId}/`);
    return { success: true };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

//대댓글 작성
export const postReply = async (commentId, reply) => {
  const replyData = {
    body: reply,
  };
  try {
    const response = await apiBe.post(
      `/board/reply/create/${commentId}/`,
      replyData
    );

    return { success: true };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

//대댓글 삭제
export const deleteReply = async (commentId) => {
  try {
    const response = await apiBe.delete(`/board/reply/delete/${commentId}/`);
    return { success: true };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

// 신고
export const report = async (type, id) => {
  try {
    const { data } = await apiBe.post(`/report/${type}/${id}/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "신고 처리중 오류가 발생했습니다" };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

// 게시글 블락
export const block = async (postOrCommentId, type) => {
  const data = {
    postOrCommentId: postOrCommentId,
    type: type,
  };
  try {
    const response = await apiBe.post(`/report/block/`, data);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// 인기게시글 가져오기
export const getPopularpost = async () => {
  try {
    const response = await apiBe.get(`/board/post/paged/list/popular/`);
    return { success: true, data: response.data };
  } catch {
    console.log(error);
    return { success: false };
  }
};

// 댓글 좋아요 POST
export const postCommentLike = async (commentId) => {
  try {
    const { data } = await apiBe.post(`/board/comment/like/${commentId}/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};
