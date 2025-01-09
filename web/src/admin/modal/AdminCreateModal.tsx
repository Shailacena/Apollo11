import { useRef, useState } from 'react';
import { Divider, Form, FormProps, Input, message, Modal } from 'antd';
import { AdminRegisterReq, useApis } from '../../api/api';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';

interface AdminAddDataType {
  callback?: Function;
  isModalOpen: boolean
}

type FieldType = {
  username?: string;
  nickname?: string;
  remark?: string;
};

const AdminCreateModal = (params: AdminAddDataType) => {
  const [isModalOpen, setIsModalOpen] = useState(params.isModalOpen);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, _] = message.useMessage();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const formRef = useRef<any>()
  let { adminRegister } = useApis()
  if (isModalOpen != params.isModalOpen) {
    setIsModalOpen(params.isModalOpen)
  }

  const success = (password: string) => {
    Modal.success({
      content: `添加成功, 密位为${password}`,
    });
  };

  const handleOk = () => {
    formRef.current?.submit()
  };

  const addAdmin: FormProps<AdminRegisterReq>['onFinish'] = async (value) => {
    setComponentDisabled(true)
    setConfirmLoading(true)
    try {
      let { data } = await adminRegister(value)
      console.log(data)
      if (params.callback) {
        params.callback()
      }
      success(data.password);
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
      <Modal title="新增管理员"
        footer={null}
        confirmLoading={confirmLoading}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => { setIsModalOpen(false) }}
        style={{ maxWidth: 480 }}
        destroyOnClose
      >
        <Divider />
        <div style={{ display: 'flex', marginTop: 20, alignItems: 'center' }}>
          <Form
            ref={formRef}
            labelCol={{ span: 8 }}
            name="basic"
            autoComplete="off"
            disabled={componentDisabled}
            onFinish={addAdmin}
          >
            <Form.Item<FieldType>
              name="username"
              label="帐号"
              required
            >
              <Input style={{ width: 250 }} />
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

export default AdminCreateModal;