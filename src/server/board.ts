import { apiBe } from ".";
type ReturnTypeWithData = {
  success: boolean;
  data: object | string;
};
type ReturnTypeWithNoData = {
  success: boolean;
};
interface CustomError extends Error {
  response?: {
    data: any;
    status: number;
    headers: string;
  };
}
//게시글 작성
export const writePost = async (
  boardId: number,
  formData: FormData
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
  try {
    await apiBe.post(`/board/post/create/${boardId}/`, formData, {
      headers: { "content-type": "multipart/form-data" },
    });
    return { success: true };
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

//게시글 상세 정보 가져오기
export const getPostDetail = async (
  postId: number
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
  try {
    const { data } = await apiBe.get(`/board/post/detail/${postId}/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

// 좋아요 POST
export const postLike = async (
  postId: number
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
  try {
    const { data } = await apiBe.post(`/board/post/like/${postId}/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

// 북마크 POST
export const postBookmark = async (
  postId: number
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
  try {
    const { data } = await apiBe.post(`/board/post/bookmark/${postId}/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

// 게시글 수정
export const updatePost = async (
  postId: number,
  formData: FormData
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
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
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

//게시글 삭제
export const deletePost = async (
  postId: number
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
  try {
    await apiBe.delete(`/board/post/delete/${postId}/`);
    return { success: true };
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

//특정 게시판 게시글 리스트 받기
export const getPostList = async (
  boardId: number,
  page: number
): Promise<ReturnTypeWithData | ReturnTypeWithNoData> => {
  let boardUrl: string;
  switch (boardId) {
    case 6:
      // 북마크
      boardUrl = `/board/post/bookmark/list/?page=${page}`;
      break;
    case 7:
      // 핫도토리 게시판
      boardUrl = `/board/post/paged/list/popular/?page=${page}`;
      break;
    case 8:
      // 내가 쓴 글 게시판
      boardUrl = `/board/mypage/paged/post/?page=${page}`;
      break;
    case 9:
      // 내가 댓글 쓴 글 게시판
      boardUrl = `/board/mypage/paged/comment/?page=${page}`;
    default:
      boardUrl = `/board/post/paged/list/${boardId}/?page=${page}`;
      break;
  }
  try {
    const { data } = await apiBe.get(boardUrl);
    if (data) {
      return { success: true, data: data };
    } else {
      throw new Error("http request succeed but no data");
    }
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

//자율회 게시판 리스트 받기
export const getCouncilNoticeList = async (
  pageId: number
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
  try {
    const { data } = await apiBe.get(`/board/post/list/6/?page=${pageId}`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

//특정 게시판의 최근 5개 게시글 가져오기
export const getLatestPosts = async (
  boardId: number
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
  try {
    const { data } = await apiBe.get(`/board/post/latest/${boardId}/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

//특정 게시판의 게시글 검색
export const searchPost = async (
  boardId: number,
  wordList: Array<string>
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
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
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

//댓글 작성
export const postComment = async (
  postId: number,
  comment: string
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
  const commentData = {
    body: comment,
  };
  try {
    await apiBe.post(`/board/comment/create/${postId}/`, commentData);
    return { success: true };
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

//댓글 삭제
export const deleteComment = async (
  commentId: number
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
  try {
    await apiBe.delete(`/board/comment/delete/${commentId}/`);
    return { success: true };
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

//대댓글 작성
export const postReply = async (
  commentId: number,
  reply: string
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
  const replyData = {
    body: reply,
  };
  try {
    await apiBe.post(`/board/reply/create/${commentId}/`, replyData);

    return { success: true };
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

//대댓글 삭제
export const deleteReply = async (
  commentId: number
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
  try {
    await apiBe.delete(`/board/reply/delete/${commentId}/`);
    return { success: true };
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

// 신고
export const report = async (
  type: string,
  id: number
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
  try {
    const { data } = await apiBe.post(`/report/${type}/${id}/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "신고 처리중 오류가 발생했습니다" };
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

// 게시글 블락
export const block = async (
  postOrCommentId: number,
  type: string
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
  const data = {
    postOrCommentId: postOrCommentId,
    type: type,
  };
  try {
    await apiBe.post(`/report/block/`, data);
    return { success: true };
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

// 인기게시글 가져오기
export const getPopularpost = async (): Promise<
  ReturnTypeWithNoData | ReturnTypeWithData
> => {
  try {
    const response = await apiBe.get(`/board/post/paged/list/popular/`);
    return { success: true, data: response.data };
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};

// 댓글 좋아요 POST
export const postCommentLike = async (
  commentId: number
): Promise<ReturnTypeWithNoData | ReturnTypeWithData> => {
  try {
    const { data } = await apiBe.post(`/board/comment/like/${commentId}/`);
    if (data) {
      return { success: true, data: data };
    }
    return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
  } catch (error) {
    const customErr = error as CustomError;
    return { success: false, data: customErr.response?.data };
  }
};
