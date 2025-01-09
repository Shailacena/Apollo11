import { useRef, useState } from 'react';
import { Divider, Form, FormProps, Input, message, Modal } from 'antd';
import { useApis } from '../../api/api';
import axios from 'axios';
import { useAppContext } from '../../AppProvider';

interface PartnerSetPasswordDataType {
  callback?: Function;
  isModalOpen: boolean
}

type FieldType = {
  oldpassword: string;
  newpassword: string;
};

const SetPasswordModal = (params: PartnerSetPasswordDataType) => {
  const [isModalOpen, setIsModalOpen] = useState(params.isModalOpen);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, _] = message.useMessage();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const formRef = useRef<any>()
  let { partnerSetPassword } = useApis()
  const ctx = useAppContext()

  if (isModalOpen != params.isModalOpen) {
    setIsModalOpen(params.isModalOpen)
  }

  const success = () => {
    Modal.success({
      content: `修改成功`,
    });
  };

  const handleOk = () => {
    formRef.current?.submit()
  };

  const updatePassword: FormProps<FieldType>['onFinish'] = async (value) => {
    setComponentDisabled(true)
    setConfirmLoading(true)
    try {
      let { data } = await partnerSetPassword({id: Number(ctx.auth.id), ...value})
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
      <Modal title="修改密码"
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => { setIsModalOpen(false) }}
        style={{ maxWidth: 480 }}
        destroyOnClose>
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: 20, alignItems: 'center' }}>
          <Form
            labelCol={{ span: 8 }}
            name="basic"
            autoComplete="off"
            onFinish={updatePassword}
            disabled={componentDisabled}
          >
            <Form.Item<FieldType>
              name="oldpassowrd"
              label="原始密码"
              required
            >
              <Input style={{ width: 200 }} />
            </Form.Item>

            <Form.Item<FieldType>
              name="newpassowrd"
              label="新密码"
              required
            >
              <Input style={{ width: 200 }} />
            </Form.Item>
          </Form >
        </div>
      </Modal>
    </>
  );
};

export default SetPasswordModal;