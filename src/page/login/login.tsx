import React from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
export interface LoginProps {}

export interface LoginState {}

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

class Login extends React.Component<LoginProps, LoginState> {
  render() {
    const onFinish = (values: any) => {
      console.log('Success:', values);
    };

    return (
      <LoginStyle>
        <HeaderStyle>
          <img src={'/image/logo.png'} alt="" />
          <h1>Commodity Management System</h1>
        </HeaderStyle>
        <section>
          <h1>用户登录</h1>
          <Form name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
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
            <Form.Item
              name="password"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    } else if (value.length > 12) {
                      return Promise.reject(new Error('The password must be less than 12!'));
                    } else if (value.length < 4) {
                      return Promise.reject(new Error('The password must be more than 4!'));
                    } else if (!/^\w+$/.test(value)) {
                      return Promise.reject(new Error('Must be letters, numbers, underscores'));
                    }
                  },
                },
              ]}
            >
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
  }
}

export default Login;
