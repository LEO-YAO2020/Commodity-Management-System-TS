import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Form, Input, message, Select, Upload } from 'antd';
import { RouteComponentProps } from 'react-router';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../redux/reduxHooks';
import { categoryList } from '../../redux/reducers/category_reducer';
import { CategoryItems } from '../../lib/types/category';
import { proList } from '../../redux/reducers/product_reducer ';
import { reqAddProduct, reqCategoryList } from '../../api';
import PictureWall from './picture_wall';
import TextEditor from './rich_text_editor';
import { ProductDetailInfo } from '../../lib/types/product';
const { Item } = Form;
interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams> {}
export default function Update(props: Props) {
  const pictureRef = useRef<PictureWall>(null);
  const textRef = useRef<TextEditor>(null);
  const [productInfo, setProductInfo] = useState<CategoryItems[]>([]);
  const category = useAppSelector(categoryList);
  const product = useAppSelector(proList);

  useEffect(() => {
    if (category.length) {
      setProductInfo(category);
    } else {
      reqCategoryList().then((res) => {
        const { status, data, msg } = res;
        if (status === 0) {
          setProductInfo(data);
        } else {
          message.error(msg, 1);
        }
      });
    }
  }, []);

  const handleSubmit = async (value: any) => {
    let imgs = pictureRef.current?.getImgArr();
    let detail = textRef.current?.getHtmlText();

    const res = await reqAddProduct({ ...value, imgs, detail });
    const { status, msg } = res;
    if (status === 0) {
      message.success('success')
      props.history.replace('/admin/prod_about/product')
    } else {
      message.error(msg, 1);
    }
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <>
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
        <Form onFinish={handleSubmit} {...formItemLayout}>
          <Item label="Product Name">
            <Item
              initialValue=""
              name="name"
              rules={[{ required: true, message: 'Please Input Product Name' }]}
            >
              <Input placeholder="Product Name" />
            </Item>
          </Item>
          <Item
            label="Product Description"
            name="desc"
            initialValue=""
            rules={[{ required: true, message: 'Please Input Product Description' }]}
          >
            <Input placeholder="商品描述" />
          </Item>
          <Item
            label="Product Price"
            name="price"
            initialValue=""
            rules={[{ required: true, message: 'Please Input Product Price' }]}
          >
            <Input placeholder="商品价格" addonAfter="元" prefix="￥" type="number" />
          </Item>
          <Item
            label="Product Class"
            name="categoryId"
            initialValue=""
            rules={[{ required: true, message: 'Please Input Product Class' }]}
          >
            <Select>
              <Select.Option value="">Please Input Product Class</Select.Option>
              {productInfo.map((item) => {
                return (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Item>
          <Item label="Product Picture">
            <PictureWall ref={pictureRef} />
          </Item>
          <Item label="商品详情" wrapperCol={{ md: 16 }}>
            <TextEditor ref={textRef} />
          </Item>
          <Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    </>
  );
}
