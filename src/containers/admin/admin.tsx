import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Layout } from 'antd';
import styled from 'styled-components';
import {  useAppSelector } from '../../redux/reduxHooks';
import { userInfo } from '../../redux/reducers/login_reducer';
import Header from './header/header';
import Home from '../../components/home/home';
import Category from '../category/category';
import Product from '../product/product';
import User from '../user/user';
import Role from '../role/role';
import Bar from '../bar/bar';
import Line from '../line/line';
import Pie from '../pie/pie';
import LeftMenu from './left_nav/left_nav'

const { Footer, Sider, Content } = Layout;

const LayoutStyle = styled(Layout)`
  height: 100%;
  .sider {
    color: white;
  }
  .content {
    background: white;
    margin: 20px 20px 0 20px;
  }
  .footer {
    text-align: center;
  }
`;

function Admin() {
  const { isLogin } = useAppSelector(userInfo);



  if (!isLogin) {
    return <Redirect to="/login" />;
  } else {
    return (
      <LayoutStyle>
        <Sider className="sider">
          <LeftMenu/>
        </Sider>
        <Layout>
          <Header />
          <Content className="content">
            <Switch>
              <Route path="/admin/home" component={Home}/>
              <Route path="/admin/prod_about/category" component={Category}/>
              <Route path="/admin/prod_about/product" component={Product}/>
              <Route path="/admin/user" component={User}/>
              <Route path="/admin/role" component={Role}/>
              <Route path="/admin/charts/bar" component={Bar}/>
              <Route path="/admin/charts/line" component={Line}/>
              <Route path="/admin/charts/pie" component={Pie}/>
              <Redirect to="/admin/home"/>
            </Switch>
          </Content>
          <Footer className="footer">Created by LeoYao @2021</Footer>
        </Layout>
      </LayoutStyle>
    );
  }
}

export default Admin;
