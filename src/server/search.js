import { AxiosResponse } from "axios";
import { apiBe } from ".";

export const getSearhedData = async (inputList, board) => {

    const { data } = await apiBe.post(`/board/post/search/${board}/`, {word_list: inputList});

    return data;
};
