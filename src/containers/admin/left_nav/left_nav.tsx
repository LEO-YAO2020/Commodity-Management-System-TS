import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { menuArr, menuInter } from '../../../config/menu_config';
import { useAppDispatch } from '../../../redux/reduxHooks';
import { saveTitle } from '../../../redux/reducers/menu_reducer';

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

const Left_nav = (props: RouteComponentProps) => {
  const dispatch = useAppDispatch();
  const createMenu = (target: menuInter[]): JSX.Element[] => {
    return target.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => {
              dispatch(saveTitle({ title: item.title }));
            }}
          >
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {createMenu(item.children)}
          </SubMenu>
        );
      }
    });
  };

  return (
    <div style={{ height: '100%vh'}}>
      <HeaderStyle>
        <img src="/image/logo.png" alt="" />
        <h1>Commodity Management System</h1>
      </HeaderStyle>
      <Menu
        selectedKeys={[
          props.location.pathname.includes('product')
            ? 'product'
            : props.location.pathname.split('/').reverse()[1],
        ]}
        defaultOpenKeys={[props.location.pathname.split('/').reverse()[1]]}
        mode="inline"
        theme="dark"
      >
        {createMenu(menuArr)}
      </Menu>
    </div>
  );
};

export default withRouter(Left_nav);
