var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AxiosResponse } from "axios";
import { apiBe } from ".";
export const getNoticeIdData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield apiBe(`/notice/${id}/`);
    return data;
});
//페이지네이션 공지사항 데이터 받기
export const getNoticePageData = (pageId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield apiBe(`/notice?page=${pageId}`);
        return { success: true, data: response.data };
    }
    catch (error) {
        console.log(error);
        return { success: false };
    }
});
