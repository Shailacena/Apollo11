import { Button, Card, Divider, Form, FormProps, Input, message, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { adminRegister, AdminRegisterReq } from "../api/api";

type FieldType = {
  oldpassowrd?: string;
  newpassowrd?: string;
};

function SetPasswordModal(props: any) {
  console.log(props)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setIsModalOpen(props.isOpen);
  }, [props.isOpen]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    // setIsModalOpen(false);
    props.updateIsSetpassowrdModalOpen(false)
  };

  const success = (password: string) => {
    Modal.success({
      content: `添加成功, 密位为${password}!`,
    });
  };

  const onFinish: FormProps<AdminRegisterReq>['onFinish'] = async (value) => {
    try {
      console.log(value);
      let resp = await adminRegister(value)
      console.log(resp)
      if (resp.code == 0) {
        success(resp.data.username);
        setIsModalOpen(false);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && messageApi.open({
          type: 'error',
          content: msg,
        });
      }
    }
  }
  return (
    <>
      <Modal title="修改密码"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
        style={{ maxWidth: 480 }}
        destroyOnClose>
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: 20, alignItems: 'center' }}>
          <Form
            labelCol={{ span: 8 }}
            name="basic"
            autoComplete="off"
            onFinish={onFinish}
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

            <Form.Item label={null} style={{ marginTop: 50 }}>
              <Button style={{ width: 100 }} size="middle" block type="primary" htmlType="submit">
                确定
              </Button>
            </Form.Item>
          </Form >
        </div>
      </Modal>
    </>
  );
};

export default SetPasswordModal;