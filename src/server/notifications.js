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
export const getNotificationList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield apiBe.get("push/list/");
        return { success: true, data: response.data };
    }
    catch (error) {
        console.log("get Notifications error", error.response);
        return { success: false, data: error };
    }
});
export const pushCheckUpdate = (memberId, pushedAt) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        memberId: memberId,
        pushedAt: pushedAt,
    };
    try {
        const response = yield apiBe.put("push/check/", data);
        return { success: true };
    }
    catch (error) {
        console.log(error.response);
        return { success: false };
    }
});
export const pushDelete = (memberId, pushedAt) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        memberId: memberId,
        pushedAt: pushedAt,
    };
    try {
        yield apiBe.delete("push/delete/", { data: data });
        return { success: true };
    }
    catch (error) {
        console.log(error.response);
        return { success: false };
    }
});
export const getPushDetail = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield apiBe.get("/push/notification-detail/");
        return { success: true, data: response.data };
    }
    catch (error) {
        return { success: false, data: error.response };
    }
});
export const putPushDetail = (detailData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(detailData);
        const response = yield apiBe.put("/push/notification-detail/", detailData);
        return { success: true };
    }
    catch (error) {
        console.log(error);
        return { success: false };
    }
});
