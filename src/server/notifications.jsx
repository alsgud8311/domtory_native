import { apiBe } from ".";

export const getNotificationList = async () => {
  try {
    const response = await apiBe.get("push/list/");
    return { success: true, data: response.data };
  } catch (error) {
    console.log("get Notifications error", error);
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
    console.log(error);
    return { success: false };
  }
};
