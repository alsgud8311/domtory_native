import axios from "axios";
import { apiBe } from ".";

export const postMessage = async (userId, body) => {
    try {
        const reponse = await apiBe.post(`/message/send/${userId}/`, body);
        return { success: true };
    } catch (error) {
        return { success: false, data: error.response.data };
    }
};

export const getMessageList = async () => {
    try {
        const { data } = await apiBe.get(`/message/list/`);
        if (data) {
            return { success: true, data: data };
        }
        return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
    } catch (error) {
        return { success: false, data: error.response.data };
    }
};

export const getMessageDetail = async (MessageId) => {
    try {
        const { data } = await apiBe.get(`/message/detail/${MessageId}/`);
        if (data) {
            return { success: true, data: data };
        }
        return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
    } catch (error) {
        return { success: false, data: error.response.data };
    }
};

export const patchReadMessage = async (MessageId) => {
    try {
        const { data } = await apiBe.patch(`/message/detail/${MessageId}/`);
        if (data) {
            return { success: true, data: data };
        }
        return { success: false, data: "정보를 가져오는 중에 오류가 발생했습니다" };
    } catch (error) {
        return { success: false, data: error.response.data };
    }
};

export const deleteMessage = async (MessageId) => {
    try {
        const response = await apiBe.delete(`/message/delete/${MessageId}/`);
        return { success: true };
    } catch (error) {
        return { success: false, data: error.response.data };
    }
};

export const blockMessage = async (id, req_id, tar_id) => {
    const data = {
        id: id,
        req_id: req_id,
        tar_id: tar_id
    };
    try {
        const response = await apiBe.post(`/message/block/${id}/`, data);
        return { success: true };
    } catch (error) {
        return { success: false };
    }
};