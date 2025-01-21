import { useEffect, useState } from 'react';
import { Button, Divider, Flex, Form, FormProps, Input, message, Modal } from 'antd';
import { AdminBaseInfoReq } from '../../api/types';
import { useApis } from '../../api/api';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';

interface ModalDataType {
  isModalOpen: boolean
  onOk: Function;
  onCancel: Function;
  info?: FieldType
}

export type FieldType = {
  username?: string;
  nickname?: string;
  secretKey?: string;
  remark?: string;
};

enum Title {
  CreateTxt = '新增管理员',
  EditTxt = '修改管理员'
}

const AdminCreateModal = (params: ModalDataType) => {
  const [info, setInfo] = useState(params.info)
  const [isEdit, setIsEdit] = useState(!!params.info)
  const [title, setTitle] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(params.isModalOpen);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  let { adminRegister, adminUpdate } = useApis()

  useEffect(() => {
    setIsModalOpen(params.isModalOpen)
  }, [params.isModalOpen])

  useEffect(() => {
    setIsEdit(!!params.info)
    setInfo(params.info)
  }, [params.info])

  useEffect(() => {
    setTitle(isEdit ? Title.EditTxt : Title.CreateTxt)
  }, [isEdit])

  const onFinish: FormProps<AdminBaseInfoReq>['onFinish'] = async (value) => {
    setFormDisabled(true)
    setConfirmLoading(true)
    try {
      isEdit ? handleEdit(value) : handleRegister(value)
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

  const handleRegister = async (value: AdminBaseInfoReq) => {
    let { data } = await adminRegister(value)
    params?.onOk?.();
    Modal.success({
      content: `创建管理员成功, 密位为${data.password}`,
    });
  }

  const handleEdit = async (value: AdminBaseInfoReq) => {
    await adminUpdate(value)
    params?.onOk?.();
    message.success(`修改成功`)
  }

  return (
    <>
      <Modal
        title={title}
        footer={null}
        confirmLoading={confirmLoading}
        open={isModalOpen}
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
          initialValues={{ ...info }}
        >
          <Form.Item<FieldType>
            name="username"
            label="帐号"
            rules={[{ required: true, message: '请输入帐号' }]}
          >
            <Input disabled={isEdit} />
          </Form.Item>

          <Form.Item<FieldType>
            name="nickname"
            label="昵称"
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="remark"
            label="备注"
          >
            <TextArea rows={4} />
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

export default AdminCreateModal;