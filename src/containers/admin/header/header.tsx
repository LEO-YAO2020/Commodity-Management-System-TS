import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Button, Popconfirm } from 'antd';
import screenfull from 'screenfull';
import { useAppSelector, useAppDispatch } from '../../../redux/reduxHooks';
import { userInfo, deleteUserInfo } from '../../../redux/reducers/login_reducer';
import { menuTitle } from '../../../redux/reducers/menu_reducer';
import { RouteComponentProps, withRouter } from 'react-router';
import { menuArr } from '../../../config/menu_config';

const HeaderStyle = styled.header`
  background: white;
  .header-top {
    height: 40px;
    border-bottom: 1px solid #1da57a;
    text-align: right;
    .username {
      margin: 0px 0px 0px 20px;
    }
    line-height: 40px;
  }
  .header-bottom {
    display: flex;
    height: 40px;
    .header-bottom-left {
      position: relative;
      width: 25%;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      &::after {
        content: '';
        border-top: 20px solid white;
        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
        border-bottom: 30px solid transparent;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 40px;
      }
    }
    .header-bottom-right {
      width: 75%;
      text-align: right;
      padding-right: 20px;
      line-height: 40px;
      img {
        width: 30px;
        height: 20px;
        margin: 0 8px;
      }
    }
  }
`;

function Header(props: RouteComponentProps) {
  const [isFull, setIsFull] = useState(false);
  const [initialTitle, setInitialTitle] = useState('');
  const [data, setDate] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  const title = useAppSelector(menuTitle);
  const { user } = useAppSelector(userInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        setIsFull(!isFull);
      });
    }

    let interval = setInterval(() => {
      setDate(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isFull]);

  useEffect(() => {
    getTitle();
  }, []);

  const getTitle = () => {
    let pathKey = props.location.pathname.split('/').reverse()[0];
    if (props.location.pathname.includes('add_update') || props.location.pathname.includes('detail') ) {
      pathKey = 'product'
    }
    let title = '';
    menuArr.forEach((item) => {
      if (item.children instanceof Array) {
        let tmp = item.children.find((citem) => citem.key === pathKey);
        if (tmp) {
          title = tmp.title;
        }
      } else {
        if (pathKey === item.key) {
          title = item.title;
        }
      }
    });
    setInitialTitle(title);
  };

  return (
    <HeaderStyle>
      <div className="header-top">
        <Button
          size="small"
          onClick={() => {
            if (screenfull.isEnabled) {
              screenfull.toggle();
            }
          }}
        >
          {isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </Button>

        <span className="username">Welcome {user.username}</span>
        <Popconfirm
          title="Are you sure to logout?"
          onConfirm={() => {
            localStorage.clear();
            dispatch(deleteUserInfo());
          }}
        >
          <Button type="link" size="large">
            Logout
          </Button>
        </Popconfirm>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{title || initialTitle}</div>
        <div className="header-bottom-right">
          {data}
          <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气" />晴 温度:2-5 ℃
        </div>
      </div>
    </HeaderStyle>
  );
}
export default withRouter(Header);
