export const getFCMToken = async () => {
  let token = null;
  await checkApplicationNotificationPermission();
  await registerAppWithFCM();
  try {
    token = await messaging().getToken();
    console.log("FCM TOKEN:");
  } catch (error) {
    console.log("getToken Device Token Error", error);
  }
};

export async function registerAppWithFCM() {
  console.log(
    "registerAppwithFCM status",
    messaging().isDeviceRegisteredForRemoteMessages
  );
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .registerDeviceForRemoteMessages()
      .then((status) => {
        console.log("registerDeviceForRemoteMessages status", status);
      })
      .catch((error) => {
        console.log("registerDeviceForRemoteMessages Error", error);
      });
  }
}
