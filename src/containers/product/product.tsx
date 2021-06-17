/* eslint-disable react-hooks/exhaustive-deps */
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Card, Button, Input, Select, Table, message } from 'antd';
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { reqProductList, reqSearchProduct, reqUpdateProdStatus } from '../../api';
import { RouteComponentProps } from 'react-router';
import { useAppDispatch } from '../../redux/reduxHooks';
import { saveProList } from '../../redux/reducers/product_reducer ';

const { Option } = Select;
export default function Role(props: RouteComponentProps) {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [keyWord, setKeyWord] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [searchType, setSearchType] = useState('productName');
  const dispatch = useAppDispatch();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '18%',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '9%',
      key: 'price',
      render: (value: number) => {
        return <div>$ {value}</div>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      key: 'status',
      render: (_value: string, record: { _id: Number; status: number }) => {
        return (
          <div>
            <Button
              type="primary"
              danger={record.status === 1 ? true : false}
              shape="round"
              onClick={async () => {
                let productList = dataSource;
                if (record.status === 1) record.status = 2;
                else record.status = 1;
                let result = await reqUpdateProdStatus({
                  productId: record._id,
                  status: record.status,
                });
                if (result.status === 0) {
                  message.success('Success');
                  productList = productList.map((item) => {
                    if (item._id === record._id) {
                      item.status = record.status;
                    }
                    return item;
                  });
                  setDataSource(productList);
                } else message.error('update failed');
              }}
            >
              {record.status === 1 ? 'Remove' : 'Add'}
            </Button>
            <div>{record.status === 1 ? 'Remove' : 'Add'}</div>
          </div>
        );
      },
    },
    {
      title: 'Operation',
      dataIndex: 'opera',
      key: 'Operate',
      width: '10%',
      render: (_value: string, record: { _id: Number }) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => {
                props.history.push(`/admin/prod_about/product/detail/${record._id}`);
              }}
            >
              details
            </Button>
            <Button
              type="link"
              onClick={() => {
                props.history.push('/admin/prod_about/product/add_update/12354');
              }}
            >
              edit
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (keyWord === '') {
      reqProductList({ pageNum, pageSize }).then((res) => {
        const { status, msg, data } = res;
        if (status === 0) {
          setDataSource(data.list);
          setTotal(data.total);
          setPageNum(res.data.pageNum);
          dispatch(saveProList({ data: data.list }));
        } else {
          message.error(msg, 1);
        }
      });
      return;
    }

    reqSearchProduct({ pageNum, pageSize, searchType, keyWord }).then((res) => {
      if (res.status === 0) {
        setDataSource(res.data.list);
        setTotal(res.data.total);
        setPageNum(res.data.pageNum);
      }
    });
  }, [pageNum, pageSize, isSearch]);

  return (
    <div>
      <Card
        size="small"
        title={
          <>
            <Input.Group compact>
              <Select
                defaultValue="productName"
                onChange={(value) => {
                  setSearchType(value);
                }}
              >
                <Option value="productName">Search by Name</Option>
                <Option value="productDesc">Search by description</Option>
              </Select>
              <Input
                style={{ width: '20%' }}
                placeholder="please input search keywords"
                allowClear
                onChange={(e: BaseSyntheticEvent) => {
                  setKeyWord(e.target.value);
                }}
              />
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={() => {
                  setIsSearch(!isSearch);
                }}
              >
                Search
              </Button>
            </Input.Group>
          </>
        }
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => {
              props.history.push('/admin/prod_about/product/add_update');
            }}
          >
            More
          </Button>
        }
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="_id"
          bordered
          pagination={{ current: pageNum, pageSize, total }}
          onChange={(page) => {
            setPageNum(page.current as number);
            setPageSize(page.pageSize as number);
          }}
        />
      </Card>
    </div>
  );
}
