import { AxiosResponse } from "axios";
import { apiBe } from ".";

export const getNoticeIdData = async (id) => {
  const { data } = await apiBe.get(`/board/post/detail/${id}/`);
  return data;
};
