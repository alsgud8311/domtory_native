import { AxiosResponse } from "axios";
import { apiBe } from ".";

export const getNoticeIdData = async (id) => {
  try {
    const { data } = await apiBe.get(`/notice/${id}/`);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

//페이지네이션 공지사항 데이터 받기
export const getNoticePageData = async (pageId) => {
  try {
    const response = await apiBe.get(`/notice/?page=${pageId}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error.response);
    return { success: false };
  }
};
