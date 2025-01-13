import { useEffect, useState } from 'react';
import { Button, Divider, Flex, Form, FormProps, Input, message, Modal } from 'antd';
import { AdminBaseInfoReq, PartnerRegisterReq, useApis } from '../../api/api';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';

interface PartnerAddDataType {
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
  CreateTxt = '新增合作商',
  EditTxt = '修改合作商信息'
}

const PartnerCreateModal = (params: PartnerAddDataType) => {

  const [info, setInfo] = useState(params.info)
  const [isEdit, setIsEdit] = useState(!!params.info)
  const [title, setTitle] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(params.isModalOpen);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  let { partnerRegister, partnerUpdate } = useApis()

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

  const onFinish: FormProps<PartnerRegisterReq>['onFinish'] = async (value) => {
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

  const handleRegister = async (value: PartnerRegisterReq) => {
    let { data } = await partnerRegister(value)
    params?.onOk?.();
    Modal.success({
      content: `添加成功, 密位为${data.password}`,
    });
  }

  const handleEdit = async (value: PartnerRegisterReq) => {
    await partnerUpdate(value)
    params?.onOk?.();
    message.success(`修改成功`)
  }

  return (
    <>
      <Modal title="新增" footer={null} onCancel={params?.onCancel?.()} open={isModalOpen}>
        <Form
          preserve={false}
          labelCol={{ span: 4 }}
          name="basic"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item<PartnerRegisterReq>
            name="name"
            label="名称"
            required
          >
            <Input />
          </Form.Item>

          <Form.Item<PartnerRegisterReq>
            name="priority"
            label="优先级"
            required
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item<PartnerRegisterReq>
            name="dailyLimit"
            label="每日限额"
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item<PartnerRegisterReq>
            name="rechargeTime"
            label="充值时间"
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item<PartnerRegisterReq>
            name="privateKey"
            label="私钥"
          >
            <Input />
          </Form.Item>

          <Form.Item<PartnerRegisterReq>
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

export default PartnerCreateModal