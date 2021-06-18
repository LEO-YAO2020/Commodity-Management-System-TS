import React from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqDeletePicture } from '../../api';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

interface Istate {
  previewVisible: boolean;
  previewImage: string;
  previewTitle: string;
  fileList: any;
}

class PicturesWall extends React.Component {
  state: Istate = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  getImgArr = () => {
    let result: string[] = [];
    this.state.fileList.forEach((element: { name: string }) => {
      result.push(element.name);
    });
    return result;
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="http://localhost:3000/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          name="image"
          onPreview={this.handlePreview}
          onChange={async ({ fileList, file }) => {
            if (file.status === 'done') {
              fileList[fileList.length - 1].url = file.response.data.url;
              fileList[fileList.length - 1].name = file.response.data.name;
            }
            if (file.status === 'removed') {
              let result = await reqDeletePicture({ name: file.name });
              const { status, msg } = result;
              if (status === 0) message.success('success');
              else message.error(msg);
            }
            this.setState({ fileList });
          }}
        >
          {fileList.length >= 2 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default PicturesWall;
