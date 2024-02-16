import { AxiosResponse } from "axios";
import { apiBe } from ".";

export const getNoticeIdData = async (id) => {
  const { data } = await apiBe(`/notice/${id}/`);
  return data;
};

//페이지네이션 공지사항 데이터 받기
export const getNoticePageData = async (pageId) => {
  try {
    const response = await apiBe(`/notice?page=${pageId}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
