export interface UserResType {
  _id: '';
  username: '';
  password: '';
  phone: '';
  email: '';
  role_id: '';
  create_time: Number;
}
export interface RoleResType {
  menus: string[];
  _id: '';
  name: '';
  create_time: Number;
  __v: 0;
  auth_time: Number;
  auth_name: '';
}

export interface UserReqInter {
  username: string;
  password: string;
  phone: string;
  email: string;
  role_id: string;
}
