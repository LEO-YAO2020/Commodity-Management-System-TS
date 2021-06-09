import { apiGetResponse, apiPostResponse } from './myAxios'

export const reqLogin = async (query: { username: string; password: string }) => {
  const res = await apiPostResponse('/login', query);
  return res;
};

export const reqCategoryList = async () => {
  const res = await apiGetResponse('/manage/category/list');
  return res;
};



