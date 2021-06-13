import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, message, Table } from 'antd';
import { reqCategoryList } from '../../api';
import { PAGESIZE } from '../../config';

export default function Category() {
  const [productList, setProductList] = useState([]);

  const categoryList = async () => {
    const listRes = await reqCategoryList();
    const { status, data, msg } = listRes;
    if (status === 0) setProductList(data);
    else message.error(msg, 1);
  };
  useEffect(() => {
    categoryList();
  }, []);

  const columns = [
    {
      title: 'Category name',
      dataIndex: 'name',
      key: '_id',
    },
    {
      title: 'Edit',
      width: '25%',
      render: (value: string) => <Button type="link">Edit Name</Button>,
    },
  ];

  return (
    <div>
      <Card size="small" extra={<Button icon={<PlusCircleOutlined />}>Add</Button>}>
        <Table
          dataSource={productList}
          columns={columns}
          bordered
          rowKey="_id"
          pagination={{ pageSize: PAGESIZE }}
        />
      </Card>
    </div>
  );
}
