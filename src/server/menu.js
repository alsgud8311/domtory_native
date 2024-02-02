import { AxiosResponse } from "axios";
import { apiBe } from ".";

export const getAllMenuData = async (date) => {
  const { data } = await apiBe(`/menu/${date}`);
  return data;
};

export const getDateMenuData = async () => {
  const { data } = await apiBe(`menu/${date}/${timezone}/`);
  return data;
};
