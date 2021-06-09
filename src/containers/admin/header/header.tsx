import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Button, Popconfirm } from 'antd';
import screenfull from 'screenfull';
import { useAppSelector, useAppDispatch } from '../../../redux/reduxHooks';
import { userInfo, deleteUserInfo } from '../../../redux/reducers/login_reducer';
import { withRouter } from 'react-router';

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

function Header() {
  const [isFull, setIsFull] = useState(false);
  const [data, setDate] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));

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
        <div className="header-bottom-left">柱状图</div>
        <div className="header-bottom-right">
          {data}
          <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气" />晴 温度:2-5 ℃
        </div>
      </div>
    </HeaderStyle>
  );
}
export default withRouter(Header);
