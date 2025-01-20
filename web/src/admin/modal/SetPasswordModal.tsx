import { Button, Divider, Flex, Form, FormProps, Input, message, Modal } from "antd";
import { useApis } from "../../api/api";
import { AdminSetPasswordReq } from "../../api/types";
import { useState } from "react";
import axios from "axios";

interface ModalDataType {
  isModalOpen: boolean
  onOk: Function;
  onCancel: Function;
}

const SetPasswordModal = (params: ModalDataType) => {
  let { adminSetPassword } = useApis()
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [formDisabled, setFormDisabled] = useState<boolean>(false);

  const onFinish: FormProps<AdminSetPasswordReq>['onFinish'] = async (value) => {
    setFormDisabled(true)
    setConfirmLoading(true)

    try {
      handleSetPassword(value)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && message.error(msg)
      }
    } finally {
      setFormDisabled(false)
      setConfirmLoading(false)
    }
  };

  const handleSetPassword = async (value: AdminSetPasswordReq) => {
    await adminSetPassword(value)

    params?.onOk?.();
    message.success(`修改密码成功`)
  }

  return (
    <>
      <Modal
        title="修改密码"
        footer={null}
        confirmLoading={confirmLoading}
        open={params.isModalOpen}
        onCancel={() => { params?.onCancel?.() }}
        destroyOnClose
      >
        <Divider />
        <Form
          labelCol={{ span: 4 }}
          name="basic"
          autoComplete="off"
          disabled={formDisabled}
          onFinish={onFinish}
        >
          <Form.Item<AdminSetPasswordReq>
            name="oldPassword"
            label="原密码"
            rules={[{ required: true, message: '请输入原密码' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<AdminSetPasswordReq>
            name="newPassword"
            label="新密码"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Flex justify="center" align="center">
              <Button size="large" type="primary" htmlType="submit">
                确定
              </Button>
            </Flex>
          </Form.Item>
        </Form >
      </Modal>
    </>
  );
};

export default SetPasswordModal;