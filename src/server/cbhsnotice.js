import { AxiosResponse } from "axios";
import { apiBe } from ".";

export const getNoticeIdData = async (id) => {
    const { data } = await apiBe(`/notice/${id}`);
    return data;
};