import { useEffect, useState } from 'react';
import { Button, Divider, Flex, Form, FormProps, Input, message, Modal, Popconfirm, QRCode, Space } from 'antd';
import { AdminBaseInfoReq, useApis } from '../../api/api';
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
  urlKey?: string;
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
      content: `添加成功, 密位为${data.password}`,
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


          {
            isEdit &&
            <Form.Item<FieldType>
              name="secretKey"
              label="验证码"
              required
            >
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  disabled
                  defaultValue={info?.secretKey}
                />
                <Button type="primary">
                  重新生成
                </Button>
                <Popconfirm
                  title="验证码"
                  icon={null}
                  description={
                    info?.urlKey ? <QRCode value={info?.urlKey} size={320} /> : '无二维码，点击重新生成'
                  }
                  showCancel={false}
                  okText="关闭"
                >
                <Button type="primary">
                  二维码
                </Button>
                </Popconfirm>
              </Space.Compact>
            </Form.Item>
          }

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