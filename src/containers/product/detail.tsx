import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Card, List, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useAppSelector } from '../../redux/reduxHooks';
import { proList } from '../../redux/reducers/product_reducer ';
import { ProductListItems } from '../../lib/types/product';
import { reqProdById } from '../../api';

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

  const [productDetail, setProductDetail] = useState([
    { categoryId: '', desc: '', detail: '', imgs: [], name: '', price: '' },
  ]);

  useEffect(() => {
    let result = productList.find((item) => {
      return item._id.toString() === props.match.params.id;
    });
    if (productList.length === 0) {
      reqProdById({ productId: props.match.params.id }).then((res) => {
        const { data, status, msg } = res;
        if (status === 0) {
          const { categoryId, desc, detail, imgs, name, price } = data;
          setProductDetail([{ categoryId, desc, detail, imgs, name, price }]);
        } else {
          message.error(msg, 1);
        }
      });
    }
    if (result) {
      const { categoryId, desc, detail, imgs, name, price } = result;
      setProductDetail([{ categoryId, desc, detail, imgs, name, price }]);
    }
  }, []);
  return (
    <div>
      <Card
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
        style={{maxHeight:'100%'}}
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
                <Span>Product categoryId: </Span>
                {item.categoryId}
              </Item>
              <Item>
                <Span>
                  Product images：{' '}
                  {item.imgs.map((item, index) => {
                    return <img src={`/upload/` + item} alt="商品图片" key={index} />;
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
