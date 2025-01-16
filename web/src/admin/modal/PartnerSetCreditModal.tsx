import { useEffect, useState } from 'react';
import { Button, Form, FormProps, Input, message, Modal } from 'antd';
import { PartnerBaseInfoReq, useApis } from '../../api/api';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';

interface ModalDataType {
  isModalOpen: boolean
  onOk: Function;
  onCancel: Function;
  info?: FieldType
}

type FieldType = {
  username?: string;
  nickname?: string;
  remark?: string;
};

enum Title {
  EditTxt = '修改授信额度'
}

const PartnerSetCreditModal = (params: ModalDataType) => {

  const [info, setInfo] = useState(params.info)
  const [isEdit, setIsEdit] = useState(!!params.info)
  const [title, setTitle] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(params.isModalOpen);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  let apis = useApis()

  useEffect(() => {
    setIsModalOpen(params.isModalOpen)
  }, [params.isModalOpen])

  useEffect(() => {
    setIsEdit(!!params.info)
    setInfo(params.info)
  }, [params.info])

  useEffect(() => {
    setTitle(isEdit ? Title.EditTxt : Title.EditTxt)
  }, [isEdit])

  const onFinish: FormProps<PartnerBaseInfoReq>['onFinish'] = async (value) => {
    setFormDisabled(true)
    setConfirmLoading(true)
    try {
      value.priority = value.priority && Number(value.priority)
      value.dailyLimit = value.dailyLimit && Number(value.dailyLimit)
      value.rechargeTime = value.rechargeTime && Number(value.rechargeTime)
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

  const handleRegister = async (value: PartnerBaseInfoReq) => {
    let { data } = await apis.partnerRegister(value)
    params?.onOk?.();
    Modal.success({
      content: `添加成功, 密位为${data.password}`,
    });
  }

  const handleEdit = async (value: PartnerBaseInfoReq) => {
    await apis.partnerUpdate(value)
    params?.onOk?.();
    message.success(`修改成功`)
  }

  return (
    <>
      <Modal title={title} footer={null} confirmLoading={confirmLoading} onCancel={params?.onCancel?.()} open={isModalOpen}>
        <Form
          preserve={false}
          disabled={formDisabled}
          labelCol={{ span: 4 }}
          name="basic"
          autoComplete="off"
          onFinish={onFinish}
          initialValues={{ ...info }}
        >
          <Form.Item<PartnerBaseInfoReq>
            name="name"
            label="名称"
            required
          >
            <Input />
          </Form.Item>

          <Form.Item<PartnerBaseInfoReq>
            name="priority"
            label="优先级"
            required
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item<PartnerBaseInfoReq>
            name="dailyLimit"
            label="每日限额"
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item<PartnerBaseInfoReq>
            name="rechargeTime"
            label="充值时间"
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item<PartnerBaseInfoReq>
            name="privateKey"
            label="私钥"
          >
            <Input />
          </Form.Item>

          <Form.Item<PartnerBaseInfoReq>
            name="remark"
            label="备注"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button size="large" block type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form >
      </Modal>
    </>
  )
}

export default PartnerSetCreditModal