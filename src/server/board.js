var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { apiBe } from ".";
//게시글 작성
export const writePost = (boardId, formData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reponse = yield apiBe.post(`/board/post/create/${boardId}/`, formData, {
            headers: { "content-type": "multipart/form-data" },
        });
        return { success: true };
    }
    catch (error) {
        return { success: false, data: error.response.data };
    }
});
//게시글 상세 정보 가져오기
export const getPostDetail = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield apiBe.get(`/board/post/detail/${postId}/`);
        if (data) {
            return { success: true, data: data };
        }
        return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
    }
    catch (error) {
        return { success: false, data: error.response.data };
    }
});
// 좋아요 POST
export const postLike = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield apiBe.post(`/board/post/like/${postId}/`);
        if (data) {
            return { success: true, data: data };
        }
        return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
    }
    catch (error) {
        return { success: false, data: error.response.data };
    }
});
// 북마크 POST
export const postBookmark = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield apiBe.post(`/board/post/bookmark/${postId}/`);
        if (data) {
            return { success: true, data: data };
        }
        return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
    }
    catch (error) {
        return { success: false, data: error.response.data };
    }
});
// 게시글 수정
export const updatePost = (postId, formData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield apiBe.patch(`/board/post/update/${postId}/`, formData, {
            headers: { "content-type": "multipart/form-data" },
        });
        return { success: true, data: response.data };
    }
    catch (error) {
        return { success: false, data: error };
    }
});
//게시글 삭제
export const deletePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield apiBe.delete(`/board/post/delete/${postId}/`);
        return { success: true };
    }
    catch (error) {
        return { success: false, data: error.response.data };
    }
});
//특정 게시판 게시글 리스트 받기
export const getPostList = (boardId, page) => __awaiter(void 0, void 0, void 0, function* () {
    let boardUrl;
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
        const { data } = yield apiBe.get(boardUrl);
        if (data) {
            return { success: true, data: data };
        }
    }
    catch (error) {
        console.log(error.response);
        return { success: false, data: error.response };
    }
});
//자율회 게시판 리스트 받기
export const getCouncilNoticeList = (pageId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield apiBe.get(`/board/post/list/6/?page=${pageId}`);
        if (data) {
            return { success: true, data: data };
        }
        return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
    }
    catch (error) {
        return { success: false, data: error.response.data };
    }
});
//특정 게시판의 최근 5개 게시글 가져오기
export const getLatestPosts = (boardId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield apiBe.get(`/board/post/latest/${boardId}/`);
        if (data) {
            return { success: true, data: data };
        }
        return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
    }
    catch (error) {
        console.log(error);
        return { success: false, data: error.response.data };
    }
});
//특정 게시판의 게시글 검색
export const searchPost = (boardId, wordList) => __awaiter(void 0, void 0, void 0, function* () {
    const searchData = {
        word_list: wordList,
    };
    try {
        const { data } = yield apiBe.post(`/board/post/search/${boardId}/`, searchData);
        if (data) {
            return { success: true, data: data };
        }
        return { success: false, data: "검색 중에 오류가 발생했습니다" };
    }
    catch (error) {
        return { success: false, data: error.response.data };
    }
});
//댓글 작성
export const postComment = (postId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    const commentData = {
        body: comment,
    };
    try {
        const response = yield apiBe.post(`/board/comment/create/${postId}/`, commentData);
        return { success: true };
    }
    catch (error) {
        return { success: false, data: error.response.data };
    }
});
//댓글 삭제
export const deleteComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield apiBe.delete(`/board/comment/delete/${commentId}/`);
        return { success: true };
    }
    catch (error) {
        return { success: false, data: error.response.data };
    }
});
//대댓글 작성
export const postReply = (commentId, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const replyData = {
        body: reply,
    };
    try {
        const response = yield apiBe.post(`/board/reply/create/${commentId}/`, replyData);
        return { success: true };
    }
    catch (error) {
        return { success: false, data: error.response.data };
    }
});
//대댓글 삭제
export const deleteReply = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield apiBe.delete(`/board/reply/delete/${commentId}/`);
        return { success: true };
    }
    catch (error) {
        return { success: false, data: error.response.data };
    }
});
// 신고
export const report = (type, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield apiBe.post(`/report/${type}/${id}/`);
        if (data) {
            return { success: true, data: data };
        }
        return { success: false, data: "신고 처리중 오류가 발생했습니다" };
    }
    catch (error) {
        return { success: false, data: error.response.data };
    }
});
// 게시글 블락
export const block = (postOrCommentId, type) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        postOrCommentId: postOrCommentId,
        type: type,
    };
    try {
        const response = yield apiBe.post(`/report/block/`, data);
        return { success: true };
    }
    catch (error) {
        return { success: false };
    }
});
// 인기게시글 가져오기
export const getPopularpost = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield apiBe.get(`/board/post/paged/list/popular/`);
        return { success: true, data: response.data };
    }
    catch (_a) {
        console.log(error);
        return { success: false };
    }
});
// 댓글 좋아요 POST
export const postCommentLike = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield apiBe.post(`/board/comment/like/${commentId}/`);
        if (data) {
            return { success: true, data: data };
        }
        return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
    }
    catch (error) {
        return { success: false, data: error.response.data };
    }
});
