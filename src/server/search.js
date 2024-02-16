import { AxiosResponse } from "axios";
import { apiBe } from ".";

export const getSearhedData = async () => {
    const requestBody = {
        word_list: ["test"]
    };

    const { data } = await apiBe.post(`/board/post/search/0/`, requestBody);

    return data;
};
