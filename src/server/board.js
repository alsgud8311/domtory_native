import { apiBe } from ".";

//게시글 작성
export const writePost = async (boardId, images, title, body) => {
  const postData = {
    images: images,
    title: title,
    body: body,
  };
  try {
    const { data } = await apiBe.post(`/board/post/create/${boardId}/`, postData);
    return { success: true };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

//게시글 상세 정보 가져오기
export const getPostDetail = async (boardId) => {
  try {
    const { data } = await apiBe.get(`/board/post/detail/${boardId}/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

//게시글 수정
export const updatePost = async (
  postId,
  title,
  body,
  deletedImages,
  images
) => {
  const postData = {
    title: title,
    body: body,
    deletedImages: deletedImages,
    images: images,
  };
  try {
    const { data } = await apiBe.put(`/board/post/update/${postId}/`, postData);
    if (data) {
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

//게시글 삭제
export const deletePost = async (postId) => {
  try {
    const { data } = await apiBe.delete(`/board/post/delete/${postId}/`);
    if (data) {
      return { success: true };
    }
    return { success: false, data: "삭제 중에 오류가 발생했습니다" };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

//특정 게시판 게시글 리스트 받기
export const getPostList = async (boardId) => {
  try {
    const { data } = await apiBe.get(`/board/post/list/${boardId}/`);
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
    const { data } = await apiBe.post(`/board/comment/create/${postId}/`, commentData);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "댓글을 작성하는 중에 오류가 발생했습니다" };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

//댓글 삭제
export const deleteComment = async (commentId) => {
  try {
    const { data } = await apiBe.delete(`/board/comment/delete/${commentId}/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "댓글을 삭제하는 중에 오류가 발생했습니다" };
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
    const { data } = await apiBe.post(
      `/board/reply/create/${commentId}/`,
      replyData
    );
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "댓글을 작성하는 중에 오류가 발생했습니다" };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};

//대댓글 삭제
export const deleteReply = async (commentId) => {
  try {
    const { data } = await apiBe.delete(`/board/reply/delete/${commentId}/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "답글을 삭제하는 중에 오류가 발생했습니다" };
  } catch (error) {
    return { success: false, data: error.response.data };
  }
};
