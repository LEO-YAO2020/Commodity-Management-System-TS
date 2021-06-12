import React from 'react';
import { Menu } from 'antd';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { menuArr, menuInter } from '../../../config/menu_config';

const HeaderStyle = styled.header`
  display: flex;
  background-color: rgb(61, 11, 19);
  align-items: center;
  height: 80px;
  img {
    width: 40px;
    height: 40px;
    margin: 0px 10px;
  }
  h1 {
    color: white;
  }
`;
const { SubMenu } = Menu;
export default function Left_nav() {
  const createMenu = (target: menuInter[]): JSX.Element[] => {
    return target.map((item) => {
      if (!item.children) {
        console.log(item);
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        console.log(item);
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {createMenu(item.children)}
          </SubMenu>
        );
      }
    });
  };

  return (
    <div>
      <HeaderStyle>
        <img src="/image/logo.png" alt="" />
        <h1>Commodity Management System</h1>
      </HeaderStyle>
      <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark">
        {createMenu(menuArr)}
      </Menu>
    </div>
  );
}
/* 
 <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/admin/home">Home</Link>
        </Menu.Item>

        <SubMenu key="prod_about" icon={<AppstoreOutlined />} title="Navigation One">
          <Menu.Item key="category" icon={<UnorderedListOutlined />}>
            <Link to="/admin/prod_about/category">Category management</Link>
          </Menu.Item>
          <Menu.Item key="product" icon={<ToolOutlined />}>
            Product management
          </Menu.Item>
        </SubMenu>
*/
