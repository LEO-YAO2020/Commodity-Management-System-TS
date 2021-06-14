export interface IResponse <T = any>{
  status: number;
  msg?: string;
  data: T;
}


