import { useState, useEffect } from 'react';
import { Modal, Space, Form, Table, Input, Button, message } from 'antd';
import type { FormProps, TableProps } from 'antd';
import { IPartner, listPartner, partnerRegister, PartnerRegisterReq } from '../api/api';
import axios from 'axios';

const { TextArea } = Input;

interface DataType extends IPartner {
  key: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '合作商名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '授信额度',
    dataIndex: 'creditAmount',
    key: 'creditAmount',
  },
  {
    title: '每日限额',
    key: 'dailyLimit',
    dataIndex: 'dailyLimit',
  },
  {
    title: '优先级',
    key: 'priority',
    dataIndex: 'priority',
  },
  {
    title: '上级代理',
    key: 'superiorAgent',
    dataIndex: 'superiorAgent',
  },
  {
    title: '等级',
    key: 'level',
    dataIndex: 'level',
  },
  {
    title: '剩余库存金额',
    key: 'stockAmount',
    dataIndex: 'stockAmount',
  },
  {
    title: '今日订单数',
    key: 'stockAmount',
    dataIndex: 'stockAmount',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Button disabled type="primary" size='small'>修改</Button>
        <Button disabled type="primary" size='small' danger >删除</Button>
      </Space>
    ),
  },
];

function Partner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState<DataType[]>([])
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish: FormProps<PartnerRegisterReq>['onFinish'] = async (value) => {
    try {
      value.priority = value.priority && Number(value.priority)
      value.dailyLimit = value.dailyLimit && Number(value.dailyLimit)
      value.rechargeTime = value.rechargeTime && Number(value.rechargeTime)
      console.log(value);
      await partnerRegister(value)
      fetchListPartner()
      setIsModalOpen(false);
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchListPartner = async () => {
    const { data } = await listPartner({})
    let d: DataType[] = data?.list?.map((item, index) => {
      let newItem: DataType = {
        key: index,
        ...item
      }
      return newItem
    })
    setList(d)
  }

  useEffect(() => {
    fetchListPartner()
  }, [])


  return (
    <>
      {contextHolder}
      <div className='mr-10'>
        <Button type="primary" onClick={showModal}>新增</Button>
      </div>
      <Table<DataType> columns={columns} dataSource={list} />

      <Modal title="新增" footer={null} onCancel={handleCancel} open={isModalOpen}>
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

export default Partner