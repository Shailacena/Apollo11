import { useEffect, useState } from 'react';
import { Button, Form, FormProps, Input, message, Modal } from 'antd';
import { PartnerBaseInfoReq, PartnerUpdateReq, useApis } from '../../api/api';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import { useAppContext } from '../../AppProvider';

interface ModalDataType {
  isModalOpen: boolean
  onOk: Function;
  onCancel: Function;
  info?: FieldType
}

type FieldType = {
  id: number
  name: string;
  remark: string;
};

enum Title {
  CreateTxt = '新增合作商',
  EditTxt = '修改合作商信息'
}

const PartnerCreateModal = (params: ModalDataType) => {
  const [info, setInfo] = useState(params.info)
  const [isEdit, setIsEdit] = useState(!!params.info)
  const [title, setTitle] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(params.isModalOpen);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  let app = useAppContext()
  let apis = useApis()

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

  const onFinish: FormProps<PartnerBaseInfoReq>['onFinish'] = async (value) => {
    setFormDisabled(true)
    setConfirmLoading(true)
    try {
      isEdit ? handleEdit({id: info!.id, ...value}) : handleRegister(value)
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
    value.superiorAgent = app.cookie.id
    value.level = app.cookie.level == 0 ? 1 : (app.cookie.level ?? 0) + 1
    let { data } = await apis.partnerRegister(value)
    params?.onOk?.();
    Modal.success({
      content: `添加成功, 密位为${data.password}`,
    });
  }

  const handleEdit = async (value: PartnerUpdateReq) => {
    value.priority = value.priority && Number(value.priority)
    value.dailyLimit = value.dailyLimit && Number(value.dailyLimit)
    value.rechargeTime = value.rechargeTime && Number(value.rechargeTime)
    await apis.partnerUpdate(value)
    params?.onOk?.();
    message.success(`修改成功`)
  }

  return (
    <>
      <Modal title={title} footer={null} confirmLoading={confirmLoading} onCancel={()=>{params?.onCancel?.()}} open={isModalOpen}>
        <Form
          preserve={false}
          disabled={formDisabled}
          labelCol={{ span: 4 }}
          name="basic"
          autoComplete="off"
          onFinish={onFinish}
          initialValues={{ ...info }}
        >
          <Form.Item<PartnerUpdateReq>
            name="name"
            label="名称"
            required
          >
            <Input />
          </Form.Item>

          {
            isEdit && <Form.Item<PartnerUpdateReq>
              name="priority"
              label="优先级"
              required
            >
              <Input type='number' min='0' />
            </Form.Item>
          }

          {
            isEdit && <Form.Item<PartnerUpdateReq>
              name="dailyLimit"
              label="每日限额"
            >
              <Input type='number' min='-1' />
            </Form.Item>
          }

          {isEdit && <Form.Item<PartnerUpdateReq>
            name="rechargeTime"
            label="充值时间"
          >
            <Input type='number' />
          </Form.Item>
          }
          {
            isEdit && <Form.Item<PartnerUpdateReq>
              name="privateKey"
              label="私钥"
            >
              <Input disabled />
            </Form.Item>
          }
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

export default PartnerCreateModal