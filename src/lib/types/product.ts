export interface ProductListInter {
  pageNum: number;
  pageSize: number;
}

export interface ProductListResInter {
  list: [];
  pageNum: number;
  pageSizer: number;
  pages: number;
  total: number;
}

export interface ProductStatusInter {
  productId: Number;
  status: number;
}

export interface ProductStatusResInter {
  status: number;
}

export interface ProductSearchInter {
  pageNum: number;
  pageSize: number;
  searchType: string;
  keyWord: string;
}

export interface ProductListItems {
  _id?:Number
  categoryId:string,
  desc:string,
  detail:string,
  imgs:[],
  name:string,
  price:string,
}

export interface ProductDetailInfo {
  categoryId: string
  desc: string
  detail: string
  imgs: []
  name: string
  price: string
  status: number
  _id: string
}