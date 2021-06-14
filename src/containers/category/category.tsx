import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, message, Table, Modal, Form, Input } from 'antd';
import { reqAddCategory, reqCategoryList, reqUpdateCategory } from '../../api';
import { PAGESIZE } from '../../config';

export default function Category() {
  const [form] = Form.useForm();
  const [productList, setProductList] = useState<object[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentValue, setCurrentValue] = useState('');
  const [currentValueId, setCurrentValueId] = useState<Number>();
  const [update, setUpdate] = useState(1);
  const [openType, setOpenType] = useState('');
  const categoryList = async () => {
    const listRes = await reqCategoryList();

    const { status, data, msg } = listRes;
    if (status === 0) {
      setProductList(data.reverse());
      setLoading(false);
    } else message.error(msg, 1);
  };

  useEffect(() => {
    categoryList();
  }, [update]);

  useEffect(() => {
    form.setFieldsValue({
      category: currentValue,
    });
  }, [currentValue]);

  const columns = [
    {
      title: 'Category name',
      dataIndex: 'name',
      key: '_id',
    },
    {
      title: 'Edit',
      width: '25%',
      render: (value: { _id: number; name: string }) => (
        <Button
          type="link"
          onClick={() => {
            setCurrentValue(value.name);
            showUpdate(value);
          }}
        >
          Edit Name
        </Button>
      ),
    },
  ];

  const showAdd = () => {
    setOpenType('Add Item');
    setIsModalVisible(true);
  };
  const showUpdate = (value: { _id: number; name: string }) => {
    const { _id } = value;
    setCurrentValueId(_id);
    setOpenType('Update Item');
    setIsModalVisible(true);
  };

  const handleOk = async (value: { category: string }) => {
    const { category } = value;
    if (openType === 'Update Item') {
      if (currentValueId) {
        const res = await reqUpdateCategory({ categoryId: currentValueId, categoryName: category });
        const { status, msg } = res;
        if (status === 0) {
          message.success('Success', 1);
          setUpdate(update + 1);
          setIsModalVisible(false);
          form.resetFields();
        } else {
          message.error(msg, 1);
        }
      }
    } else {
      const res = await reqAddCategory({ categoryName: category });
      const { data, msg, status } = res;
      if (status === 0) {
        message.success('Success');
        let categoryList = productList;
        categoryList.unshift(data);
        setProductList(categoryList);
        setIsModalVisible(false);
        setUpdate(update + 1);
      }
      if (status === 1) message.error(msg, 1);
    }
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Card
        size="small"
        extra={
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => {
              showAdd();
            }}
          >
            Add
          </Button>
        }
      >
        <Table
          loading={loading}
          dataSource={productList}
          columns={columns}
          bordered
          rowKey="_id"
          pagination={{ pageSize: PAGESIZE, showQuickJumper: true }}
        />
      </Card>
      <Modal
        title={openType}
        visible={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose
        footer={
          <>
            <Button onClick={handleCancel}>Cancel</Button>
          </>
        }
      >
        <Form name="normal_login" onFinish={handleOk} form={form}>
          <Form.Item
            name="category"
            rules={[{ required: true, message: 'Please input category name!' }]}
          >
            <Input placeholder="please input category name" />
          </Form.Item>
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
}
