import { apiBe } from ".";

// 자율회 공지사항 get
export const getCouncilNotice = async () => {
    try {
        const { data } = await apiBe.get(`/board/post/list/6/`);
        if (data) {
            return { success: true, data: data };
        }
        return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
    } catch (error) {
        return { success: false, data: error.response.data };
    }
};

// 자율회 게시글 작성
export const writeCouncilPost = async (formData) => {
    try {
        const reponse = await apiBe.post(`/board/post/create/${boardId}/`, formData, {
            headers: { "content-type": "multipart/form-data" },
        });
        return { success: true };
    } catch (error) {
        return { success: false, data: error.response.data };
    }
};