import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Card, List, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useAppSelector } from '../../redux/reduxHooks';
import { proList } from '../../redux/reducers/product_reducer ';
import { categoryList } from '../../redux/reducers/category_reducer';
import { ProductListItems } from '../../lib/types/product';
import { reqCategoryList, reqProdById } from '../../api';
import { CategoryItems } from '../../lib/types/category';

const { Item } = List;
interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams> {}

const Span = styled.span`
  font-size: 20px;
  font-weight: 700;
`;
export default function Detail(props: Props) {
  const productList: Array<ProductListItems> = useAppSelector(proList);
  const categoryItem: Array<CategoryItems> = useAppSelector(categoryList);
  const [productDetail, setProductDetail] = useState([
    { categoryId: '', desc: '', detail: '', imgs: [], name: '', price: '' },
  ]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const getCategoryList = async (categoryId: string) => {
    const result = await reqCategoryList();
    const { status, data, msg } = result;

    if (status === 0) {
      let result = data.find((item) => item._id === categoryId);
      if (result) {

        setName(result.name);
        setLoading(false);
      }
    } else message.error(msg, 1);
  };
  useEffect(() => {
    let categoryIdinfo = '';
    if (productList.length) {
      let result = productList.find((item) => {
        return item._id?.toString() === props.match.params.id;
      });
      if (result) {
        categoryIdinfo = result.categoryId;
        setProductDetail([{ ...result }]);
      }
    } else {
      reqProdById({ productId: props.match.params.id }).then((res) => {
        const { data, status, msg } = res;
        if (status === 0) {
          categoryIdinfo = data.categoryId;
          setProductDetail([{ ...data }]);
          console.log(categoryIdinfo);
        } else {
          message.error(msg, 1);
        }
      });

    }

    if (categoryItem.length) {
      let result = categoryItem.find((item) => {
        return item._id === categoryIdinfo;
      });

      if (result) {
        setName(result.name);
        setLoading(false);
      }
    } else {

      getCategoryList(categoryIdinfo);
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <Card
        loading={loading}
        size="small"
        title={
          <>
            <Button
              type="link"
              onClick={() => {
                props.history.goBack();
              }}
            >
              <ArrowLeftOutlined />
            </Button>
            <span>Product Detail</span>
          </>
        }
      >
        <List
          style={{ maxHeight: '100%' }}
          bordered
          dataSource={productDetail}
          renderItem={(item) => (
            <>
              <Item>
                <Span>Product name：</Span>
                {item.name}
              </Item>
              <Item>
                <Span>Product Description：</Span>
                {item.desc}
              </Item>
              <Item>
                <Span>
                  Product price：
                  <span style={{ fontWeight: 400 }}>￥ {item.price}</span>
                </Span>
              </Item>
              <Item>
                <Span>Category Name: </Span>
                {name}
              </Item>
              <Item>
                <Span>
                  Product images：{' '}
                  {item.imgs.map((item, index) => {
                    return <img src={`/upload/` + item} alt="商品图片" key={index} style={{width:200}}/>;
                  })}
                </Span>
              </Item>
              <Item style={{ fontSize: '20px', fontWeight: 700 }}>
                Product Detail
                <span
                  style={{ fontSize: '20px', fontWeight: 400 }}
                  dangerouslySetInnerHTML={{ __html: item.detail }}
                />
              </Item>
            </>
          )}
        />
      </Card>
    </div>
  );
}
