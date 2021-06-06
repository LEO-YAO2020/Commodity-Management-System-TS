import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { userInfo, deleteUserInfo } from '../../redux/reducers/login_reducer';
import { Redirect, RouteComponentProps } from 'react-router';
import { Button } from 'antd';

function Admin(props: RouteComponentProps) {
  const { user, isLogin } = useAppSelector(userInfo);
  const dispatch = useAppDispatch();
  useEffect(() => {}, []);

  const logout = () => {
    localStorage.clear();
    dispatch(deleteUserInfo());
  };
  if (!isLogin) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        我是Admin组件，用户名 {user.username}
        <Button
          onClick={() => {
            logout();
          }}
        >
          退出
        </Button>
      </div>
    );
  }
}

export default Admin;
