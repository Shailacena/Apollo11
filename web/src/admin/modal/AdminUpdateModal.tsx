import React, { useRef, useState } from 'react';
import { Divider, Form, FormProps, Input, message, Modal } from 'antd';
import { adminUpdate, AdminUpdateReq } from '../../api/api';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';

interface AdminUpdateDataType {
  callback?: Function;
  username?: string;
  nickname?: string;
  remark?: string
  isUpdateModalOpen: boolean
}

type FieldType = {
  username?: string;
  nickname?: string;
  remark?: string;
};

const AdminUpdateModal = (params: AdminUpdateDataType) => {
  const [isModalOpen, setIsModalOpen] = useState(params.isUpdateModalOpen);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, _] = message.useMessage();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const formRef = useRef<any>()
  if (isModalOpen != params.isUpdateModalOpen) {
    setIsModalOpen(params.isUpdateModalOpen)
  }

  const success = () => {
    Modal.success({
      content: `修改成功`,
    });
  };

  const handleOk = () => {
    formRef.current?.submit()
  };

  const updateAdmin: FormProps<AdminUpdateReq>['onFinish'] = async (value) => {
    setComponentDisabled(true)
    setConfirmLoading(true)
    try {
      let { data } = await adminUpdate(value)
      console.log(data)
      if (params.callback) {
        params.callback()
      }
      success();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && messageApi.open({
          type: 'error',
          content: msg,
        });
      }
    }
  };

  return (
    <>
      <Modal
        title="修改信息"
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => { setIsModalOpen(false) }}
      >
        <Divider />
          <div style={{ display: 'flex', marginTop: 20, alignItems: 'center' }}>
            <Form
              ref={formRef}
              labelCol={{ span: 8 }}
              name="basic"
              autoComplete="off"
              onFinish={updateAdmin}
              disabled={componentDisabled}
              initialValues={{ username: params.username, nickname: params.nickname,  remark: params.remark}}
            >
              <Form.Item<FieldType>
                name="username"
                label="帐号"
                required
              >
                <Input style={{ width: 250 }} disabled />
              </Form.Item>

              <Form.Item<FieldType>
                name="nickname"
                label="昵称"
                required
              >
                <Input style={{ width: 250 }} />
              </Form.Item>
              <Form.Item<FieldType>
                name="remark"
                label="备注"
              >
                <TextArea rows={4} style={{ width: 250 }} />
              </Form.Item>
            </Form >
          </div>
      </Modal>
    </>
  );
};

export default AdminUpdateModal;