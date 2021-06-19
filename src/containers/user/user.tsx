import React, { useEffect, useState } from 'react';
import { Card, Button, Table, message, Modal, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { reqUserList, reqAddUser } from '../../api';
import { RoleResType, UserReqInter, UserResType } from '../../lib/types/user';
import { PlusCircleFilled } from '@ant-design/icons';
const { Item } = Form;
const { Option } = Select;

const User = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [userList, setUserList] = useState<UserResType[]>([]);
  const [roleList, setRoleList] = useState<RoleResType[]>([]);
  const [form] = Form.useForm();

  const getUserList = async () => {
    let result = await reqUserList();
    const { status, data, msg } = result;
    if (status === 0) setUserList(data.users.reverse());
    else message.error(msg, 1);
    setRoleList(data.roles);
  };

  useEffect(() => {
    getUserList();
  }, []);

  //新增用户弹窗----确定按钮回调
  const handleOk = async (value: UserReqInter) => {
    let result = await reqAddUser(value)
    const {status,data,msg} = result
    if(status===0){
      message.success('添加用户成功')
      let userLists:UserResType[] = [...userList]
      userLists.unshift(data)
      setUserList(userList)
      setIsShowAdd(false)

    }
    else message.error(msg,1)
  };

  //新增用户弹窗----取消按钮回调
  const handleCancel = () => {
    setIsShowAdd(false);
  };
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (time: string) => dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss'),
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      key: 'role_id',
      render: (id: any) => {
        let result = roleList.find((item) => {
          return item._id === id;
        });
        if (result) return result.name;
      },
    },
    {
      title: '操作',
      key: 'option',
      render: () => (
        <div>
          <Button type="link">修改</Button>
          <Button type="link">删除</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Card
        title={
          <Button
            type="primary"
            onClick={() => {
              setIsShowAdd(true);

              form.resetFields();
            }}
          >
            <PlusCircleFilled />
            创建用户
          </Button>
        }
      >
        <Table
          dataSource={userList}
          columns={columns}
          bordered
          pagination={{ defaultPageSize: 5 }}
          rowKey="_id"
        />
      </Card>
      {/* 新增角色提示框 */}
      <Modal
        title="添加用户"
        visible={isShowAdd}
        onCancel={handleCancel}
        footer={
          <>
            <Button onClick={handleCancel}>Cancel</Button>
          </>
        }
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} onFinish={handleOk} form={form}>
          <Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '用户名必须输入' }]}
          >
            <Input placeholder="请输入用户名" />
          </Item>
          <Item label="密码" name="password" rules={[{ required: true, message: '密码必须输入' }]}>
            <Input placeholder="请输入密码" />
          </Item>
          <Item label="手机号" name="phone" rules={[{ required: true, message: '手机号必须输入' }]}>
            <Input placeholder="请输入手机号" />
          </Item>
          <Item label="邮箱" name="email" rules={[{ required: true, message: '邮箱必须输入' }]}>
            <Input placeholder="请输入邮箱" />
          </Item>
          <Item
            label="角色"
            name="role_id"
            rules={[{ required: true, message: '必须选择一个角色' }]}
          >
            <Select>
              <Option value="">请选择一个角色</Option>
              {roleList.map((item) => {
                return (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Item>
          <Form.Item wrapperCol={{ offset: 16 }} style={{ position: 'relative' }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ position: 'absolute', top: '91px', left: '19px' }}
            >
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
