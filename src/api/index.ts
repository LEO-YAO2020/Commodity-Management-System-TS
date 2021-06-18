import AXios from './myAxios';
import { CategoryAddInter, CategoryItems, CategoryUpdateInter } from '../lib/types/category';
import { IResponse } from '../lib/types/api';
import { LoginResponse } from '../lib/types/login';
import {
  ProductDetailInfo,
  ProductListInter,
  ProductListResInter,
  ProductSearchInter,
  ProductStatusInter,
  ProductStatusResInter,
} from '../lib/types/product';
import { UploadDelete } from '../lib/types/upload';

const creatUrl = (path: string | [], params?: {}): string => {
  const paths = typeof path === 'string' ? path : path.join('/');
  let name = '';
  if (params) {
    name = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return `${paths}?${name}`;
  }
  return `${paths}`;
};
export const reqLogin = (query: {
  username: string;
  password: string;
}): Promise<IResponse<LoginResponse>> => {
  const res = AXios.post('/login', query);
  return res;
};

export const reqCategoryList = (): Promise<IResponse<Array<CategoryItems>>> => {
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

export const reqProductList = (
  params: ProductListInter
): Promise<IResponse<ProductListResInter>> => {
  const url = creatUrl('/manage/product/list', params);
  const res = AXios.get(url);
  return res;
};

export const reqUpdateProdStatus = (
  params: ProductStatusInter
): Promise<IResponse<ProductStatusResInter>> => {
  const res = AXios.post('/manage/product/updateStatus', params);
  return res;
};

export const reqSearchProduct = (
  params: ProductSearchInter
): Promise<IResponse<ProductListResInter>> => {
  const { pageNum, pageSize, searchType, keyWord } = params;
  const url = creatUrl('/manage/product/search', { pageNum, pageSize, [searchType]: keyWord });
  const res = AXios.get(url);
  return res;
};

export const reqProdById = (params: {
  productId: string;
}): Promise<IResponse<ProductDetailInfo>> => {
  const { productId } = params;
  const url = creatUrl('/manage/product/info', { productId });
  const res = AXios.get(url);
  return res;
};

export const reqDeletePicture = (params: UploadDelete): Promise<IResponse<string>> => {
  const res = AXios.post('/manage/img/delete', params);
  return res;
};

export const reqAddProduct = (params: ProductDetailInfo): Promise<IResponse<string>> => {
  const res = AXios.post('/manage/product/add', params);
  return res;
};



