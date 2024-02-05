import { AxiosResponse } from "axios";
import { apiBe } from ".";
import getDate from "../utils/getDate";

export const getAllMenuData = async (date) => {
  const { data } = await apiBe(`/menu/${date}/total`);
  return data;
};

export const getBreakMenuData = async (date) => {
  const { data } = await apiBe(`/menu/${date}/breakfast`);
  return data;
};

export const getLunchMenuData = async (date) => {
  const { data } = await apiBe(`/menu/${date}/lunch`);
  return data;
};

export const getDinnerMenuData = async (date) => {
  const { data } = await apiBe(`/menu/${date}/dinner`);
  return data;
};

export const getDateMenuData = async () => {
  const { date, dayDiv, dateForApi, dayDivForApi, hour } = getDate();

  let menuList;
  try {
    const response = apiBe.get(`/menu/${dateForApi}/${dayDivForApi}/`);
    const menuData = response.data;
    if (data) {
      if (hour >= 0 && hour <= 8) {
        menuList = menuData[0].breakfast_list;
      } else if (hour >= 9 && hour <= 13) {
        menuList = menuData[0].lunch_list;
      } else if (hour >= 14 && hour <= 20) {
        menuList = menuData[0].dinner_list;
      } else if (hour >= 21 && hour <= 24) {
        menuList = menuData[0].breakfast_list;
      }
    }
    return { menuList: menuList, formatedDate: date, dayDiv: dayDiv };
  } catch (error) {
    return {
      menuList: ["현재 정보를 가져올 수 없습니다."],
      formatedDate: date,
      dayDiv: dayDiv,
      error: error,
    };
  }
};
