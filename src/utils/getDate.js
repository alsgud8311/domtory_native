import { apiBe } from "../server";

async function getMenuData() {
  const today = new Date();
  const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dayOfWeek = week[today.getDay()];
  const hour = today.getHours();
  let dayDivForApi;
  let dayDiv;

  if (hour <= 7 && hour >= 0) {
    dayDiv = "아침";
    dayDivForApi = "breakfast";
  } else if (hour >= 8 && hour <= 12) {
    dayDiv = "점심";
    dayDivForApi = "lunch";
  } else if (hour >= 13 && hour <= 19) {
    dayDiv = "저녁";
    dayDivForApi = "dinner";
  } else if (hour >= 20 && hour <= 23) {
    dayDiv = "아침";
    dayDivForApi = "breakfast";
    today.setDate(today.getDate() + 1);
  }

  const formatedDate = `${today.getMonth() + 1}.${today.getDate()}(${
    week[today.getDay()]
  })`;

  const formatedDateForApi = `${today
    .getFullYear()
    .toString()
    .slice(-2)}${String(today.getMonth() + 1).padStart(2, "0")}${String(
    today.getDate()
  ).padStart(2, "0")}`;

  let menuData;
  let menuList;
  try {
    menuData = await getDateMenuData(formatedDateForApi, dayDivForApi);
    if (menuData) {
      if (hour >= 0 && hour <= 8) {
        menuList = menuData[0].breakfast_list || [];
      } else if (hour >= 9 && hour <= 13) {
        menuList = menuData[0].lunch_list || [];
      } else if (hour >= 14 && hour <= 20) {
        menuList = menuData[0].dinner_list || [];
      } else if (hour >= 21 && hour <= 24) {
        menuList = menuData[0].breakfast_list || [];
      }
    }
  } catch (error) {
    console.error(error);
    return {
      menuList: ["현재 정보를 가져올 수 없습니다."],
      formatedDate: formatedDate,
      dayDiv: dayDiv,
    };
  }
  return { menuList, formatedDate, dayDiv };
}
