import{ apiGetResponse, apiPostResponse } from './myAxios';
import { CategoryInter } from '../lib/types/category';
import { IResponse } from '../lib/types/api';

export const reqLogin = async (query: { username: string; password: string }) => {
  const res = await apiPostResponse('/login', query);
  return res;
};

export const reqCategoryList = async (): Promise<IResponse> => {
  const res = await apiGetResponse('/manage/category/list');
  return res;
};

export const reqUpdateCategory = async (params: CategoryInter) => {
  const res = await apiPostResponse(`/manage/category/update`, params);
  return res;
};
