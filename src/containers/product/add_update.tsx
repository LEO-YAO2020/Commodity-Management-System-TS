import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Form, Input, message, Select, Upload } from 'antd';
import { RouteComponentProps } from 'react-router';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../redux/reduxHooks';
import { categoryList } from '../../redux/reducers/category_reducer';
import { CategoryItems } from '../../lib/types/category';
import { proList } from '../../redux/reducers/product_reducer ';
import { reqAddProduct, reqCategoryList, reqProdById, reqUpdateProduct } from '../../api';
import PictureWall from './picture_wall';
import TextEditor from './rich_text_editor';

const { Item } = Form;
interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams> {}
export default function Update(props: Props) {
  const [form] = Form.useForm();
  const pictureRef = useRef<PictureWall>(null);
  const textRef = useRef<TextEditor>(null);
  const [productInfo, setProductInfo] = useState<CategoryItems[]>([]);
  const [operateType, setOperateType] = useState('add');
  const category = useAppSelector(categoryList);
  const product = useAppSelector(proList);

  const getProductList = async (id: string) => {
    let result = await reqProdById({ productId: id });
    const { status, data } = result;
    if (status === 0) {
      form.setFieldsValue({ ...data });
      pictureRef.current?.setFileList(data.imgs);
      textRef.current?.setRichText(data.detail);
    }
  };

  useEffect(() => {
    const { id } = props.match.params;
    if (id) {
      setOperateType('update');
      if (product.length) {
        let result = product.find((item) => item?._id?.toString() === id);

        if (result) {
          form.setFieldsValue({ ...result });
          pictureRef.current?.setFileList(result.imgs);
          textRef.current?.setRichText(result.detail);
        }
      } else {
        getProductList(id);
      }
    }

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
    const { id } = props.match.params;
    let res;
    if (operateType === 'add') {
      res = await reqAddProduct({ ...value, imgs, detail });
    } else {
      res = await reqUpdateProduct({ ...value, imgs, detail, _id: id });
    }
    const { status, msg } = res;
    if (status === 0) {
      message.success('success');
      props.history.replace('/admin/prod_about/product');
      form.resetFields();
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
        span: 18,
        offset: 6,
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
            <span>Product {operateType}</span>
          </>
        }
      >
        <Form onFinish={handleSubmit} {...formItemLayout} form={form}>
          <Item label="Product Name">
            <Item name="name" rules={[{ required: true, message: 'Please Input Product Name' }]}>
              <Input placeholder="Product Name" />
            </Item>
          </Item>
          <Item
            label="Product Description"
            name="desc"
            rules={[{ required: true, message: 'Please Input Product Description' }]}
          >
            <Input placeholder="商品描述" />
          </Item>
          <Item
            label="Product Price"
            name="price"
            rules={[{ required: true, message: 'Please Input Product Price' }]}
          >
            <Input placeholder="商品价格" addonAfter="元" prefix="￥" type="number" />
          </Item>
          <Item
            label="Product Class"
            name="categoryId"
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
          <Item label="商品详情" wrapperCol={{ md: 12 }}>
            <TextEditor ref={textRef} />
          </Item>
          <Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Item>
        </Form>
      </Card>
    </>
  );
}
