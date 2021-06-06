import React from 'react';
import { Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch,useAppSelector } from '../../redux/reduxHooks';
import { saveUserInfo,userInfo } from '../../redux/reducers/login_reducer';
import { reqLogin } from '../../api/index';
import { LoginType } from '../../lib/types/login';
import { Redirect, RouteComponentProps } from 'react-router';
const LoginStyle = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/image/bg.jpg');
  background-size: cover;
  section {
    width: 400px;
    height: 300px;
    background-color: white;
    margin: 0 auto;
    margin-top: 10%;
    padding: 30px;
    h1 {
      font-size: 25px;
      text-align: center;
    }
    .login-form-button {
      width: 100%;
    }
  }
`;
const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: rgba(21, 20, 13, 0.5);
  img {
    width: 40px;
    height: 40px;
    margin: 10px;
  }
  h1 {
    color: white;
    font-size: 30px;
    margin: 0;
  }
`;

const Login = (props: RouteComponentProps) => {
  const dispatch = useAppDispatch();
  const {isLogin} = useAppSelector(userInfo)
  const onFinish = async (values: { username: string; password: string }) => {
    //dispatch(Test1({ data: 1 }));
    //const {username,password} = values
    let result: LoginType = await reqLogin(values);
    const { status, msg, data } = result;
    if (status === 0) {
      //store.setUserInfo(data)
      console.log(data);
      localStorage.setItem('user',JSON.stringify(data.user))
      localStorage.setItem('token',data.token)
      localStorage.setItem('isLogin','true')
      dispatch(saveUserInfo(data));
      props.history.replace('/admin');
    } else {
      message.warning(msg || '');
    }
  };
  
  if (isLogin) {
    return <Redirect to='/admin'/>
  }
  return (
    <LoginStyle>
      <HeaderStyle>
        <img src={'/image/logo.png'} alt="" />
        <h1>Commodity Management System</h1>
      </HeaderStyle>
      <section>
        <h1>用户登录</h1>
        <Form name="normal_login" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please input your Username!' },
              { max: 12, min: 4 },
              { pattern: /^\w+$/, message: 'Must be letters, numbers, underscores' },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item name="password">
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </section>
    </LoginStyle>
  );
};

export default Login;
