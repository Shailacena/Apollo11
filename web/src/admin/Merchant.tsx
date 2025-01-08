import { useEffect, useState } from 'react';
import { Modal, Form, Table, Input, Button, message, Space } from 'antd';
import type { FormProps, TableProps } from 'antd';
import { IMerchant, MerchantRegisterReq, useApis } from '../api/api';
import dayjs from 'dayjs';
import axios from 'axios';

const { TextArea } = Input;

interface DataType extends IMerchant {
  key: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '商户号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '商户名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '秘钥',
    dataIndex: 'privateKey',
    key: 'privateKey',
  },
  {
    title: '创建时间',
    key: 'createAt',
    dataIndex: 'createAt',
    render: (_, d) => (
      d.createAt > 0 ? dayjs.unix(d.createAt).format('YYYY-MM-DD HH:mm:ss') : ''
    )
  },
  {
    title: '总交易额',
    key: 'totalAmount',
    dataIndex: 'totalAmount',
  },
  {
    title: '今日交易额',
    key: 'totalAmount',
    dataIndex: 'totalAmount',
  },
  {
    title: '状态',
    key: 'enable',
    dataIndex: 'enable',
    render: (_, d) => (
      d.enable === 1 ? '启动' : '禁用'
    )
  },
  {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark',
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

function Merchant() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState<DataType[]>([])
  const [messageApi, contextHolder] = message.useMessage();
  let { listMerchant, merchantRegister } = useApis()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish: FormProps<MerchantRegisterReq>['onFinish'] = async (value) => {
    try {
      console.log(value);
      await merchantRegister(value)
      fetchListMerchant()
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

  const fetchListMerchant = async () => {
    const { data } = await listMerchant()
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
    fetchListMerchant()
  }, [])


  return (
    <>
      {contextHolder}
      <div className='mr-10'>
        <Button type="primary" onClick={showModal}>新增</Button>
      </div>
      <Table<DataType> bordered columns={columns} dataSource={list} />

      <Modal title="新增商户" footer={null} onCancel={handleCancel} open={isModalOpen}>
        <Form
          preserve={false}
          labelCol={{ span: 4 }}
          name="basic"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item<MerchantRegisterReq>
            name="name"
            label="名称"
            required
          >
            <Input />
          </Form.Item>

          <Form.Item<MerchantRegisterReq>
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

export default Merchant