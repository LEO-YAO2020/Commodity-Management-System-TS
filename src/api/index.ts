import AXios from './myAxios';
import { CategoryAddInter, CategoryUpdateInter } from '../lib/types/category';
import { IResponse } from '../lib/types/api';
import { LoginResponse } from '../lib/types/login';

// const creatUrl = (path: string | [], params?: {}): string => {
//   const paths = typeof path === 'string' ? path : path.join('/');
//   let name = '';
//   if (params) {
//     name = Object.entries(params)
//       .map(([key, value]) => `${key}=${value}`)
//       .join('&');
//     return `${paths}?${name}`;
//   }
//   return `${paths}`;
// };
export const reqLogin = (query: {
  username: string;
  password: string;
}): Promise<IResponse<LoginResponse>> => {
  const res = AXios.post('/login', query);
  return res;
};

export const reqCategoryList = (): Promise<IResponse<[]>> => {
  const res = AXios.get('/manage/category/list');
  return res;
};

export const reqAddCategory = (params: CategoryAddInter): Promise<IResponse<object>> => {
  const res = AXios.post('/manage/category/add', params);
  return res;
};

export const reqUpdateCategory = (params: CategoryUpdateInter): Promise<IResponse<object>> => {
  const res = AXios.post('/manage/category/update', params);
  return res;
};
