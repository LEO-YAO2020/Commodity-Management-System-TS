import React, { useState, useEffect } from 'react';
import { Card, Button, Table, message, Modal, Form, Input, Tree } from 'antd';
import dayjs from 'dayjs';
import { reqAddRole, reqRoleList } from '../../api';
import { menuArr } from '../../config/menu_config';
import { PlusCircleOutlined } from '@ant-design/icons';
const { Item } = Form;
const { TreeNode } = Tree;

export default function Product() {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowAuth, setIsShowAuth] = useState(false);
  const [roleList, setRoleList] = useState([]);

  const handleOk =async (value: any) => {
    const result = await reqAddRole({roleName:value.roleName})
    const {status,msg} = result
    if(status===0) {
      message.success('Success',1)
      setIsShowAuth(false)
      getRoleList()

    }
    else message.error(msg,1)
  };

  const handleCancel = () => {
    setIsShowAdd(false);
  };

  const handleAuthOk = async () => {};

  const handleAuthCancel = () => {
    // this.setState({ isShowAuth: false });
    setIsShowAuth(false);
  };

  const getRoleList = async () => {
    const result = await reqRoleList();
    const { status, data } = result;
    if (status === 0) setRoleList(data);
  };

  useEffect(() => {
    getRoleList();
  }, []);

  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Create Time',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (time: any) => dayjs(time).format(' MM/DD/YYYY HH:mm:ss'),
    },
    {
      title: 'Auth Time',
      dataIndex: 'auth_time',
      key: 'auth_time',
      render: (time: any) => (time ? dayjs(time).format('MM/DD/YYYY HH:mm:ss') : ''),
    },
    {
      title: 'Auth Person',
      dataIndex: 'auth_name',
      key: 'auth_name',
    },
    {
      title: 'Operate',
      key: 'option',
      render: () => (
        <Button type="link" onClick={() => {}}>
          设置权限
        </Button>
      ),
    },
  ];
  return (
    <div>
      <Card
        title={
          <Button type="primary" onClick={() => {
            setIsShowAdd(true)
          }}>
            <PlusCircleOutlined />
            Add Role
          </Button>
        }
        style={{ width: '100% ' }}
      >
        <Table
          dataSource={roleList}
          columns={columns}
          bordered
          pagination={{ defaultPageSize: 5 }}
          rowKey="_id"
        />
      </Card>

      <Modal
        title="新增角色"
        visible={isShowAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form onFinish={handleOk}>
          <Item name="roleName" rules={[{ required: true, message: '角色名必须输入' }]}>
            <Input placeholder="请输入角色名" />
          </Item>
        </Form>
      </Modal>

      <Modal
        title="设置权限"
        visible={isShowAuth}
        onOk={handleAuthOk}
        onCancel={handleAuthCancel}
        okText="确认"
        cancelText="取消"
      ></Modal>
    </div>
  );
}
