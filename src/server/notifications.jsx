import { apiBe } from ".";

export const getNotificationList = async () => {
  try {
    const response = await apiBe.get("push/list/");
    return { success: true, data: response.data };
  } catch (error) {
    console.log("get Notifications error", error.response);
    return { success: false, data: error };
  }
};

export const pushCheckUpdate = async (memberId, pushedAt) => {
  const data = {
    memberId: memberId,
    pushedAt: pushedAt,
  };
  try {
    const response = await apiBe.put("push/check/", data);
    return { success: true };
  } catch (error) {
    console.log(error.response);
    return { success: false };
  }
};

export const pushDelete = async (memberId, pushedAt) => {
  const data = {
    memberId: memberId,
    pushedAt: pushedAt,
  };

  try {
    await apiBe.delete("push/delete/", { data: data });
    return { success: true };
  } catch (error) {
    console.log(error.response);
    return { success: false };
  }
};

export const getPushDetail = async () => {
  try {
    const response = await apiBe.get("/push/notification-detail/");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error.response };
  }
};

export const putPushDetail = async (detailData) => {
  try {
    console.log(detailData);
    const response = await apiBe.put("/push/notification-detail/", detailData);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
